## 모임?모임! PROJECT

<br />
<img src="https://sour-process-b08.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F812354cb-4304-4b1b-b07d-f3c2e18143f4%2F523f4b31-7e81-4d8c-93f1-33f94ef5dde6%2Fmain_(1).jpg?table=block&id=826ce8a5-6b05-4982-8518-4011a18a98ac&spaceId=812354cb-4304-4b1b-b07d-f3c2e18143f4&width=1660&userId=&cache=v2"/>

<br />

## 깃 주소 Link. (https://github.com/FE02-3ThProject/FrontEnd/tree/develop)

<br />

## 배포 주소 Link. (https://www.moim-moim.shop)

## 📆 프로젝트 기간

- 2023.11.27 - 2023.12.22

<br />
<br />

## 📖 주요 기능

### 1. Vite로 개발하였습니다. Vite는 자바스크립트 네이티브 모듈 (opens new window)을 기반으로 한 데브 서버로 ESM 방식을 사용하기 때문에 로컬 서버 구동 속도가 매우 빠릅니다.

### 2. react-query를 사용하여 데이터 Fetching, Caching, 동기화, 서버데이터 업데이트 등을 쉽게 관리.

### 3. TypeScript를 사용하여 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있으며 명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있습니다.

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

| 이름              | 사용 이유                                                                                                                                                                                                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React             | Component 단위의 작성을 통해 UI를 구성하는 개별적인 뷰단위의 개발을 하여 하나의 컴포넌트를 여러 부분에 다중 사용할수 있게 만들거 생산성과 유지 보수를 용이하게 하고 JSX를 사용해 컴포넌트를 쉽게 구성할수 있도록 해주며 Vitual DOM을 이용해 연산 비용을 줄일수 있기에 React 라이브러리를 사용하게 되었습니다. |
| Vite              | Vite는 자바스크립트 네이티브 모듈 (opens new window)을 기반으로 한 데브 서버로 ESM 방식을 사용하기 때문에 로컬 서버 구동 속도가 매우 빠릅니다. 훨씬 더 빠르게 개발하고 배포할 수 있습니다.                                                                                                                    |
| react-query       | react-query를 사용하여 데이터 Fetching, Caching, 동기화, 서버데이터 업데이트 등을 쉽게 관리 Caching을 통해 애플리케이션의 속도를 향상 시킵니다.                                                                                                                                                               |
| TypeScript        | TypeScript를 사용하여 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있으며 명시적인 정적 타입 지정은 개발자의 의도를 명확하게 코드로 기술할 수 있습니다. 이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 합니다.                                                          |
| styled-components | styled-components를 CSS의 컴포넌트화로 스타일시트의 파일을 유지보수 할 필요가 없고 Javascript 환경을 최대한 활용 할 수 있습니다.                                                                                                                                                                              |

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
