from bs4 import BeautifulSoup
import requests
from function import *
import pprint
import json

locList = {'loc':[]}

site = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=12&ncvContSeq=&contSeq=&board_id=&gubun="

page = requests.get(site)
bsObject = BeautifulSoup(page.text, "html.parser")
infoCOVID = bsObject.find_all('td')
strCOVID = replaceTag(str(infoCOVID))

strLists = strCOVID.split('\n')

for data in strLists:
    checkLoc(locList, str(data))

# print(locList)
jsonTest = json.dumps(locList, ensure_ascii=False)
print(jsonTest)

f = open("./nodeJS/COVIDAPI/location.json", 'w', encoding="UTF-8")
f.write(jsonTest)
f.close()