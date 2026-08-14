import { useRef, useState } from "react"

/*
useRef :
    컴포넌트의 생명주기 안에서 값을 유지하는 훅으로 , 
    새롭게 렌더링이 되더라도 값이 변하지 않고 유지된다.
    useState와 같이 값은 마음대로 변경할 수 있지만,
    값이 변경될때 리렌더링은 되지 않는다.
    또한 JavaScript의 getElementById()와 같은
     DOM 요소에 접근할때 사용하면 된다.
*/

const UseRefExam1 = () => {
    // State 변수 생성. 화면의 리렌더링을 위해 정의한다.
    const [stateNum, setStateNum] = useState(0);
    // Ref 변수 생성. 값이 변경되어도 리렌더링이 되지 않는다.
    const refNum = useRef(0);
    // 일반 변수 생성. 값이 변경되면 리렌더링이 된다.
    let myNum = 0;

    /*
    위 모든 변수는 0으로 초기화.
    */

    // state의 변수값을 변경
    const plusState = () => {
        // 값을 변경하면 리렌더링 된다.
        setStateNum(stateNum + 1);
        console.log('state증가', stateNum);
    }
    
    // ref의 변수값을 변경
    const plusRef = () => {
        /*
        ref 변수의 경우 current라는 key를 가진 객체로
        생성되므로 Key 값을 통해 접근해야 한다.
        */
        refNum.current = refNum.current + 1;
        console.log('ref증가', refNum.current);
    }

    // 일반 변수의 값을 변경
    const plusMyNum = () => {
        console.log('일반 변수 증가', ++myNum);
    };


    /*
    state를 변경시키면 그때마다 화면이 새롭게 렌더링된다.
    즉 화면에 변화가 생긴다.
    렌더링은 컴포넌트로 정의된 함수를 호출하여 재실행하는 의미이므로
    일반변수의 경우에는 설정된 값으로 초기화된다.
    따라서 컴포넌트의 생명주기 안에서 값을 유지하고 싶다면 
    state나 ref변수를 사용해야한다.
    그렇지 않다면 일반변수를 사용하면 된다.
    */
    return (<>
        <h2>useREf 사용하기</h2>
        <div>
            {/* 각 변수의 값을 화면에 출력 */}
            <p>State : {stateNum} </p>
            <p>Ref : {refNum.current} </p>
            <p>myNum: {myNum}</p>
            {/*  각 변수의 값을 변경하기 위한 버튼들 */}
            <button onClick={plusState}>State 증가</button>
            <button onClick={plusRef}>Ref 증가</button>
            <button onClick={plusMyNum}>myNum 증가</button>            
        </div>
    </>)
}
    
    export default UseRefExam1;
    
    