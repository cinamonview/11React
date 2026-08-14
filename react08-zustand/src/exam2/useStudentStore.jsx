import { create } from "zustand";
// 미들웨어 임포트
import { devtools, persist } from "zustand/middleware";

/*
persist  : 상태를 로컬 스토리지에 저장해서 새로고침해도 입력된 값이 유지되도록한다.
devtools : 확장프로그램인 ReduxDevtools와 연동 가능하게 하는 미들웨어
*/

// 미들웨어 형식에 맞춘 사용자 정의 로깅 함수
const logger = (config)=>(set, get, api) =>
    /* 
    set() 함수가 호출될때 마다 그 호출을 가로채서 로그를 출력하는 용도로 정의한다.
    */
    config(
        // ...args 는 set() 함수로 전달된 모든 인자를 그대로 받아서 
        (...args)=>{
            // 콘솔에 로그로 출력한 후
            console.log('[Zustand 로그', ...args);
            // set() 함수를 호출하여 상태를 업데이트한다.
            //그대로 돌려준다.
            // 즉 로그 출력만 하기 위해 중간에서 가로챈다
            set(...args);
        },
        //get , api는 미들웨어가 가로채지 않고 그대로 넘기는 것을 명시함
        get,api
    );


/*
상태저장소 생성시 3가지의 미들웨어를 적용하기 위해 전체 함수를
감싸준다.
*/
const useStudentStore = create(
    logger(// logger 시작
        devtools(// devtools시작
            persist(// persist시작
                (set)=>({
                    //데이터로 사용할 객체형 배열
                    students : [
                        // 학생이름과 출결여부로 구성된다.
                        {id : Date.now(), name : '성유겸', isHere: false}
                    ],
                    // 학생 수를 카운트하는 변수
                    count : 1,
                    // 학생 추가 함수. 추가할 학생의 이름을 매개변수로 받은후 배열에 추가한다.
                    addStudent : (name) =>
                        // 변경함수. (state)=>newState 형식의 함수로
                        // 이전상태를 받아서 새로운 상태로 변경 후 반환한다.
                        set((state) =>({
                            // 새로운 학생 추가.
                            students:[
                                // 스프레드 연산자로 기존정보를 복사한 후 새로운 객체 추가.
                                ...state.students,
                                {id : Date.now(), name : name, isHere : false}
                            ],
                            // 학생수 1 증가.
                            count : state.count + 1,
                           }),
                           // 전체 교체 여부로 true면 상태를 전체 교체 하고, false면 부분 병합을 실행한다.
                            false,
                        // 액션명. devtools에 기록될 액션명을 정의함.
                        // 보통은 함수명과 동일하게 지정한다.
                         'addStudent'
                        ),

                    // 학생 삭제 함수. 삭제할 학생의 id를 매개변수로 받은후 배열에서 삭제한다.
                    deleteStudent : (id) =>
                        // 매개변수로 전달된 id를 제외한 나머지 항목을 반환해서
                        // 새로운 배열을 생성한다.
                        // 즉 전달된 id를 삭제한다.
                        set((state) => ({
                            students : state.students.filter(
                                (student) => student.id !== id),
                                // 학생수 1 감소
                            count : state.count - 1,
                        }), false, 'deleteStudent'),
                    /*
                    출석 여부를 토글해 주는 함수
                    */
                    toggleAttendance : (id) =>
                        // 출석 상태를 표현한 isHere값을 반전시켜 토글 시킨 후 업데이트 한다.
                        set((state) => ({
                            students : state.students.map(
                                (student) =>
                                     student.id === id ? 
                                        {...student, isHere : !student.isHere} : student
                                    ),
                        }), false, 'toggleAttendance'),
                    }),
                    /*
                    persist 미들웨어 설정으로, 지정된 이름으로 로컬스토리지에 저장된다.
                    */
                    {name : 'student-storage',}
                ),// persist 끝
                {name : 'studentStore'}
            )// devtools 끝
        )// logger 끝
    );

    export default useStudentStore;
                        
                        