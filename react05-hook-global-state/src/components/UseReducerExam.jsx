import { useState, useReducer } from 'react';


/*
useReducer :
        useState와 동일하게 상태를 관리하기 위한 훅.
        단 상태(state)와 이를 변경하기 위한 리듀서(Reducer) 함수를 분리하여
        관리할 수 있게 해주며, 특히 액션(Action)을 기반으로 상태를 변경한다.
        
        형식]
        const [상태변수, 디스패치함수] = useReducer(리듀서함수, 상태의 초기값);

        ※상태변경을 위해 디스패치 함수를 호출하면 리듀서 함수를 통해
        상태를 변경하게 된다.
*/

/*
리듀서 함수 정의.
매개변수로는 현재 상태와 상태변경을 위한 액션 객체를 받을 수 있도록 정의한다.
*/
const bankReducer = (bankState, bankAction) => {
    console.log("리듀서 호출", bankState, bankAction);
    // 액션 객체의 mode의 값을 통해 분기.
    switch (bankAction.mode) {
        // 입금 처리(액션)
        case "deposit":
            return bankState + bankAction.amount;
        // 출금 처리(액션)
        case "withdraw":
            return bankState - bankAction.amount;
        // 잔액조회(현재의 상태를 그대로 반환.)
        default:
            return bankState;
    }
}

// UI를 담당하는 컴포넌트
const UseReducerExam = () => {
    // 입 / 출금액 변경을 위한 상태변수. input 태그에 적용되어 있따.
    const [inputMoney, setInputMoney] = useState(0);
    /*
    useReducer 훅을 통한 상태변수 선언.
    변수명은 balance, 초기값은 0.
    상태변경을 위해 bankDispatch() 함수를 호출하면,
    내부적으로 bankReducer() 함수를 호출해서 상태를 변경한다.
    */
    const [balance, bankDispatch] = useReducer(bankReducer, 0);
    return (<>
        <h2>UseReducer 사용하기</h2>
        {/* useReducer를 통해 생성한 상태변수. */}
        <p>잔액: {balance}원</p>
        {/* 스핀박스를 눌러 금액을 1000원 단위로 변경할 수 있도록 설정해준다.
        금액의 변경이 있을때마다 state 변경 함수를 호출하여 리렌더링 한다. */}
        <input type="number" value={inputMoney} step={1000} onChange={(e) => {setInputMoney(parseInt(e.target.value));
            }
         } />
         {/* 앞에서 입력한 금액을 아래 버튼을 눌러 입금/출금 처리할 수 있다.
         상태변경을 위해 디스패치 함수를 호출하고, 이때 인수로 액션 객체를 전달한다.
         그러면 mode에 의해서 상황에 맞게 업무가 처리된다. */}
         <button type="button" onClick={() => 
            // mode (입출금 여부), amount(금액)으로 액션 객체 생성
            {bankDispatch({mode: "deposit", amount: inputMoney});}}>입금</button>
         <button type="button" onClick={() => {bankDispatch({mode: "withdraw", amount: inputMoney});}}>출금</button>
         <p>잔액: {balance}원</p>
    </>);
};

export default UseReducerExam;