## 모임?모임! PROJECT

<br />
<img src="https://sour-process-b08.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F812354cb-4304-4b1b-b07d-f3c2e18143f4%2F69593339-4808-4ca2-9825-cec84c074a61%2Fscreencapture-localhost-5173-2023-12-22-01_47_37.png?table=block&id=9c7e82fa-60c3-4a0a-afaa-e1f43760d53c&spaceId=812354cb-4304-4b1b-b07d-f3c2e18143f4&width=1660&userId=&cache=v2"/>

<br />
<br />

## 📆 프로젝트 기간

- 2023.11.27 - 2023.12.22

<br />

## 깃 주소 Link. https://github.com/FE02-3ThProject/FrontEnd/tree/develop

<br />

## 배포 주소 Link. https://www.moim-moim.shop

<br />
<br />

## 📖 주요 기능

### 1. Vite로 개발하였습니다. Vite는 자바스크립트 네이티브 모듈 (opens new window)을 기반으로 한 데브 서버로 ESM 방식을 사용하기 때문에 로컬 서버 구동 속도가 매우 빠릅니다.

### 2. react-query를 사용하여 데이터 Fetching, Caching, 동기화, 서버데이터 업데이트 등을 쉽게 관리.

### 3. TypeScript를 사용하여 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있으며 명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있습니다.

<br />
<br />

<img src="https://sour-process-b08.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F812354cb-4304-4b1b-b07d-f3c2e18143f4%2F587fc5f4-5bc9-47f4-bba9-5f6c439fdf5c%2F%25EC%258B%259C%25EC%258A%25A4%25ED%2585%259C%25EC%2595%2584%25ED%2582%25A4%25ED%2585%258D%25EC%25B2%2598.jpg?table=block&id=3b86af03-b4cb-4e4b-99fd-ccc06ed828dc&spaceId=812354cb-4304-4b1b-b07d-f3c2e18143f4&width=2000&userId=&cache=v2"/>

<br />
<br />

## 🛠 기술 스택

<div align=left>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"> 
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
</div>
<br>
<br>

## 💻 라이브러리 및 프레임워크

| 이름              | 사용 이유                                                                                                                                                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React             | Component 단위의 작성을 통해 UI를 구성하는 개별적인 뷰단위의 개발을 하여 하나의 컴포넌트를 여러 부분에 다중 사용할수 있게 만들거 생산성과 유지 보수를 용이하게 하고 JSX를 사용해 컴포넌트를 쉽게 구성할수 있도록 해주며 virtual dom을 이용해 연산 비용을 줄일수 있기에 React 라이브러리를 사용하게 되었습니다. |
| Vite              | Vite는 자바스크립트 네이티브 모듈 (opens new window)을 기반으로 한 데브 서버로 ESM 방식을 사용하기 때문에 로컬 서버 구동 속도가 매우 빠릅니다. 훨씬 더 빠르게 개발하고 배포할 수 있습니다.                                                                                                                     |
| react-query       | react-query를 사용하여 데이터 Fetching, Caching, 동기화, 서버데이터 업데이트 등을 쉽게 관리 Caching을 통해 애플리케이션의 속도를 향상 시킵니다.                                                                                                                                                                |
| TypeScript        | TypeScript를 사용하여 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있으며 명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있습니다. 이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 합니다.                                                           |
| styled-components | styled-components를 CSS의 컴포넌트화로 스타일시트의 파일을 유지보수 할 필요가 없고 Javascript 환경을 최대한 활용 할 수 있습니다.                                                                                                                                                                               |

<br/><br/>

## 🔥 트러블 슈팅

<summary>➡️ 데이터 형식 오류 에러</summary> 
  <br/>

- **`문제점`** <br/>
  - 모임 생성시 서버에 JSON형식으로 데이터를 넘기려고 하니 오류가 발생했습니다.
- **`해결방안`**<br/>
  - 폼데이터형식으로 변경 후 요청을 보내니 성공했습니다.
- **`문제점`** <br/>
  - 리액트 쿼리 적용을 안하고 코드를 작성했습니다.
- **`해결방안`**<br/>
  - 모든 비동기 통신을 axios를 사용해서 하다가 리액트 쿼리를 사용하여 관리했습니다.
- **`문제점`** <br/>
  - 서버로 부터 AccessToken과 RefreshToken을 함께 받아서 클라이언트에서 쿠키에 저장하고 AccessToken이 만료 되면 가지고 있는 RefreshToken을 사용해서 다시 AccessToken을 재발급 받으려 하였지만 AccessToken을 다시 재발급 받지를 못하였다.
- **`해결방안`**<br/>
  - 쿠키에 새롭게 저장되는 값을 찾아보니 NaN이 뜨고 있길래 대체 무슨 소린가 했더니 자바 스크립트의 농간이었던 것으로 결국 모든 삽질이 해결되었다. 서버로 부터 받는 토큰이름에 - 가 들어가는거 때문에 숫자로 인식해버린 것이었다!
- **`문제점`** <br/>
  - 통신을 통해 받은 데이터를 map매소드를 이용해서 카드 형식으로 나열하려고 하였지만 이때 interface로 타입을 지정해 둔것과 카드에 주는 키값과 data값이 제대로 매칭이 안되는 오류가 발생 하였다
- **`해결방안`**<br/>
  - interface에 타입 설정시 data로 묶어서 설정한게 문제가 발생하였었다. 그래서 키값으로 groupId를 받아오려고 해도 data의 data안에 groupId를 찾아야 됫고 ​또한 MeetingType의 정의에 따르면 data 필드 내에 각 회의 정보가 담겨야 하지만, 실제로는 MeetingType[]의 형태로 배열이 반환되어 각 회의 정보에 직접 접근할 수 없게 되었습니다.

<br /><br/>

## 😎 팀원

<table>
   <tr>
    <td align="center"><b><a href="https://github.com/unchul">임운철</a></b></td>
    <td align="center"><b><a href="https://github.com/hanjihyeong">한지형</a></b></td>
    <td align="center"><b><a href="https://github.com/newsks">신수경</a></b></td>
  </tr>
  <tr>
    
  <td align="center"><a href="https://github.com/unchul"><img src="https://avatars.githubusercontent.com/u/105141025?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/hanjihyeong"><img src="https://avatars.githubusercontent.com/u/143388067?v=4" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/newsks"><img src="https://avatars.githubusercontent.com/u/129296269?v=4" width="100px" /></a></td>  
   
  </tr>
  <tr>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
  </tr>
</table>
