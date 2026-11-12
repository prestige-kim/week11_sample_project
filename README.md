# 1. Project Information: 프로젝트 소개, 주요 기능 및 원본 Sample Project URL


# 2. Installation: 설치·실행 방법 및 실행 화면
Node.js 20.19+ 또는 22.12+ 권장.

```bash
npm install
npm run dev
```

브라우저에 표시되는 Local URL에 접속하세요. 빌드 테스트: `npm run build`.

# 3. Source Code Exploration: 주요 파일 3개, Component와 Props 관계, useState 및 Event 분석, 주요 코드 2개 설명
- Project Structure: 주요 파일 3개의 역할
    1. App.jsx : 페이지 전체 레이아웃
    2. CourseList.jsx : 
    3. CourseItem.jsx

- Component & Props: CourseList와 CourseItem의 관계 및 Props 전달 방식 <<<<완료>>>>
    CourseList: 부모, CourseItem: 자식
    Props 전달 방식:
    >(부모) CourseList 에서 아래와 같은 방식으로 자식의 함수를 import 하여 자식에게 Props를 넘긴다. **
    ```JavaScript
    import CourseItem from "./CourseItem.jsx";

    <CourseItem
        key={course.id}
        course={course}
        onDelete={handleDelete}
        onToggle={handleToggle}
    />
    ```
    >(자식) CourseItem 에서는 부모가 import 한 함수 파라미터로 Props 객체 전체를 아래와 같이 받아서 사용하는 구조이다. 
    ```JavaScript
    function CourseItem({ course, onDelete, onToggle })
    ```
- State & Event: useState를 이용한 상태 관리 및 삭제 버튼의 동작 원리
- Code Analysis: 주요 코드 2개(각 5~15줄)를 선택하여 동작 원리 설명

# 4. Customizing: 수정한 데이터, 텍스트, 스타일 및 파일명
    수정한 데이터: 실제 2학기 수강 중인 OSS, CV, CAO, DM, ERC, 이공계 글쓰기 과목으로 수정
    텍스트: 제목을 "수강신청 내역"으로 변경, 제목 아래 설명을 "2026학년도 2학기 22300089 김명성 수강신청 내역" 으로 변경
    스타일: 전체 배경을 어둡게 바꿈, 제목 h1 에 color 를 추가해서 노란색으로 바꿈, My Courses 패널의 제목 색을 노란색으로 바꾸고 배경을 어둡게 바꿈, course # 색도 바꿈
    파일명: App.jsx, courses.js, App.css

# 5. Feature Extension: 구현한 기능 2개 이상, 주요 코드 및 동작 결과

# 6. Deployment: 실제 접근 가능한 Vercel URL

# 7. Weekly Review:




