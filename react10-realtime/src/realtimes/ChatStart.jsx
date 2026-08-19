import { ref } from "firebase/database";
import { useRef } from "react"
import TopNavi from "../components/TopNavi";

// 대화방명, 대화명 입력을 위한 컴포넌트
const ChatStart = () => {
    // input 입력상자의 DOM을 참조하기 위한 Ref변수
    const refRoom = useRef();
    // 대화명 입력상자의 DOM을 참조하기 위한 Ref변수
    const refId = useRef();
    /*
    채팅창을 팝업으로 띄워주는 함수.
    이때 입력한 대화방명 대화명이 파라미터로 전달된다.
    */
    // 채팅창 시작 버튼 클릭 시 실행되는 함수
    const openChatWin = () => {
        /*
        useRef() 훅으로 생성한 변수는 {current: 값}과 같은 형태의
        객체로 생성되므로 아래와 같이 사용해야 한다.
        */
        window.open(
            `./#/chat/talk?roomId=${refRoom.current.value}&userId=${refId.current.value}`,
            '',
            'width=400,height=500'
        );
            //대화명은 지우고 대화방명은 고정값으로 유지한다.
            refId.current.value = '';
        }

    return (<>
        <TopNavi></TopNavi>
        <h2>Realtime Database - Chatting</h2>
        {/* ref 속성으로 Ref변수 부여. 이 속성은 컴포넌트가 렌더링된 후에 실행된다.
        대화방명은 myChatting1로 고정. 채팅창 시작 버튼 클릭 시 대화방명이 변경되지 않도록 한다. */}
        대화방명 : <input type="text" name="roomId" value="myChatting1" ref={refRoom} readOnly />
        <br />
        대화명 : <input type="text" name="userId" ref={refId} />
        <br />
        <button onClick={openChatWin}>채팅창 시작</button>
    </>);
};

export default ChatStart;