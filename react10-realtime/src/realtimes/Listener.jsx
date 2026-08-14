import { useEffect, useState } from "react";
import { ref, onValue, child, set } from "firebase/database";
import { realtime } from "../realtimeConfig";
import TopNavi from "../components/TopNavi";


function Listener() {
    // 데이터 처리를 위한 상태변수를 생성해준다.
    const [fireData, setFireData] = useState([]);
    // users 노드 하위의 데이터를 참조하는 변수 dbRef를 생성해준다.
    const dbRef = ref(realtime, 'users');
    // 1차 렌더링 후 onValue() 함수 실행
    // useEffect() 함수를 통해 데이터베이스의 데이터 변동을 감지하고 처리한다.
    useEffect(()=>{
        // 이 함수를 통해 리얼타임 리스너 기능을 구현할 수 있따.
        // onValue() 함수를 통해 데이터베이스의 데이터 변동을 감지하고 처리한다.
        onValue(dbRef, (snapshot)=> {
            // 데이터에 CRUD가 발생하면 실시간으로 감지하여 데이터를 인출한다.
            // 데이터 처리를 위한 변수 showTr를 생성해준다.
            let showTr = [];
            // 인출한 데이터의 갯수만큼 반복
            // snapshot.forEach() 함수를 통해 데이터베이스의 데이터를 순회하며 처리한다.
            snapshot.forEach((childSnapshot)=>{
                //아이디를 인출(users 노드 하위의 구분자 역할)
                const childKey = childSnapshot.key;
                // 아이디 하위에 저장된 데이터를 인출한다.
                // 데이터를 인출
                const childData = childSnapshot.val();
                showTr.push(
                    <tr>
                        <td>{childKey}</td>
                        <td>{childData.name}</td>
                        <td>{childData.pass}</td>
                        <td>{childData.fireKey}</td>
                    </tr>
                );
            });
            // 상태 변경후 렌더링
            setFireData(showTr);
        });

    }, []);

    return (<>
        <TopNavi></TopNavi>
        <h2>Realtime Database - Listener</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>패스워드</th>
                    <th>고유키</th>
                </tr>
            </thead>
            <tbody>
                {fireData}
            </tbody>
        </table>
    </>);
}

export default Listener;