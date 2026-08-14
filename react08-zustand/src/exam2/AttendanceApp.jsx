import { useState } from "react";
import useStudentStore from "./useStudentStore";
import StudentUnit from "./StudentUnit";



// 생성과 동시에 export를 하고 있다.
export default function AttendanceApp() {
    // 입력상자를 위한 상태변수 
    
    const[ name, setName ] = useState('');
    //상태저장소에서 필요한 변수와 함수를 얻어옴
    const { students, count, addStudent } = useStudentStore();


    return (<>
        <h2>출결 관리 App</h2>
        <p>총 학생수 : {count}</p>
        {/*  학생 추가를 위한 입력상자 */}
        <input type="text" placeholder="이름을 입력하세요" value={name} onChange={(e) => setName(e.target.value)}
    />
    {/* 학생 추가를 위한 입력 버튼 */}
    <button onClick={() => {
        // 입력된 이름이 있을때만 함수를 호출해서 학생 추가
        if (name.trim()){
            addStudent(name);
            // 추가가 완료되면 입력상자 비움
            setName('');
        }
    }}>추가</button>
    <ol>
        {/* 학생수만큼 반복해서 목록 출력 */}
        {students.map((student)=>(
            // 학생 정보를 표현하는 컴포넌트를 반복해서 출력
            <StudentUnit key = {student.id} {...student} />
        ))}
    </ol>
    </>);
}