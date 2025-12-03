import unittest
from unittest.mock import patch, Mock, mock_open
import requests
import sys
import os

# PATH SETUP
current_test_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.dirname(current_test_dir)
python_src_dir = os.path.join(backend_dir, 'python')

sys.path.append(python_src_dir)

import canvasJSONexporter 

class TestCanvasExporter(unittest.TestCase):

    def setUp(self):
        self.base_url = "canvas.instructure.com"
        self.token = "fake_token"
        self.course_id = "12345"
        self.dummy_assignment = {"id": 1, "name": "Test Assignment"}

    @patch('requests.get')
    def test_fetch_single_page_success(self, mock_get):
        """Test a simple successful API call with one page of results."""
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = [self.dummy_assignment]
        mock_response.headers = {}
        mock_get.return_value = mock_response

        results = canvasJSONexporter.fetch_all_assignments(self.base_url, self.token, self.course_id)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['name'], "Test Assignment")
        
        _, kwargs = mock_get.call_args
        self.assertEqual(kwargs['headers']['Authorization'], f"Bearer {self.token}")

    @patch('requests.get')
    def test_fetch_pagination(self, mock_get):
        """Test that the loop correctly follows 'next' links in headers."""
        
        # --- Page 1 Setup ---
        resp_page_1 = Mock()
        resp_page_1.status_code = 200
        resp_page_1.json.return_value = [{"id": 1, "name": "Page 1 Item"}]

        resp_page_1.headers = {'Link': '<https://canvas.test/api/next>; rel="next"'}
        
        # --- Page 2 Setup ---
        resp_page_2 = Mock()
        resp_page_2.status_code = 200
        resp_page_2.json.return_value = [{"id": 2, "name": "Page 2 Item"}]
        # Empty headers indicate no more pages
        resp_page_2.headers = {} 

        # The side_effect makes the first call return page 1, and the second call return page 2
        mock_get.side_effect = [resp_page_1, resp_page_2]

        results = canvasJSONexporter.fetch_all_assignments(self.base_url, self.token, self.course_id)

        # We expect 2 items total (1 from page 1, 1 from page 2)
        self.assertEqual(len(results), 2)
        self.assertEqual(results[0]['name'], "Page 1 Item")
        self.assertEqual(results[1]['name'], "Page 2 Item")

    @patch('time.sleep') #Skip actual sleeping
    @patch('requests.get')
    def test_retry_logic_success(self, mock_get, mock_sleep):
        """Test that the function retries on failure and succeeds eventually."""
        
        # 1. First call fails
        error_response = requests.exceptions.ConnectionError("Connection Refused")
        
        # 2. Second call succeeds
        resp_success = Mock()
        resp_success.status_code = 200
        resp_success.json.return_value = [self.dummy_assignment]
        resp_success.headers = {}

        mock_get.side_effect = [error_response, resp_success]

        results = canvasJSONexporter.fetch_all_assignments(self.base_url, self.token, self.course_id)
        
        self.assertEqual(len(results), 1)
        self.assertEqual(mock_get.call_count, 2)
        mock_sleep.assert_called_once()

    @patch('builtins.open', new_callable=mock_open)
    @patch('json.dump')
    def test_export_to_json(self, mock_json_dump, mock_file):
        """Test file writing logic."""
        assignments = [
            {"name": "Valid Assignment", "id": 1},
            {"no_name_key": "Should be skipped"} 
        ]
        
        canvasJSONexporter.export_to_json(assignments, "test.json")

        # Verify file opened correctly
        mock_file.assert_called_with("test.json", 'w', encoding='utf-8')
        
        # Verify only valid data was passed to dump
        args, _ = mock_json_dump.call_args
        data_dumped = args[0]
        self.assertEqual(len(data_dumped), 1)
        self.assertEqual(data_dumped[0]['name'], "Valid Assignment")

if __name__ == '__main__':
    unittest.main()