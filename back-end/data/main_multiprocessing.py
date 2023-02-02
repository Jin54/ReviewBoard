from bs4 import BeautifulSoup
import urllib.request
import time,threading
import os
import multiprocessing
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

def get(i, length):

    asdasd=0
    index= i*length
    max= (i+1)*length-1
    print('index '+ str(index)+' max ' +str(max))
    driver = webdriver.Chrome('chromedriver.exe', options=options)
    time.sleep(5)
    #for index in range(max): 
    while index <= max:
        if  index>goal:
            break
    

        print('======================================================') 
        print(str(index)+'번째 식당') 
        

  
        # 식당 리뷰 개별 url 접속
        driver.get(df['naverURL'][index]) 
        thisurl = df['naverURL'][index]
        time.sleep(1) 

        
        # 더보기 버튼 다 누를 것
        # 더보기 버튼은 10개 마다 나옴
        def click_more_button(str):       
            time.sleep(1.3)
            driver.find_element(By.CSS_SELECTOR, str).click()
            time.sleep(0.3)
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)
            # time.sleep(1)
            # driver.find_element(By.CSS_SELECTOR, str).click()
            # driver.execute_script(f'return document.querySelector(\"{str}\").click()')                
             
       
       
        excceed =0 
        for excceed in range(100):
            try:
                excceed +=1
                print(str(excceed))
                click_more_button('#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.lcndr > div.lfH3O > a')
            except NoSuchElementException: 
                print('-더보기 버튼 모두 클릭 완료- 1') 
                break 
    
        try:
            click_more_button('#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.xLt_B > h2 > a')
        except NoSuchElementException: 
            break
        print('-더보기 버튼 모두 클릭 완료- 2') 

        excceed =0 
        for excceed in range(100):
            try:
                excceed +=1
                print(str(excceed))
                click_more_button('#app-root > div > div > div > div:nth-child(7) > div:nth-child(3) > div.place_section.xLt_B > div.lfH3O > a')
            except NoSuchElementException: 
                print('-더보기 버튼 모두 클릭 완료- 3') 
                break

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
                                
                        file_name=backgroud_url[-80:-50]  
                        savelocation = f"review\\{file_name}.png" 
                        urllib.request.urlretrieve(backgroud_url, savelocation) 

                        img_list_format=asdasd,file_name
                        asdasd+=1
                        time.sleep(0.01)      
                        img_list.append(img_list_format)
                    
            
    
                # rating_df_list 
                naver_review = index, restaurant_name, rating ,content,createTime       
                review_list.append(naver_review) 


            

        # 리뷰가 없는 경우        
        except NoSuchElementException: 
            none_review = "네이버 리뷰 없음" 
            print(none_review)
            review_num = 0 
            
            # 리뷰정보 = restaurant_name, restaurant_classification, review_num, none_review 
            
            # rating_df_list
            naver_review = restaurant_name, none_review,"1","2","3"
            review_list.append(naver_review)
        index+=1
    
    driver.close()






options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
options.add_argument("disable-gpu") 
options.add_argument("disable-infobars")
options.add_argument("--disable-extensions")
caps = DesiredCapabilities().CHROME
caps["pageLoadStrategy"] = "none"




df = pd.read_csv('table_restaurant.csv')


goal = len(df['naverURL']) #총 식당 수
goal=10

#데이터 프레임으로 만들 빈 리스트 생성
review_list = []    # rating
img_list=[]
lock=threading.Lock()

if __name__ == "__main__": 
    # process = []
    i=0
    # process_number=2
    # alloc= int(goal/process_number)
    # while i < process_number:
    #     p = multiprocessing.Process(target=get, args=(i,alloc))
    #     process.append(p)
    #     p.start()
    #     i+=1

    # for p in process:
    #     p.join()

    
    get(i,goal)

    print("크롤링 종료")
 

    rating_df = pd.DataFrame(review_list) 
    rating_df.columns = ['feed_id','name','rating','content','creatTime'] 
    rating_df.to_csv('table_review.csv', encoding='utf-8-sig') 

    img_df = pd.DataFrame(img_list) 
    img_df.columns = ['review_id','url'] 
    img_df.to_csv('table_img.csv', encoding='utf-8-sig') 
