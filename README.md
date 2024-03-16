![image](https://github.com/seongjin2427/perple/assets/59536977/a3f4d3c2-47b6-47cd-85a5-bc9c4d4901e2)


# Perple

안녕하세요! 

유튜브 영상을 북마크로 관리할 수 있도록 구현한 **Perple**을 만든 이토 입니다.

Perple은 **'Personal Player'의 줄임말**입니다.

유튜브 서비스 이용 중 불편함을 느낀 부분을 해소하고자 구현해보았습니다.

<br />

# Perple 프로젝트 구조

![image](https://github.com/seongjin2427/perple/assets/59536977/35cdd22f-d278-42f7-a3e7-3ae8935f9528)

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

// perple 프로젝트 폴더로 이동
cd perple

// 서버 폴더로 이동
cd back

// 패키지 설치
yarn

// 서버 실행
yarn dev

---

// 웹서버 실행, 새 터미널을 연 뒤
cd front

// 패키지 설치 
yarn

// 리액트 웹서버 실행
yarn start
```

<br />

## Google Oauth 로그인 프로세스

![image](https://github.com/seongjin2427/perple/assets/59536977/70dfbec3-6fe5-4859-892b-fabfa902f312)


1. Google 로그인 버튼을 클릭하면,
    - 사용자를 Google 로그인 URL(`https://accounts.google.com/o/oauth2/v2/auth`)로 Redirect 합니다.
    - `Authorization Code`를 포함한 응답을 받을 Redirect URL(`/auth/google/callback`)을 쿼리 스트링에 포함시킵니다.
    (사전에 Google Flatform에서 발급받은 Google Client ID, 최종적으로 응답받을 사용자 정보 범위도 함께 쿼리스트링에 포함시킵니다.)
2. Perple 서버로 `Authorization Code`를 포함한 응답을 받습니다.
3. 응답 받은 `Authorization Code`를 포함하여 `Access Token`을 요청합니다.
4. Perple 서버에서 `Access Token`을 응답 받습니다.
5. 발급 받은 `Access Token`을 포함하여 필요한 사용자 정보를 요청합니다.
    - 요청하는 사용자 정보: `email`, `nickname`, `profile image`
6. 요청한 사용자 정보를 응답받습니다.
7. 응답 받은 사용자 정보를 기반으로, MongoDB에 해당 사용자의 정보를 생성합니다.
    - 해당 사용자의 DB ID와 시크릿 키를 기반으로 `Refresh Token`을 생성합니다.
8. Perple 클라이언트로 `Refresh Token`을 쿠키에 담아 보냅니다.
9. 발급 받은 `Refresh Token`을 쿠키에 포함되어 Perple 서버로 `Access Token`을 요청합니다.
10. `Refresh Token`을 확인하여, 해당 `Refresh Token을` 가진 사용자 정보를 조회합니다.
    - `Access Token`과 조회된 사용자 정보를 응답으로 반환합니다.
11. 반환 받은 `Access Token`을 Local Storage에 저장합니다.
    - 전역 상태의 사용자 정보에 응답 받은 사용자 정보를 업데이트 합니다.
    - 전역 상태인 로그인 상태를 `true`로 업데이트 합니다.

<br />

## Axios Interceptors를 통한 요청 헤더 `Access Token` 포함 로직 구현

**문제점**

- 북마크 등의 서버 요청은 반드시 인증 받은 사용자만이 요청할 수 있어야 합니다.
- 인증 받았음을 증명하려면, 매 요청마다 요청 헤더에 `Access Token`을 포함해야 합니다.
- 서버 요청 로직마다 `Access Token`을 포함하는 로직을 작성한다면,
    - 반복된 작업으로 개발자에게 번거로움을 줍니다.
    - 누락이 발생하여 에러를 발생시킬 위험이 있습니다.

**Axios Interceptor를 통한 `Access Token` 포함 로직 구현**

- `localStorage`에 저장된 `Access Token`을 매 API 요청 시 마다 요청 헤더에 포함합니다.
- 이를 통해 매번 동일한 로직을 작성할 필요가 없으며, 누락의 위험도 사라집니다.

```tsx
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.withCredentials = true;
    }

    return config;
  }
);

export default instance;
```

<br />

## 전역 상태 관리 (로그인, 사용자 정보)

**문제점**

- 로그인 여부는 다양한 컴포넌트에서 참조하기 때문에 어디서든 참조할 수 있도록 전역 스코프를 가지도록 구성해야 했습니다.
- `Redux-toolkit`을 통해 `globalSlice`를 구현, 전역 상태로 관리할 수 있도록 구성했습니다.
- 로그인 여부, 사용자 정보를 전역 상태로 관리함으로써 서비스 내에서 항상 참조할 수 있습니다.

**로그인 및 사용자 정보를 전역 상태로 관리**

- 새로고침 등을 통한 로그인 상태를 상실할 경우, 로그인 상태가 `false`로 초기화 됩니다.
- 로그인 상태가 `false`인 경우, `useEffect` 훅을 통한 로그인 로직이 실행됩니다.
- 기존에 로그인을 하여 발급받은 `Refresh Token`이 존재한다면 자동 로그인이 됩니다.

```tsx
const Header = () => {
	... 
  const { isLogin: isAuth, ... } = useSelector(
    ({ global }: RootState) => global
  );

  const loginFunction = useCallback(async () => {
    if (!isAuth) {
      try {
        const { data } = await instance.post("/auth/token");

        if (data.accessToken) {
          localStorage.setItem("Authorization", data.accessToken);
          dispatch(userInfoSet(data.userInfo));
          dispatch(userLogin());
        } else {
          dispatch(userLogout());
          loginFunction();
        } 
      } catch (e) {
        console.log(e);
        dispatch(userLogout());
      }
    }
  }, [dispatch, isAuth]);

  useEffect(() => {
    loginFunction();
  }, [loginFunction]);

	...
}
```
<br />

## 북마크 관련 로직을 커스텀 훅으로 관리

**문제점**

- 북마크와 관련 로직은 다양한 컴포넌트에 분산되어 있었습니다.
- 때문에, 중복되는 로직이 있는지 일일이 기억하고 파악하기에 어려운 점이 있었습니다.
- `useBookmark`라는 커스텀 훅을 통해 북마크 관련 로직을 하나의 커스텀 훅에서 모두 관리하고자 했습니다.

`**useBookmark` 커스텀 훅 구현**

- 북마크와 관련된 로직은 모두 `useBookmark`를 통해 관리하였기에 필요한 북마크 관련 로직을 찾아 이리저리 헤멜 필요가 없었습니다.
- 하지만 로직이 추가될수록 코드의 복잡도가 높아져 로직 간의 의존성이 발생하거나 가독성이 떨어지게 되었습니다.

```tsx
const useBookmark = (
  options?: 'true',
): [BookmarkType[], UseBookmarkActionType] => {
  const isAuth = useSelector(({ global }: RootState) => global.isLogin);
  const [bookmarkList, setBookmarkList] = useState<BookmarkType[]>([]);
  const [addBookmarkList, setAddBookmarkList] = useState<string[]>([]);

  const getBookmarkList = async (option?: string) => {
    const fetchedBookmark = await getAllBookmark(option || '');
    if (fetchedBookmark) setBookmarkList(fetchedBookmark.bookmark);
  };

  useEffect(() => {
    if (isAuth) getBookmarkList(options);
  }, [isAuth, options]);

  const actions = {
    fetchingBookmark: async function (options: string) {
			...
    },
    onChangeBookmarkCheck: function (idx: string) {
	    ...
    },
    onClickConfirmAddBookmark: async function (videoInfo: BookmarkInfoType) {
			...
    },
    onClickCreateBookmark: async function (bookmarkTitle: string) {
			...
    },
    onClickRemoveBookmark: async function (id: string) {
			...
    },
    onClickModifyBookmarkTitle: async function (
      bookmarkId: string,
      title: string,
    ) {
			...
    },
    onClickRemoveVideo: async function (bookmarkId: string, id: string) {
			...
    },
  };

  return [bookmarkList, actions];
};
```

<br />

## Icon 사용을 위한 통합 컴포넌트 구현

**문제점**

- UI 구현에 필요한 아이콘(`svg`파일)을 매번 경로에 맞춰 `import`하기가 번거로웠습니다.

**`IconSet` 컴포넌트 구현**

- 아이콘별로 따로 `import` 하는 과정 없이 하나의 컴포넌트로 아이콘을 사용할 수 있습니다.

- `svg` 아이콘 파일을 `ReactComponent`로 내보내는 `index.ts`파일을 작성합니다.

```tsx
// assets/icon/index.ts
export { ReactComponent as BinIcon } from './bin.svg';
export { ReactComponent as BallpenIcon } from './ball-pen.svg';
export { ReactComponent as ArrowDownIcon } from './arrow-down.svg';
export { ReactComponent as ArrowUpIcon } from './arrow-up.svg';
export { ReactComponent as CheckIcon } from './check.svg';
export { ReactComponent as CrossIcon } from './cross.svg';
export { ReactComponent as ChevronLeftIcon } from './chevron-left.svg';
export { ReactComponent as ChevronRightIcon } from './chevron-right.svg';
```

- 모든 아이콘 컴포넌트를 통합한 `IconSet` 컴포넌트를 구현합니다.

```tsx
import React, { SVGProps } from 'react';
import * as Icon from 'assets/icon/index';

type IconType = keyof typeof Icon;

interface IconSetProps extends SVGProps<SVGSVGElement> {
  iconType: IconType;
}

const IconSet = ({ iconType, ...svgProps }: IconSetProps) => {
  const IconComponent = Icon[iconType];
  return (
    <IconComponent {...svgProps} />
  );
};

export default IconSet;

```

![타입 지원을 통해 사용 가능한 아이콘을 바로 확인할 수 있습니다.](https://github.com/seongjin2427/perple/assets/59536977/e4a9bf32-0678-422b-a67d-22ad290e9c41)

타입 지원을 통해 사용 가능한 아이콘을 바로 확인할 수 있습니다.

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

