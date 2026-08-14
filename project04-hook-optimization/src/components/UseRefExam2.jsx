import { useEffect, useRef } from "react";



const UseRefExam2 = () => {
    // 2개의 Ref 변수 생성. DOM 요소 제어를 위한것 이므로 초깃값은 필요없음
    const passRef1 = useRef();
    const passRef2 = useRef();

    //컴포넌트의 1차 렌더링 후 실행.
    useEffect(() => {
        console.log('passRef',passRef1,passRef2);
        // 비밀번호 첫번째 입력상자에 포커싱
        passRef1.current.focus();
    }, []);

    // 비밀번호 검증을 위한 함수
    const checkPassword = () => {
        // 2개의 비밀번호가 모두 입력되어 있는지 확인한다.
        if(!passRef1.current.value || passRef2.current.value=='') {
            alert('비밀번호를 입력해주세요');
            passRef1.current.focus();
            return;
        }

        // 2개의 비밀번호가 동일한 입력값인지 확인
        if(passRef1.current.value === passRef2.current.value) {
            alert('비밀번호 확인이 완료되었습니다.');
        }
        else {
            // 일치하지 않는 다면 경고창을 띄우고
            alert('비밀번호가 일치하지 않습니다.');
            // 기존 입력값을 모두 지운후
            passRef1.current.value = '';
            passRef2.current.value = '';
            // 첫번째 입력상자로 포커스를 이동한다.
            passRef1.current.focus();
        }
    }

    return (<>
        <h2>useRef 사용하기 2 </h2>
        <form>
            패스워드 1 : <input type="text" ref={passRef1} name='pass1'  />
            <br />
            패스워드 2 : <input type="text" ref={passRef2} name='pass2'  />
            <br />
            <button type="button" onClick={checkPassword}>패스워드 확인</button>
        </form>
    </>);
}

export default UseRefExam2;