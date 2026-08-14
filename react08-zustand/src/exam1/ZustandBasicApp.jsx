import useCounterStore from "./useCounterStore";

function ZustandBasicApp(){
    // 상태저장소에서 필요한 변수와 함수를 구조분해 해서 가져온다.
    const { count, increment, decrement, reset } = useCounterStore();

    return (
        <>
        <h2>Zustand 기본 사용법</h2>
        {/* 상태변수 출력 */}
        <h3>현재 값 : {count}</h3>
        {/* 상태 변경 함수를 여기서 호출해서 간단한 카운트 앱을 만들어 본다. */}
        <button onClick={increment}>+1(증가)</button>
        <button onClick={decrement}>-1(감소)</button>
        <button onClick={reset}>초기화</button>
        </>)
}

export default ZustandBasicApp;
