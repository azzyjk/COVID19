from bs4 import BeautifulSoup
from urllib.request import urlopen
import requests
from function import *
import time

site = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=12&ncvContSeq=&contSeq=&board_id=&gubun="

page = requests.get(site)
bsObject = BeautifulSoup(page.text, "html.parser")
infoCOVID = bsObject.find_all('td')
strCOVID = replaceTag(str(infoCOVID))

strLists = strCOVID.split('\n')
COIVDlists = []

for data in strLists:
    checkLoc(COIVDlists, str(data))

print(COIVDlists)
