from bs4 import BeautifulSoup
import requests
from function import *
import pprint

locList = {'loc':[]}

site = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=12&ncvContSeq=&contSeq=&board_id=&gubun="

page = requests.get(site)
bsObject = BeautifulSoup(page.text, "html.parser")
infoCOVID = bsObject.find_all('td')
strCOVID = replaceTag(str(infoCOVID))

strLists = strCOVID.split('\n')

for data in strLists:
    checkLoc(locList, str(data))

f = open("./nodeJS/COVIDAPI/test.txt", 'w')
f.write(str(locList))
f.close()