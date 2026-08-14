// 리덕스 툴킷에서 제공하는 훅을 임포트 한다.
// 리덕스에서 제공하는 2가지 훅 임폴트
import { useDispatch, useSelector } from "react-redux"
// 슬라이스에서 정의한 3가지 함수 임포트
import { increment, decrement, reset } from "./counterSlice";

/*
useSelector : 
        컴포넌트에서 스토어에 저장된 전역상태값을
        읽어오기 위한 훅
useDispatch : 
        상태 변경시 실행하는 함수를 생성하는 훅.
        호출시 액션 객체를 인수로 전달한다.
*/
const ReduxBasicApp = ()=>{
    //스토어에 등록된 상태변수를 가져옴
    const countVal = useSelector((nowState)=>nowState.myCounter.myValue);
    // 디스패치 함수 선언
    const dispatch = useDispatch();
    
    return (<>
        <h2>Redux 기본사용법</h2>
        {/* 상태변수 출력 */}
        <h3>현재 값 : {countVal}</h3>
        {/* 각 함수를 버튼에 연결해서 실행한다.
        디스패치 함수를 통해 리듀서를 호출해서 각 기능을 실행한다. */}
        <button onClick={()=>{dispatch(increment())}}>증가</button>
        <button onClick={()=>{dispatch(decrement())}}>감소</button>
        <button onClick={()=>{dispatch(reset())}}>리셋</button>
    </>);
};

export default ReduxBasicApp;