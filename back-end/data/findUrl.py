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
from pyproj import Proj, transform

import os
import time
import urllib.request

# 식당 데이터 임포트
name_data = pd.read_csv('original.csv', encoding='cp949')
print(name_data)

# #검색할 식당 데이터와 url을 담을 데이터 프레임 생성
df = pd.DataFrame(columns=['name', 'number','numberAddress','roadAddress','lat','lon','thumbnail','naverURL'])

df['name'] = name_data['사업장명']
df['number'] = name_data['소재지전화']
df['numberAddress'] = name_data['소재지전체주소']
df['roadAddress'] = name_data['도로명전체주소']
df['lon'] = name_data['좌표정보(x)']
df['lat'] = name_data['좌표정보(y)']


# 식당 url 얻기
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

res = driver.page_source  # 페이지 소스 가져오기
soup = BeautifulSoup(res, 'html.parser')  # html 파싱하여  가져온다

# frame 변경 메소드
def switch_frame(frame):
    driver.switch_to.default_content()  # frame 초기화
    driver.switch_to.frame(frame)  # frame 변경
    res
    soup

for i, keyword in enumerate(df['name'].tolist()):

    # if i>0:
    #    break
    
    # 검색 url 만들기
    naver_map_search_url = f'https://map.naver.com/v5/search/{keyword}/place'  
    # 검색 url 접속 = 검색하기
    driver.get(naver_map_search_url)
    time.sleep(2) 
    # 검색 프레임 변경
    driver.switch_to.frame("searchIframe")
    time.sleep(1) 


    def utmToEqa(utmx,utmy):
        proj_1 = Proj(init='epsg:2097')
        proj_2 = Proj(init='epsg:4326')
        converted = transform(proj_1, proj_2, utmx, utmy)  
        return converted[0],converted[1]

    df['lon'][i] , df['lat'][i] = utmToEqa( df['lon'][i] , df['lat'][i])
  
    try:     
        #식당 정보가 있다면 첫번째 식당의 url을 가져오기
        
        if len(driver.find_elements(By.XPATH, '//*[@id="_pcmap_list_scroll_container"]/ul/li[1]/div[1]/div/a[1]/div/div/span[1]')) != 0:
      
            #식당 정보 클릭        
            driver.execute_script('return document.querySelector("#_pcmap_list_scroll_container > ul > li:nth-child(1) > div.qbGlu > div > a:nth-child(1) > div > div").click()')
            time.sleep(2)
            
            # 검색한 플레이스의 개별 페이지 저장
            tmp = driver.current_url  
            res_code = re.findall(r"place/(\d+)", tmp)
            final_url = 'https://pcmap.place.naver.com/restaurant/'+res_code[0]+'/review/visitor#' 
        
            print(final_url)
            df['naverURL'][i]=final_url 
           
            driver.get(final_url)
            time.sleep(2) 
            res = driver.page_source  # 페이지 소스 가져오기
            soup = BeautifulSoup(res, 'html.parser')  # html 파싱하여  가져온다
            img_div= soup.find('div', attrs = {'class':'K0PDV _div'})

            if len(img_div) > 0 :
                image_style=img_div['style']
                ptr = re.search("http.*[)]",image_style)
                backgroud_url = image_style[ptr.start():ptr.end()-3]
            
                file_name=backgroud_url[-70:-30]
        
                savelocation = f"thumbnail\\{file_name}.png" 
                urllib.request.urlretrieve(backgroud_url, savelocation) 

                df['thumbnail'][i] = file_name

          
        
    except: 
        df['naverURL'][i]= ''
        print('none') 
    
driver.close()


df.to_csv('table_restaurant.csv', encoding='utf-8-sig')





