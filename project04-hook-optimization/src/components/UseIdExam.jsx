import { useEffect } from "react";
import { useId } from "react";

/*
<input> 상자와 <label> 태그를 하나의 그룹으로 묶어 출력해주는
컴포넌트
useId()는 고유한 아이디를 생성할때 사용하는 훅으로 DOM요소의 아이디를
부여하거나 라벨링을 할때 편리하게 사용할 수있다.
*/
const InputField = ({ label, name, autoFocus = false}) => {
    // 변수 생성시에는 별도의 인수는 필요하지 않다.
    const id = useId();
    // useEffect() 함수는 렌더링 후 실행된다.
    // 렌더링 후 autoFocus 가 true라면 해당 DOM요소에 포커싱된다.
    useEffect(() => {
        if (autoFocus) {
            document.getElementById(id).focus();
        }
    }, []);
    // 빈 배열을 부여했으므로 딱 한번만 실행된다.
    // 따라서 해당 DOM요소가 생성될때 한번만 실행된다.

    /*
    HTML에서는 <label> 태그는 주로 체크박스나 라디오와 함께 사용된다.
    <label> 태그의 for 속성과 <input> 태그의 id 속성값이 일치하면 
    하나의 요소로 그룹화 되어 선택 영역이 보다 넓어지는 효과가 있다.
    단 for는 예약어이므로 JSX에서는 htmlFor로 기술해야 한다.
    */
    return (
        <>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} name={name} />
        </>
    );
};

/*
<input> 상자와 <label> 태그를 하나의 그룹으로 묶어 출력해주는
컴포넌트
useId()는 고유한 아이디를 생성할때 사용하는 훅으로 DOM요소의 아이디를
부여하거나 라벨링을 할때 편리하게 사용할 수있다.
*/
 
const MyForm = () => {
    //하나의 아이디를 생성한 후 다른 텍스트를 연결해서 사용할 수 있다.
    const commonId = useId();
    return (
        <div>
            {/* 컴포넌트를 이용해서 여러개의 input 요소를 편리하게 추가할 수 
            있다. 
            렌더링이 되면 아이디 입력상자에 자동으로 포커싱된다. */}
            <InputField label="아이디" name="id" autoFocus/> <br />
            <InputField label="이름" name="name" /> <br />
            성별
            <input type="radio" id={`${commonId}-gender1`} name="gender" />
            <label htmlFor={`${commonId}-gender1`}>남자</label>
            <input type="radio" id={`${commonId}-gender2`} name="gender" />
            <label htmlFor={`${commonId}-gender2`}>여자</label> <br />
        </div>
    );
};

const UseIdExam = () => {
    // useId() 로 생성된 아이디는 _r_0_ 부터 순차적으로 아이디가 부여된다.
    return (<>
        <h2>useId() 사용하기</h2>
        <MyForm />
    </>);
};

export default UseIdExam;