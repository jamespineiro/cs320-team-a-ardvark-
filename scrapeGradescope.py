from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
options.add_argument("--user-data-dir=/tmp/selenium_profile")  # avoid conflicts
service = Service("/Users/vidhitamittal/Desktop/chromedriver")

driver = webdriver.Chrome(service=service, options=options)

# going to the login page of gradescope
driver.get("https://www.gradescope.com/login")

userid = "" # your email here
password = "" # your password here

# logging in
wait = WebDriverWait(driver, 15)
email_input = wait.until(EC.presence_of_element_located((By.ID, "session_email")))
password_input = driver.find_element(By.ID, "session_password")

email_input.send_keys(userid)
password_input.send_keys(password)

driver.find_element(By.NAME, "commit").click()

# wait for main page to load 
wait.until(EC.presence_of_element_located((By.TAG_NAME, "main")))

# this will take you to the specific course page
driver.get("https://www.gradescope.com/courses/1112680")  # update with required course (probably will have to be a variable string course code)

# get the deadlines
time.sleep(3)  #just waiting for the page to load
deadlines = driver.find_elements(By.XPATH, '//time')

if deadlines:
    print("📅 Deadlines found:")
    for i, d in enumerate(deadlines, start=1):
        print(f"{i}. {d.text}")
else:
    print("No deadlines found.")

driver.quit()
