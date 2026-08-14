import useStudentStore from './useStudentStore';


// 학생을 표현하는 컴포넌트 아이디, 이름, 출석여부를 props로 받는다.
const StudentUnit = ({ id, name, isHere }) => {
    // 상태저장소에서 삭제, 출석여부 토글을 위한 함수만 가져옴
    const {deleteStudent, toggleAttendance} = useStudentStore();

    /*
    출력할 이름의 스타일  지정, 출석 여부에 따라 취소선, 텍스트의 색깔을 결정한다.
    */
    let nameStyle = {
        textDecoration : isHere ? 'line-through' : 'none',
        color : isHere ? 'gray' : 'black',
        cursor : 'pointer'
    };

    return (
        <li>
            {/* 학생의 이름을 클릭하면 출석여부가 토글된다. */}
            <span style={nameStyle} onClick={() => toggleAttendance(id)}>
                {name}
            </span>
            {/* 삭제버튼은 confirm() 으로 확인 후 실행 */}
            <button onClick={() => {
                if (window.confirm('삭제할까유?')){
                    deleteStudent(id);
                }
            }}>삭제</button>
        </li>
    );
};

export default StudentUnit;
