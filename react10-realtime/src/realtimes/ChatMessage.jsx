

import { child, push, ref, set, onValue } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
// 리얼타임 객체 임포트
import { realtime } from "../realtimeConfig";
// 상단 네비게이션 바 컴포넌트 임포트
import TopNavi from "../components/TopNavi";
// 채팅페이지에서만 단독으로 사용할 CSS파일 임포트
import './Chat.css';


/*
웹 브라우져의 스크롤바를 최 하단으로 내려주는 함수. 
채팅창에서는 대화내역이 아래쪽으로 채워지므로 스크롤바는 항상 아래쪽에 위치해야 한다.
*/
const scrollTop = (chatWindow) => {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function ChatMessage() {
    //쿼리스트링으로 전달되는 개별파라미터 읽기
    const [searchParams] = useSearchParams();
    //대화방명, 대화명을 읽어서 변수에 저장.
    //대화방명
    const roomId = searchParams.get('roomId');
    //대화명
    const userId = searchParams.get('userId');
    // 대화내용이 디스플레이 되는 DOM 요소 참조
    const chatWindow = useRef();
    // 리얼타임에 저장된 대화내역을 저장할 상태변수
    const [chatData, setChatData] = useState([]);

    /*
    리얼타임에 대화내역을 저장하는 함수.
    메세지 입력하기
    */
    function messageWrite(chatRoom, chatId, chatMessage) {
        // 일련번호로 사용할 문자열 생성해주기
        const newPostKey = push(child(ref(realtime), 'tempValue')).key;
        // set() 함수로 메세지 추가.
        // '대화방명'이 최상위 노드가 되고,
        // 일련번호가 하위 노드로 저장된다.
        set(ref(realtime,chatRoom+'/'+newPostKey),{
            id: chatId,
            message: chatMessage,
        });
        console.log('입력성공');
    }

    // 최상위 노드인 '대화방명'을 통해 참조 변수를 생성해준다.
    const dbRef = ref(realtime, roomId);
    /*
    채팅창이 렌더링된 후에 실행되는 함수.
    최상위 노드인 '대화방명'을 통해 참조 변수를 생성해준다.
    참조 변수를 통해 대화내역을 읽어온다.
    */
    useEffect(() => {
        // onValue() 함수로 대화내역을 읽어온다.
        // 대화내용을 실시간으로 감지할 리스너 함수 실행 (onvalue)
        onValue(dbRef, (snapshot) => {
            // 새로운 메세지가 있으면 0.2초후
            // 스크롤을 아래로 내려준다.
            setTimeout(()=>{
                scrollTop(chatWindow.current);
            }, 200);
            let showDiv =[];
            // 전체 대화내역을 통해 반복으로 실행해준다.
            snapshot.forEach((childSnapshot) => {
                // 해당 루프의 데이터를 인출한다.
                const childData = childSnapshot.val();
                /*
                채팅창에서는 내가 보낸 메세지와 상대방의 메세지를
                서로 다르게 정렬해서 디스플레이 해야 한다.
                */
                if(childData.id === userId) {
                    // 내가 보낸 메세지는 오른쪽으로 정렬해서 출력해준다.
                    showDiv.push(<div key={childSnapshot.key} style={{'textAlign':'right'}}>{childData.message}</div>);
                } 
                else {
                    // 상대방의 메세지는 왼쪽에 아이디와 함께 출력해준다.
                    showDiv.push(<div key={childSnapshot.key}>{childData.id} : {childData.message}</div>);
                }
            });
            setChatData(showDiv);
        });
    }, []);

    return (<>
        <h2>Realtime 채팅</h2>
        대화명 : {userId} &nbsp;&nbsp;
        <button id="closeBtn" onClick={()=>{window.self.close();}}>
            채팅종료</button>
            {/* 대화 내역이 출력되는 DOM 요소 */}
        <div id="chatWindow" ref={chatWindow}>{chatData}</div>
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                let chatRoom = e.target.chatRoom.value;
                let chatId = e.target.chatId.value;
                let message = e.target.message.value;
                // 입력된 메세지가 없다면 경고창을 띄워준다.
                if(message===''){
                    alert('메시지를 입력하세요.');
                    return;
                }
                // 메시지 입력을 위한 함수 호출
                messageWrite(chatRoom, chatId, message);
                e.target.message.value = '';
            }}>
                {/* 대화방명과 대화명은 숨겨서 전달해준다. */}
                {/* 파라미터로 전달받은 채팅방명, 대화명은 hidden 상자로 설정한다. */}
                <input type="hidden" name="chatRoom" value={roomId} />
                <input type="hidden" name="chatId" value={userId} />
                {/* 메세지 입력 상자 */}
                <input type="text" name="message" />
                {/* 전송 버튼 */}
                <button type="submit" >전송</button>
            </form>
        </div>
    </>);
}

export default ChatMessage;