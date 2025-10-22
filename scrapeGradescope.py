# # # from selenium import webdriver
# # # from selenium.webdriver.chrome.options import Options
# # # from selenium.webdriver.common.by import By
# # # import pandas as pd
# # # import time 

# # # options = Options()
# # # # options.binary_location = '/Users/vidhitamittal/Desktop/chromedriver'  # the path to your chromdriver

# # # # driver = webdriver.Chrome(options=options)

# # # # gradescope_url = "https://www.gradescope.com/courses/1071247"  # replace with your course URL
# # # # driver.get(gradescope_url)

# # # driver = webdriver.Chrome(executable_path="/Users/vidhitamittal/Desktop/chromedriver", options=options)









# # # # deadlines = driver.find_elements('xpath','//*[@id="main"]/div[2]/main/div[2]/div/section/div/table/tbody/tr[1]/td[2]/div/div[3]/time[2]')
# # # # deadlines = driver.find_elements('xpath','/html/body/div[2]/main/div[2]/div/section/div/table/tbody/tr[1]/td[2]/div/div[3]/time[2]')

# # # driver.get("https://www.gradescope.com")
# # # userid = ""
# # # password = ""
# # # # driver.find_element_by_xpath("""//*[@id="login-email"]""").send_keys(userid)
# # # # driver.find_element_by_xpath("""//*[@id="login-password"]""").send_keys(password)
# # # # driver.find_element_by_xpath("""//*[@id="login-submit"]""").click()

# # # deadlines = driver.find_elements('xpath','//*[@id="main"]/div[2]/main/div[2]/div/section/div/table/tbody/tr[1]/td[2]/div/div[3]/time[2]')

# # # print(deadlines[0].text)


# # from selenium import webdriver
# # from selenium.webdriver.chrome.service import Service
# # from selenium.webdriver.chrome.options import Options
# # from selenium.webdriver.common.by import By
# # import time

# # options = Options()
# # options.add_argument("--user-data-dir=/tmp/selenium_profile")  # avoid session conflict

# # # Point Service to chromedriver
# # service = Service("/Users/vidhitamittal/Desktop/chromedriver")

# # driver = webdriver.Chrome(service=service, options=options)

# # driver.get("https://www.gradescope.com")

# # userid = "vidhitamitta@umass.edu"
# # password = "Vidhita1234!"

# # driver.find_element(By.XPATH, '//*[@id="login-email"]').send_keys(userid)
# # driver.find_element(By.XPATH, '//*[@id="login-password"]').send_keys(password)
# # driver.find_element(By.XPATH, '//*[@id="login-submit"]').click()

# # time.sleep(3)  # wait for page load
# # deadlines = driver.find_elements(By.XPATH, '//*[@id="main"]/div[2]/main/div[2]/div/section/div/table/tbody/tr[1]/td[2]/div/div[3]/time[2]')

# # if deadlines:
# #     print(deadlines[0].text)
# # else:
# #     print("No deadlines found.")


# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import time

# options = Options()
# options.add_argument("--user-data-dir=/tmp/selenium_profile")
# service = Service("/Users/vidhitamittal/Desktop/chromedriver")

# driver = webdriver.Chrome(service=service, options=options)

# driver.get("https://www.gradescope.com/login")

# userid = "your_email_here"
# password = "your_password_here"

# wait = WebDriverWait(driver, 10)
# email_input = wait.until(EC.presence_of_element_located((By.ID, "session_email")))
# password_input = driver.find_element(By.ID, "session_password")

# email_input.send_keys(userid)
# password_input.send_keys(password)

# driver.find_element(By.NAME, "commit").click()



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
driver.get("https://www.gradescope.com/courses/1112680")  # update with required course (probably will have to be a variable course code)

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
