import { useNavigate } from "react-router-dom";
import { firestore } from '../firestoreConfig';
import { setDoc, doc } from 'firebase/firestore';


const FireCreate = () => {
    // 화면이동을 위한 훅이다.
    const navigate = useNavigate();

    // 입력정보를 매개변수로 받은 후 입력처리
    const memberWrite = async (p_collection, p_id, p_pass,p_name)=> {
        // 특히 입력한 아이디를 문서명으로 설정한다. 
        // 회원정보에서 아이디는 중복되지 않는 유일한 값이기 때문이다.
        await setDoc(doc(firestore, p_collection, p_id), {
            id : p_id,
            pass : p_pass,
            name : p_name,
            regdate : new Date().toISOString().slice(0, 10),
        });
        // 등록일의 경우 날짜부분만 추가된다.
        alert("입력성공");
        // 입력이 완료되면 읽기 화면으로 이동한다.
        navigate("/read");
    }

    return (
        <>
        <h2>Firestore - 입력하기</h2>
        {/* submit 이벤트가 발생되면 target 속성으로 폼값을 읽어온다. */}
        <form onSubmit={(event)=> {
            event.preventDefault();
            let collection = event.target.collection.value;
            let id = event.target.id.value;
            let pass = event.target.pass.value;
            let name = event.target.name.value;
            
            // 폼값에 빈값이 있는지 검증한다.
            if (id===''){alert('아이디를 입력하세요'); return;}
            if (pass===''){alert('비밀번호를 입력하세요'); return;}
            if (name===''){alert('이름을 입력하세요'); return;}
            
            // 파이어 스토어에 입력처리를 한다.
            memberWrite(collection, id, pass, name);
            //새로운 입력을 위해 입력된 값을 지운다.
            event.target.id.value = '';
            event.target.pass.value = '';
            event.target.name.value = '';
        }}>
            <table border="1">
                <tbody>
                    <tr>
                        <td>컬렉션</td>
                        {/* 컬렉션명은 고정값으로 사용하기 위해 읽기 전용으로 설정한다.
                        readOnly 속성이 없으면은 에러메시지가 발생한다. */}
                        <td><input type="text" name="collection" value="members" readOnly/></td>
                    </tr>
                    <tr>
                        <td>아이디</td>
                        <td><input type="text" name="id" /></td>
                    </tr>
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="password" name="pass" /></td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" name="name" /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">입력</button>
        </form>
    </>);
}
export default FireCreate;