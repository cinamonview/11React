import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../firestoreConfig";


const FireUpdate = () => {
    /*
    수정페이지의 라우팅 처리는 
    'path=update/:userid'와 같이
    되어 있다.
    경로형태로 아이디가 파라미터로 전달되면 이 값을
    useParams() 훅을 통해 읽을 수 있다.
    */
    const params = useParams();
    /*
    화면이동을 위한 함수를 호출하기 위한 객체
    useNavigate() 훅을 통해 읽을 수 있다.
    */
    const navigate = useNavigate();

    // 입력상자에 설정된 값 수정을 위한 상태변수
    const [id,setId] = useState('');
    const [pass,setPass] = useState('');
    const [name,setName] = useState('');

    /*
    수정처리 : 
            컬렉션 명만 매개변수로 전달되고, 나머지 입력값은 상태변수로
            관리되므로 별도의 전달없이 바로 사용이 가능하다.
    */
    const memberEdit = async (p_collection) => {
        // 쓰기와 동일한 함수를 사용한다. 즉 기존문서가 있다면 수정처리한다.
        await setDoc(doc(firestore, p_collection, params.userid),{
            id,
            pass,
            name,
            redgate : new Date().toISOString().slice(0,10),
        });
        alert('수정 성공');
        navigate('/read');
    }
    /*
    수정할 문서를 읽어오기 위한 함수
    기존 문서를 읽어오기 위한 함수
    */
    const getMember = async (userid) => {
        // 컬렉션명과 문서명을 통해 참조값을 얻어온다.
        const docRef = doc(firestore, "members", userid);
        // 참조를 통해 문서의 내용을 인출한다.
        const docSnap = await getDoc(docRef);
        // 인출된 문서가 있으면 수정폼의 input 태그에 값을 설정한다.
        if (docSnap.exists()) {
            console.log("문서:", docSnap.data());
            let callData = docSnap.data();
            setId(callData.id);
            setPass(callData.pass);
            setName(callData.name);
        }
        else {
            console.log("문서가 존재하지 않습니다.");
        }
    }
    /*
    1차 렌더링 이후 데이터를 인출해서 설정한다.
    의존성 배열은 빈 배열로 설정되었으므로 딱 한번만 실행된다.
    */
    useEffect(() => {
        getMember(params.userid);
    }, []);

    return (<>
        <h2>Firestore - 수정하기</h2>
        <form onSubmit={(event)=>{
            event.preventDefault();
            // 여기서는 폼값이 submit 되면 컬렉션 명만 target을 통해 받으면 된다.
            let collection = event.target.collection.value;
            // 컬렉션명만 인수로 전달해서 수정처리한다.
            memberEdit(collection);
        }}>
            <table border='1'>
                <tbody>
                    <tr>
                        <td>컬렉션</td>
                        <td><input type='text' name='collection' value='members' readOnly /></td>
                    </tr>
                    <tr>
                        <td>아이디 (변경불가)</td>
                        <td><input type='text' name='id' value={id} readOnly /></td>
                    </tr>
                    {/* value 속성에 적용된 값은 기본적으로 readOnly로 렌더링 되므로
                    값의 변경을 위해 state를 이용해야 한다. */}
                    <tr>
                        <td>비밀번호</td>
                        <td><input type="text" name="pass" value={pass}
                        onChange={(event)=>{setPass(event.target.value);}} /></td>
                    </tr>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" name="name" value={name}
                        onChange={(event)=>{setName(event.target.value);}} /></td>
                    </tr>
                    <tr>
                        <td colSpan='2' align='center'></td>
                    </tr>
                </tbody>
            </table>
            <button type='submit'>수정하기</button>
        </form>
        </>);
    }
    export default FireUpdate;