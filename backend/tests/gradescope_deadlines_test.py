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
    session = Mock()
    login_page = Mock()
    login_page.text = '<input name="authenticity_token" value="TOKEN"/>'
    session.get.return_value = login_page
    bad_response = Mock()
    bad_response.url = BASE + "/login"
    session.post.return_value = bad_response
    with pytest.raises(Exception) as err:
        login(session, "bad", "creds")

    assert "login failed" in str(err.value)

def test_scrape_zero_courses():
    session = Mock()
    # build mock homepage that has no courses
    home = Mock()
    home.text = "<html><body></body></html>"
    session.get.return_value = home
    result = scrape_courses_and_assignments(session)
    assert result == []

def test_scrape_one_course_and_assignment():
    session = Mock()
    home_html = """
    <div class="courseBox" href="/courses/123">
        <div class="courseBox--shortname">CS110</div>
        <div class="courseBox--name">Intro to CS</div>
    </div>
    """
    course_html = """
    <table id="assignments-student-table">
        <tbody>
            <tr>
                <th class="table--primaryLink">HW 1</th>
                <td class="submissionTimeChart--dueDate" datetime="2025-05-22T23:59"></td>
            </tr>
        </tbody>
    </table>
    """
    # call session.get on course page and home page
    session.get.side_effect = [
        Mock(text=home_html),
        Mock(text=course_html)
    ]

    result = scrape_courses_and_assignments(session)

    assert len(result) == 1
    assert result[0]["course"] == "CS110 - Intro to CS"
    assert result[0]["assignment"] == "HW 1"
    assert result[0]["status"] == "Pending"
    assert result[0]["due_date"] == "2025-05-22T23:59"
