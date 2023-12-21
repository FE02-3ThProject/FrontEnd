## 모임?모임! PROJECT

<br />
<img src="https://sour-process-b08.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F812354cb-4304-4b1b-b07d-f3c2e18143f4%2F54a23f4d-35ca-4d4a-b1ee-2ec15717ee4b%2Fscreencapture-localhost-5173-2023-12-21-14_40_54.png?table=block&id=8fbfeb7d-33f6-4cea-8434-f09af6ae13e8&spaceId=812354cb-4304-4b1b-b07d-f3c2e18143f4&width=2000&userId=&cache=v2"/>

<br />

## 깃 주소 Link. (https://github.com/FE02-3ThProject/FrontEnd/tree/develop)

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

<summary>➡️ CORS(Cross-Origin Resource Sharing) 에러</summary> 
  <br/>

- **`문제점`** <br/>
  백엔드 배포 후 보안 상의 이유로 끊임없는 CORS 에러 발생하였습니다.
- **`해결방안`**<br/>
  - 1.  Controller에 @CrossOrigin(origins = "\*") 추가 → 다시 CORS 에러 발생
  - 2.  CorsConfig 생성
        SecurityConfig에 .cors().and(), .addFilter(corsCofig.corsFilter()) 추가
- **`결과`**<br/>
  CORS(Cross-Origin Resource Sharing) 에러가 해결되었습니다.

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
