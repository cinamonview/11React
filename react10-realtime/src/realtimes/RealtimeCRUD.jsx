import { child, get, getDatabase, push, ref, remove, set, update } from "firebase/database";
import { realtime } from "../realtimeConfig";
import { useState } from "react";
import TopNavi from "../components/TopNavi";


function RealtimeCRUD() {
    console.log("realtime", realtime);

    // 데이터 입력하기
    function writeUserData(userId, userName, userPass){
        // 새로운 게시물 등록을 위한 Key값을 생성한다. -ioo3ab와 같은 문자열이 생성된다.
        const newPostKey = push(child(ref(realtime), 'tempValue')).key;
        /*
        set() 함수 : 
                기본 쓰기 작업에 사용된다.
                지정된 참조에 데이터를 저장하고 해당경로의 
                기존 데이터를 모두 변경할 수 있다.
                users 노드 하위에 사용자 아이디가 하나씩 
                추가되는 형식으로 저장된다.
                만약 userID가 동일하다면 덮어쓰기(수정)된다.
        */
        set(ref(realtime, 'users/'+ userId),{
            name : userName,
            pass : userPass,
            fireKey : newPostKey
        });
        console.log('입력성공');
    }

    // 데이터 읽기
    function readUserData(userId){
        // 데이터베이스 객체를 통해 참조값을 생성하고 얻어온다.
        const dbRef = ref(getDatabase());
        // users 노드에 등록된 아이디가 있는지 확인후 데이터를 인출한다.
        get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                // 데이터가 존재한다면 콘솔에 출력
                console.log('데이터', snapshot.val());
            } 
            else {
                console.log("데이터가 없습니다.");
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    // 데이터 수정
    function editUserData(userId, userName, userPass){
        // 고유키 생성
        const newPostKey = push(child(ref(realtime), 'tempValue')).key;
        // 수정할 데이터를 객체 형식으로 작성했다.
        const postData = {
            name: userName,
            pass: userPass,
            fireKey: newPostKey
        };
        // 빈 객체 생성
        const updates = {};
        // 객체에 수정할 데이터를 Key-Value 형식으로 추가한다.
        updates['/users/' + userId] = postData;
        // 수정할 데이터를 데이터베이스에 적용한다.
        // 수정함수 실행. 기존 데이터 뒤에 'edit' 를 붙여서 실행한다.
        return update(ref(realtime), updates);
        }

        // 삭제1
        function deleteUserData1(userId){
            // 빈 객체를 하나 생성한다.
            const deletes ={};
            // Key-Value 형식으로 지정할때 null 값을 입력
            deletes['/users/' + userId] = null;
            // 수정을 위한 함수이지만 Value가 null이므로 삭제처리된다.
            return update(ref(realtime), deletes);
        }

        // 삭제2
        function deleteUserData2(userId){
            // remove() 함수를 통해 데이터를 삭제한다.
            // users노드 하위의 아이디를 지정한다.
            remove(ref(realtime, 'users/' + userId))
            .then(() => {
                console.log('삭제성공');
            })
            .catch((error) => {
                console.error('삭제실패',error);
            });
        }

        const [addNum, setAddnum] = useState(0);
        let adder = "-"+addNum;
        const id = 'nakja'+adder;
        const name = '낙자쒬'+adder;
        const pass = "xyz"+adder;

        return (<>
            <TopNavi></TopNavi>
            <h2>Realtime Database - CRUD</h2>
            <input type="number" value={addNum} onChange={(e) => setAddnum(e.target.value)} />
            <input type="button" value='입력' onClick={() => {writeUserData(id, name, pass)}} />
            <input type="button" value='읽기' onClick={() => {readUserData(id);}} />
            {/* 수정시에는 기존 문자열에 'edit'를 추가해서 인수로 전달한다.*/}
            <input type="button" value='수정' onClick={() => {editUserData(id, name+'edit', pass+'edit');}} />
            <input type="button" value='삭제1' onClick={() => {deleteUserData1(id);}} />
            <input type="button" value='삭제2' onClick={() => {deleteUserData2(id);}} />
        </>);
    }

export default RealtimeCRUD;