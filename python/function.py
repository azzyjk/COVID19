def replaceTag(string):
    return string.replace("<td>","").replace("</td>","\n").replace("<br/>","\n").replace(", ", "").replace("(", "").replace(")", "")

def checkLoc(lists, data):
    if data.find("서울") >= 0:
        lists["loc"].append(data)
    elif data.find("부산") >= 0:
        lists["loc"].append(data)
    elif data.find("대구") >= 0:
        lists["loc"].append(data)
    elif data.find("인천") >= 0:
        lists["loc"].append(data)
    elif data.find("광주") >= 0:
        lists["loc"].append(data)
    elif data.find("대전") >= 0:
        lists["loc"].append(data)
    elif data.find("울산") >= 0:
        lists["loc"].append(data)
    elif data.find("세종") >= 0:
        lists["loc"].append(data)
    elif data.find("경기") >= 0:
        lists["loc"].append(data)
    elif data.find("강원") >= 0:
        lists["loc"].append(data)
    elif data.find("경북") >= 0:
        lists["loc"].append(data)
    return lists