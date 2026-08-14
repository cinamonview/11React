import { useState, useRef, useOptimistic } from "react";

// 메세지를 서버로 전송하는 것을 표현한 비동기 함수
async function deliverMessage(message) {
    // 실제 네트워크 요청처럼 보이도록 1초 대기후 전달받은 메세지 반환
    await new Promise((res) => setTimeout(res, 1000));
    // 처리가 진행되는 1초를 기다린 후 값을 반환하기 위해 await 처리를 해준다.
    return message;
}


// 메세지 목록과 입력폼을 렌더링하는 컴포넌트
function Thread({ messages, sendMessage }) {
    // <form> 태그의 DOM을 참조하기 위한 Ref 변수
    const formRef = useRef();

    // 폼 제출시 실행되는 비동기 함수
    async function formAction(formData) {
        // 폼값으로 받은 메세지를 UI에 즉시 추가 (낙관적 업데이트)
        addOptimisticMessage(formData.get('message'));
        // 다음 메세지 입력을 위해 폼 전체를 리셋해준다.
        formRef.current.reset();
        // 메세지를 서버로 전송해준다.
        await sendMessage(formData);
    }

    /*
    useOptimistic 훅을 사용하여 낙관적 메세지 상태 정의
        optimisticMessages : 낙관적 업데이트가 반영된 상태로 UI에 즉시 렌더링 할 값을 지정해준다.
        addOptimisticMessage : 낙관적 항목을 UI에 추가하는 함수
        messages : useState로 선언한 최초 메세지의 상태
        상태변경함수 : 현재 상태와 메세지를 받은 후 기존 배열에 새로운 메세지 객체를 추가한다.
    */
    // useOptimistic: [낙관적 UI 상태, 낙관적 업데이트 함수]
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages,
        (state, newMessage) => [
            ...state,
            {
                text: newMessage,
                sending: true
            }
        ]
    );

    // 메세지 목록과 입력폼 UI를 렌더링
    return (
        <>
        {/*  낙관적 업데이트로 즉시 반영할 UI를 통해 반복 실행 */}
        {optimisticMessages.map((message, index) => (
            <div key={index}>
                {/* 입력한 메세지 출력 */}
                {message.text}
                {/* !!은 boolean값으로 강제 변환하기 위한 코드
                메세지를 입력하면 낙관적 업데이트로 인해 즉시 화면에 표시된다. */}
                {!!message.sending && <small> (Sending...)</small>}
            </div>
        ))}
        {/* 입력폼 구성. 폼 제출시 formAction() 함수를 호출하여
        폼값을 처리한다. */}
        <form action={formAction} ref={formRef}>
            <input type="text" name="message" placeholder="메세지를 입력해주세요" />
            <button type="submit">Send</button>
        </form>
    </>);
}

const UseOptimisticExam = () => {
    // 메세지 관리를 위한 상태변수. 초기값은 객체형 배열로 생성된다.
    const [messages, setMessages] = useState([
        {
            text : "기본 메시지 입니다", sending: false, key: 1}
    ]);
    // sending 키값은 false 일때 'Sending...' 메세지가 숨김처리된다.

    // 메세지 전송을 위한 함수 정의
    async function sendMessage(formData) {
        // 메세지 전송시 1초간 대기후 반환해주는
        // 함수 호출 (실제 서버 호출을 가정한다.)
        const sentMessage = await deliverMessage(formData.get('message'));
        // 1초후 반환된 메세지로 상태 업데이트
        setMessages((messages) => [...messages,{text: sentMessage, sending: false}]);
        /*
        즉 처음 메세지가 추가될때 true 였던 항목을 false로 변경한다.
        그러면 "Sending..." 부분이 숨김처리 된다.
        */
    }
     
    // 전체 UI 구성. 상태변수와 함수를 프롭스로 전달한다.
    return (
        <div>
            <h2>useOptimistic 훅 사용하기</h2>
            <Thread messages={messages} sendMessage={sendMessage} />
        </div>
        );
    };
    export default UseOptimisticExam;


