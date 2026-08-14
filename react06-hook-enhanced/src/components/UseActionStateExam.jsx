import { useActionState } from 'react';

// 로그인 처리를 위한 비동기 함수 정의
async function authLogin(prevState, formData) {
    // 첫번째 매개변수인 이전 상태를 콘솔로 확인
    console.log('prevState',prevState);
    // 사용자가 입력한 폼값을 읽어준다.
    const userid = formData.get('userid');
    const userpw = formData.get('userpw');

    // 1초 지연을 위한 코드.
    await new Promise(resolve => {setTimeout(resolve, 1000);
});

    // 로그인 처리 결과를 반환한다.
    if (userid === "nakja" && userpw === "1234") {
        return "로그인 성공";
    } else {
        return "로그인 실패";
    }
}

const UseActionStateExam = () => {
    /*
    message : authLogin() 함수가 반환한 상태값이다.
        "로그인 성공" 혹은 "실패"
    formAction : useActionState() 함수가 생성한 폼 액션 함수.
        form 태그의 action 속성값으로 사용된다.
    isPending : 폼값이 제출중인지 확인하기 위한 boolean 값.
    authLogin () : 폼이 제출될때 호출되는 비동기 함수.
    null : 상태의 초기값. 즉 message 변수의 초기상태.
    */
    const [message, formAction, isPending] = useActionState(authLogin, null);
    return (<>
        <h2>useActionState 사용하기</h2>
        <form action={formAction}>
            아이디 : <input type="text" name="userid" />
            <br />
            비번 : <input type="text" name="userpw" />
            <br />
            <button type="submit">로그인</button>
            {/* 로그인 처리중 로딩 메세지 표현 . 
            폼값이 제출중이라면 true를 반환한다. */}
            {isPending ? "Loading..." : message}
            <br />
        </form>    
    </>);
}

export default UseActionStateExam;