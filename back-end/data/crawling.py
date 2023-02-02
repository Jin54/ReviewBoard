import pandas as pd
import openpyxl
import os
import sys
import time
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from pyparsing import col
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from tqdm import tqdm 
import re
import urllib.request
from selenium.webdriver.support.ui import WebDriverWait as wait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import csv
from csv import writer
# csv 파일로도 저장하여 url이 빈 값이 있는지 반드시 확인할 것 !
#url이 없으면 코드 실행이 중단되므로 반드시 url 데이터를 확인할 것!!


# options = webdriver.ChromeOptions()
# options.add_experimental_option("excludeSwitches", ["enable-logging"])
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
# options.add_argument("--disable-extensions")
# caps = DesiredCapabilities().CHROME
# caps["pageLoadStrategy"] = "none"



df = pd.read_csv('table_restaurant.csv', encoding='cp949')




goal = len(df['naverURL']) #총 식당 수

#데이터 프레임으로 만들 빈 리스트 생성
review_list = ['feed_id','name','rating','content','creatTime']    # rating
img_list=['review_id','url']


review_list = pd.DataFrame(review_list) 
# rating_df.columns = ['feed_id','name','rating','content','creatTime'] 
# rating_df.to_csv('table_review.csv', encoding='utf-8-sig') 

img_list = pd.DataFrame(img_list) 
# img_df.columns = ['review_id','url'] 
# img_df.to_csv('table_img.csv', encoding='utf-8-sig') 
driver = webdriver.Chrome('chromedriver.exe', chrome_options=options)
review_index =37013 #현재 진행 상황
for index in range(goal): 

    index+=277

    
    time.sleep(1)

    print('======================================================') 
    print(str(index)+'번째 식당') 
    
    
  
    # 식당 리뷰 개별 url 접속
    url=df['naverURL'][index]
    if url == '0':
        print("값없음")
        continue
    driver.get(df['naverURL'][index]) 
    thisurl = df['naverURL'][index]
    time.sleep(1)

    delay = 0.1 
    page_down=100
    while  page_down > 0 : 
        page_down-=1
        try:
            time.sleep(delay)
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN) 
            time.sleep(delay)
            a=driver.find_element(By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.lcndr > div.lfH3O > a').click()
            time.sleep(delay)
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)      
        except NoSuchElementException: 
            print('-더보기 버튼 모두 클릭 완료- 2') 
            break
        except Exception:
             print('-오류- 1') 
   
    try:
        time.sleep(delay)
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN) 
        time.sleep(delay)
        driver.find_element(By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.xLt_B > h2 > a').click()   
        time.sleep(delay)
        driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
    except NoSuchElementException: 
        print('-더보기 버튼 모두 클릭 완료- 2') 
        break
    except Exception:
         print('-오류- 2') 

    page_down=100
    while  page_down > 0 : 
        page_down-=1
        try:
            time.sleep(delay)   
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)
            time.sleep(delay)
            driver.find_element(By.CSS_SELECTOR, '#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.xLt_B > div.lfH3O > a').send_keys(Keys.ENTER)   
            time.sleep(delay)
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.PAGE_DOWN)    
        except NoSuchElementException: 
            print('-더보기 버튼 모두 클릭 완료- 3') 
            break
        except Exception:
            print('-오류- 3') 


    time.sleep(5) 
    # 파싱
    html = driver.page_source 
    soup = BeautifulSoup(html, 'lxml') 
    time.sleep(1) 
    
    # 식당 구분 
    restaurant_name = df['name'][index]
    print('식당 이름 : '+restaurant_name) 
    

    
    try: 
        restaurant_classificaton = soup.find_all('span',attrs = {'class':'_3ocDE'})[0].text 
    
    except: 
        restaurant_classificaton = 'none'
    
    print('식당 구분 : '+restaurant_classificaton)
    print('----------------------------------------------')
    

    # 특정 식당에 대한 리뷰 수집
    try: 
        one_review = soup.find_all('li', attrs = {'class':'YeINN'})
        review_num = len(one_review) # 특정 식당의 리뷰 총 개수 
        print('리뷰 총 개수 : '+str(review_num)) 
        
        # 모든 리뷰에 대해서 정보 수집
        for i in range(len(one_review)): 
            
            # rating, 별점
            try: 
                rating = one_review[i].find('div', attrs = {'class':'sb8UA'}).find('em').text
    
            except: 
                rating = ''  
            #print('rating = '+rating) 

            #content, 리뷰내용     
            try: 
                content = one_review[i].find('span', attrs = {'class':'zPfVt'}).text    
            except: 
                content = ''  
            #print('content = '+content) 


            #createTime, 생성시간   
            try: 
                createTime = one_review[i].find('time').text    
            except: 
                createTime = ''  
            #print('createTime = '+createTime) 


            # 한 리뷰의 이미지 개수  
            img_div= one_review[i].find_all('div', attrs = {'class':'K0PDV _img fKa0W'})
            img_div_num = len(img_div) 
            #print('리뷰 이미지 개수 : '+str(img_div_num))



            url=[]
            if img_div_num == 0:
                a=1
            else:
                for img_div_index in range(img_div_num):
                    image_style=img_div[img_div_index]['style']
                    ptr = re.search("http.*[)]",image_style)
                    backgroud_url = image_style[ptr.start():ptr.end()-2]
                             
                    file_name=backgroud_url[-70:-30]  
                    savelocation = f"review\\{file_name}.png" 
                    time.sleep(0.1)
                    urllib.request.urlretrieve(backgroud_url, savelocation) 



                    img_list_format=review_index,file_name
                    with open('table_img.csv', 'a',encoding='utf-8-sig', newline='') as f_object:
                        writer_object = writer(f_object)
                        writer_object.writerow(img_list_format)
                        f_object.close()



            review_index +=1
           
            naver_review = index, restaurant_name, rating ,content,createTime
            with open('table_review.csv', 'a',encoding='utf-8-sig', newline='') as f_object:
                writer_object = writer(f_object)
                writer_object.writerow(naver_review)
                f_object.close()

         
          

    # 리뷰가 없는 경우        
    except NoSuchElementException: 
        none_review = "네이버 리뷰 없음" 
        print(none_review)
        review_num = 0 
        
        # 리뷰정보 = restaurant_name, restaurant_classification, review_num, none_review 
        
        # rating_df_list
        naver_review = restaurant_name, none_review,"1","2","3"
        review_list.append(naver_review)

    


print('저장완료\n')






