# Perple

안녕하세요! 

유튜브 영상을 북마크로 관리할 수 있도록 구현한 **Perple**을 만든 이토 입니다.

Perple은 **'Personal Player'의 줄임말**입니다.

유튜브 서비스 이용 중 불편함을 느낀 부분을 해소하고자 구현해보았습니다.

<br />

## 사용한 기술 스택

### Front-end

<img alt="React" src="https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white" /> <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> <img alt="Styled Components" src="https://img.shields.io/badge/-Styled_Components-db7092?style=flat-square&logo=styled-components&logoColor=white" /> <img alt="redux" src="https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white" />

### Back-end

<img alt="Nodejs" src="https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=white" /> <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" /> <img alt="Express" src="https://img.shields.io/badge/-Express-yellow?style=flat-square&logo=express&logoColor=white" /> <img alt="MongoDB" src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />

<br />

## 실행방법

```
// 프로젝트 복제
git clone https://github.com/seongjin2427/perple.git

// 서버 실행
cd back
npm run dev

// 웹서버 실행, 새 터미널을 연 뒤
cd front
npm start
```

## 서론

- 유튜브에서는 저장하고픈 영상을 별도로 보관할 수는 있지만 하나의 폴더에만 보관이 가능합니다
- 이 때문에 개인이 분류하고자 하는 카테고리별로는 별도 분리 보관이 어려웠었습니다.

<br />

## 기능 설명

### 회원가입/로그인, 반응형 웹

- 로그인 버튼을 눌러 구글 아이디로 로그인과 동시에 Perple 서비스에 회원가입 및 로그인이 동시에 진행됩니다.

- 페이지들은 화면크기에 따른 반응형 웹으로 이루어져 있습니다.

![1  회원가입 로그인](https://user-images.githubusercontent.com/59536977/190886610-730dafeb-d468-4b26-94c0-d6a0887bde38.gif)

<br />

### 인기동영상 리스트

- 유튜브 인기동영상을 메인 페이지에서 보여줍니다.

![2  인기 동영상 리스트](https://user-images.githubusercontent.com/59536977/190886616-81dc2e27-f14e-4c37-8496-3f3d4cdaedb7.gif)

<br />

### 검색 기능

- 검색한 단어와 관련있는 유튜브 영상을 리스트로 보여줍니다.

- 페이지를 넘겨 다른 리스트를 확인할 수 있습니다.

![3  검색 기능](https://user-images.githubusercontent.com/59536977/190886618-84579e60-5bd7-4187-86f2-fda1d740110e.gif)

<br />

### 북마크 페이지에서 북마크 추가, 수정

- 북마크 버튼을 눌러 북마크 페이지로 이동할 수 있습니다.

- 북마크 페이지에서 기존에 사용자가 추가했던 북마크 리스트를 확인 할 수 있습니다.

- 북마크 추가 버튼을 누르고 북마크 제목을 작성한 뒤, 확인 버튼을 누르면 새로운 북마크가 등록됩니다.

- 북마크의 만년필 버튼을 누르면 북마크 제목을 수정할 수 있게 변경됩니다.

- 북마크 제목을 수정한 뒤, 체크 버튼을 누르면 북마크 제목이 업데이트 됩니다.

![5  북마크 페이지에서 북마크 추가, 수정](https://user-images.githubusercontent.com/59536977/190886625-44c5e2ad-d455-4ef5-a427-ce4773418c1d.gif)

<br />

### 모달 북마크 영상 추가

- 로그인을 완료했을 때에만 사용 가능한 기능입니다.

- 영상 아래 하얀 구역을 클릭하면, 북마크에 영상을 추가할 수 있는 모달창이 팝업됩니다.

- 모달창에서도 북마크 폴더를 추가할 수 있습니다.

- 체크박스를 통해 원하는 폴더에 영상을 추가할지 선택할 수 있습니다.

- 이미 해당 북마크에 추가된 영상이면, 체크박스가 이미 활성화되어 추가할 수 없습니다.

![4  모달 북마크 추가](https://user-images.githubusercontent.com/59536977/190886620-433fa776-809c-4ece-bc3a-4856f10b050c.gif)

![8  검색 북마크](https://user-images.githubusercontent.com/59536977/190886638-8398c30c-041d-4b59-b5c3-684ba8245126.gif)

<br />

### 북마크별 영상 보기

- 북마크 리스트의 폴더를 클릭하면, 기 추가된 북마크들을 볼 수 있습니다.

- 북마크 영상의 썸네일과, 제목, 채널 이름, 영상 디스크립션을 리스트로 확인 할 수 있습니다.

- 북마크 영상의 썸네일을 클릭하면, 모달창이 팝업되어 유튜브 영상을 시청할 수 있습니다.

![6  북마크 리스트, 시청](https://user-images.githubusercontent.com/59536977/190886627-bd50acd7-b808-4d66-a817-452e2266744c.gif)

<br />

### 북마크 삭제

- 북마크 리스트 내 영상 썸네일의 X버튼을 클릭하면, 삭제 여부를 묻고 동의하면 삭제합니다.

- 북마크 폴더의 휴지통 버튼을 클릭하면 북마크 폴더의 삭제 여부를 묻고 동의하면 삭제합니다.

![7  북마크 내 영상 삭제, 북마크 삭제](https://user-images.githubusercontent.com/59536977/190886634-5afe331f-bb4b-41fa-b972-844d98b0b98d.gif)

<br />

### 모바일 버전 작동 영상
 
![9  모바일 버전-1](https://user-images.githubusercontent.com/59536977/190886654-fd2c8332-a6f1-4aa9-8fc2-a4863bdbb970.gif)

![9  모바일 버전-2](https://user-images.githubusercontent.com/59536977/190886658-cdf75359-ee9b-413b-8530-10a04c151fac.gif)

![9  모바일 버전-3](https://user-images.githubusercontent.com/59536977/190886661-bf2ecc56-9bd5-4e9e-903b-f0592deefe86.gif)

