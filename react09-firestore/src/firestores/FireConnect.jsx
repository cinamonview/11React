// 파이어 스토어 객체 임포트
import { firestore } from '../firestoreConfig';
import { setDoc, getDoc, doc } from 'firebase/firestore';

const FireConnect = () => {
    // 파이어 스토어 연결 확인
    console.log("firestore",firestore);

    //문서(도큐먼트) 추가 함수
    /*
    컬렉션 :  테이블과 유사하다.
            하위에 문서가 추가되면서 데이터가 저장된다.
    문서 : 
            레코드와 유사하다. 하나의 문서에는 관련된 정보가 저장된다.
    */

    
    const addMessage = async () => {
        /*
       문서 추가 함수
       
       형식] setDoc(문서의 참조값, 추가할 데이터)
       데이터는 객체 형식으로 작성하면 된다.
        */

        await setDoc(doc(firestore, "React", "Firebase"), {
            category : " 파이어 스토어 ",
            book : "React로 개발자 되기",
            Publisher : '골든 래빗',
        });
        console.log("입력성공");
    }

    // 문서 읽기 함수
    const getMessage = async () => {
        // 입력된 컬렉션과 문서를 통해 문서의 참조값을 얻어온다.
        const docRef = doc(firestore, "React", "Firebase");
        //참조값을 통해 문서를 얻어온다.
        const docSnap = await getDoc(docRef);
        //이 문서가 존재하면 콘솔에 출력한다.
        if (docSnap.exists()) {
            console.log(docSnap.data());
        } else {
            console.log("문서가 없습니다.");
        }
    }


    return (
        <>
        <h2>Firestore - 연결</h2>
        <input type="button" value="입력 Test" onClick={addMessage} />
        <input type="button" value="읽기 Test" onClick={getMessage} />
    </>);
}

export default FireConnect;

