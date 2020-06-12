# 코로나 알리미

## 목차  

>   1. 개요
>   2. 개발환경

### 개요
- 제작배경
    > 2019년 말부터 유행하던 감염병인 COVID19가 반년 가까이 유행하게 되면서 많은 확진자와 집단 감염 장소가 나오게 되었다.
    > 하지만 이걸 알 수 있는 방법은 재난 안내 문자나 SNS상에 있는 경로 뿐이였고, 이와 관련된 어플을 제작해 보았다.
- 기능
    > 1. 사용자 위치 기준 500m내에 위험지역이 있으면 알림
    > 2. 질병관리본부에서 발표한 집단발생 관련 노출장소 지도에 표시

### 개발환경
- Python 3.7  
    >* BeautifulSoup4  

- NodeJS 12.16
    >* Express

- React Native
    >* uuidv1
    >* axios 
    >* expo-location
    >* react-native-map
- ETC
    >* T map API