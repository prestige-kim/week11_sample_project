# 1. Project Information: 프로젝트 소개, 주요 기능 및 원본 Sample Project URL
프로젝트 소개: 수강신청 내역을 관리하는 react 기반 CRUD 프로젝트

주요 기능: 새 과목명 추가, 기존 과목 수정/삭제, 전체 과목 수, 완료 과목 수, 진행 중인 과목 수 표시

원본 Sample Project URL : https://github.com/2026-2-OSS/week11_sample_project.git
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
    기능1 : Create
```jsx
  function handleAdd(event) {
    event.preventDefault();
    // TODO: 빈 입력 검사, 새 과목 객체 생성, setCourses 호출, 입력창 초기화
    if(!(newName.trim())){
      alert("과목명을 입력해주세요.");
    }
    else{
      setNewName(event.target.value);
      const newCourse = { id: courses.length + 1, name: newName, category: 'Elective', completed: false };
      setCourses([...courses, newCourse]); // 기존 객체 배열에 값을 추가하기 위해 스프레드 사용
    }
    setNewName("");
  }    
```
동작 결과: 입력 창에서 받은 과목명을 바탕으로 새로운 과목 객체를 생성해 과목 상태변수인 courses 를 업데이트 한다. setCourses 로 업데이트.

    기능2 : Update
```jsx
  function handleToggle(id) {
    // TODO: map과 spread(...)를 사용하여 해당 id의 completed를 반전
    setCourses(courses.map((course) => {
      return course.id === id ? {...course, completed: !course.completed} : course;
    })); 
  }
```
동작 결과: 기존에 있는 과목들의 체크박스를 누르면 courses 상태변수를 map 으로 하나씩 돌면서 해당 과목의 completed 를 반전시켜 완료 표시 css 가 적용되게 한다.

    기능3 : Edit
```jsx
    // CourseList.jsx (부모)
    function handleEdit(id, newName){
        setCourses(courses.map((course)=>{
            return course.id === id ? {...course, name: newName} : course;
        }));
    }

    // CourseItem.jsx (자식)
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(course.name);

    function handleSave(){
        if(!(editName.trim())){
        alert("과목명을 입력해주세요.");
        return ;
        }

        onEdit(course.id, editName);
        setIsEditing(false);
    }

    <div>
          {
            isEditing 
            ? (<input className="input" type="text" value={editName} onChange={(event) => setEditName(event.target.value)} />) 
            : (<div className={`course-title ${course.completed ? "done" : ""}`}>
                {course.name}
              </div>)
          }
          <div className="course-id">Course #{course.id}</div>
        </div>
    </div>

    <div className="actions">
        {
          isEditing
          ? (<>
              <button className="btn primary" type="button" onClick={handleSave}>Save</button>
            </>)
          : <button
              className="btn primary"
              type="button"
              onClick={() => setIsEditing(true)}
            >
            Edit
            </button>
        }
        <button
          className="btn danger"
          type="button"
          onClick={() => onDelete(course.id)}
        >
          Delete
        </button>
    </div>
```
동작 결과: 자식(CourseItem.jsx)이 edit 여부를 상태변수로 관리한다. edit 버튼을 눌렀을 때 edit 상태변수가 true 가 되면서 해당 과목란에 과목명 대신 입력창이 뜨고 옆에 edit 버튼도 상태변수 상태에 맞게 save 버튼으로 바뀐다. save 버튼을 누르면 handleSave() 가 실행되고 이 안에서 부모의 handleEdit() 을 콜백하는 구조를 가지고 있다. 

# 6. Deployment: 실제 접근 가능한 Vercel URL
https://week11-sample-project-gilt.vercel.app/

# 7. Weekly Review:
- 새롭게 배운 내용 3가지
    
    1. arrow 함수의 활용법

    2. 지속적인 랜더링을 위해 이벤트 처리

    3. 삼항 연산자 활용법

- 어려웠던 점과 해결 방법

    edit 기능을 추가할 때 CourseList 에서 버튼 누르면 html input 이 나오도록 한 번에 처리하려고 했는데 막혔습니다. 과목 리스트를 관리하는 CourseItem 에서 처리를 하여 해결했습니다.
- AI 활용 내용 및 느낀 점

    위에서 언급한 edit 기능이 동작 안하는 이유를 모르겠어서 정답 코드 보여주지 말고 구조적인 문제를 분석해달라고 했습니다. AI 가 자식 컴포넌트에서 리스트의 수정 버튼을 눌렀을 때 html 이 나오도록 구현하고, 상태 변수를 활용해야 한다고 해서 참고하면서 작성했습니다. 

