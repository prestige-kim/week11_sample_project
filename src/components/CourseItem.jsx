import { useState } from "react";

// [제공] 부모 CourseList로부터 Props를 전달받는 자식 컴포넌트입니다.
export default function CourseItem({ course, onEdit, onDelete, onToggle }) {
  // 수정 모드를 판단하는 boolean 상태 변수와 과목명 관리하는 상태 변수
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

  return (
    <div className="course-row">
      <div className="course-main">
        <input
          className="check"
          type="checkbox"
          checked={course.completed}
          onChange={() => onToggle(course.id)}
          aria-label={`${course.name} 완료 여부`}
        />
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
      <div className="category-cell">
        <span className="category">{course.category}</span>
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
    </div>
  );
}
