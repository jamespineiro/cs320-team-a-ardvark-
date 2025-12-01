import pytest
from unittest.mock import Mock
from backend.python.GradescopeDeadlines import login, scrape_courses_and_assignments, BASE

def test_correct_login():
    session = Mock()
    login_page = Mock()
    login_page.text = '<input name="authenticity_token" value="ABC123"/>'
    session.get.return_value = login_page
    post_response = Mock()
    post_response.url = BASE + "/account"
    session.post.return_value = post_response
    result = login(session, "user@example.com", "password")
    assert result is session

def test_login_with_no_token():
    session = Mock()
    bad_page = Mock()
    bad_page.text = "<html></html>"
    session.get.return_value = bad_page
    with pytest.raises(Exception) as err:
        login(session, "a", "b")
    assert "Could not load login page" in str(err.value)

def test_login_with_wrong_credentials():
    return

def test_scrape_zero_courses():
    return

def test_scrape_one_course_and_assignment():
    return
