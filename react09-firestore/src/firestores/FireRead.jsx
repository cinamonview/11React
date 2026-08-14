import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
// 각 패키지로부터 관련 함수, 훅, 컴포넌트를 임포트
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firestoreConfig";


const FireRead = () => {
    // 파이어스토어에 저장된 데이터를 저장하기 위한 상태변수
    const [showData, setShowData] = useState([]);
    // 새로운 렌더링을 위한 상태변수
    const [isRender, setIsRender] = useState(true);

    // 컬렉션 하위 문서 전체를 읽어오기 위한 함수
    const getCollection = async () => {
        let trArray = [];
        // members 컬렉션 하위의 모든 문서를 배열로 얻어온다.
        const querySnapshot = await getDocs(collection(firestore, "members"));
        // 얻어온 문서는 배열이므로 forEach() 함수를 통해 반복할 수 있다.
        querySnapshot.forEach((row) => {
            // 해당루프의 문서를 인출한다.
            let memberInfo = row.data();
            //문서 내부 Key를 이용해서 <tr> 태그를 구성한다. Key는 문서의 고유 아이디를 의미한다.
            trArray.push(
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{memberInfo.pass}</td>
                    <td>{memberInfo.name}</td>
                    <td>{memberInfo.regdate}</td>
                    <td>
                        {/* 수정 링크를 클릭하면 수정 화면으로 이동한다. */}
                        <NavLink to={"/update/"+row.id}>[수정]</NavLink>&nbsp;
                        {/* 삭제 링크 */}
                        {/* 삭제 링크를 클릭하면 삭제 확인 창을 띄우고 삭제를 진행한다. */}
                        <NavLink onClick={async () => {
                            if (confirm('삭제할까요?')){
                                // 삭제시 컬렉션 명과 문서명만 지정한 후 함수를 실행한다.
                                await deleteDoc(doc(firestore, "members", row.id));
                                alert('삭제 성공');
                                // 삭제가 완료되면 화면에 적용하기 위해서 리렌더링 한다.
                                setIsRender(!isRender);
                            }
                        }}>[삭제]</NavLink>
                        </td>
                    </tr>
                );
            });
            // 얻어온 데이터를 화면에 출력하기 위해서 상태변수에 저장한다.
            //데이터 로드가 완료되면 상태를 변경해서 리렌더링한다.
            setShowData(trArray);
        }
        // 1차 렌더링이 완료된 후 함수를 호출하여 데이터를 얻어온다.
        useEffect(() => {
            getCollection();
        }, [isRender]);
        /*
        isRender 상태변수는 데이터를 삭제할때 변경된다.
        따라서 삭제후 화면을 새롭게 렌더링하면서 파이어 스토어에서
        데이터를 다시 얻어오게 된다.
        */

        return (<>
            <h2>Firestore - 목록</h2>
            <table border='1'>
                <thead>
                    <tr className="text-center">
                        <th>아이디</th>
                        <th>비밀번호</th>
                        <th>이름</th>
                        <th>가입일</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {showData}
                </tbody>
            </table>
        </>);
    }
    export default FireRead;

                            
         