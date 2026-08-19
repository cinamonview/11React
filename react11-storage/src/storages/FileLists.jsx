import { useParams } from "react-router-dom"
import { storage } from "../storageConfig";
import { useEffect, useState } from "react";
import { deleteObject, getDownloadURL, listAll, ref } from "firebase/storage";
import { NavLink } from "react-router-dom";

const FileLists = () => {
    // 라우팅 처리에서 :path로 지정된 변수로 이미지 경로가 전달된다.
    let params = useParams();
    // 이미지 경로에 따라 스토리지의 참조변수를 생성한다.
    let paramPath = params.path ? params.path : '';
    /*
    root 경로 -> 
        ref(storage, '')
    imgs 경로
        ref(storage, 'imgs') 이와같이 참조를 생성
        */
    const myPathRef = ref (storage, paramPath);

    // 상태변수 생성. 파일 목록 및 리렌더링을 위한 상태변수를 생성한다.
    const[fileLists, setFileLists] = useState([]);
    const[renderFlag, setRenderFlag] = useState(false);

    useEffect(() => {
        let fileRows = [];
        // 현재 경로의 참조변수를 통해 파일 목록을 얻어온다.
        listAll(myPathRef)
            .then((res) => {
                // root 경로 하위 폴더를 먼저 출력한다.
                res.prefixes.forEach((folderRef) => {
                    fileRows.push(
                        // 폴더의 이름 및 링크 생성
                        <tr key={folderRef.name}>
                            <td><NavLink to={`/filelists/${folderRef.name}`}>{folderRef.name}
                            </NavLink></td>
                            <td></td>
                            <td colSpan={2}>폴더명</td>
                        </tr>
                    );
                });
                //파일의 목록 출력
                res.items.forEach((itemRef) => {
                    // 전체 경로를 이용해서 삭제를 위한 참조를 생성한다.
                    const deleteRef = ref(storage, itemRef.fullPath);
                    // 저장된 파일명을 통해 이미지의 경로 정보를 얻어온다.
                    // 이미지 경로 정보를 얻어온 후 이미지 태그의 src 속성에 설정한다.
                    getDownloadURL(ref(myPathRef,itemRef.name))
                    .then((url)=>{
                        // 이미지 명으로 생성한 id속성을 <img> 태그의 DOM객체를 얻어온다
                        const img = document.getElementById(`img_${itemRef.name}`);
                        console.log('url',url);
                        //src 속성에는 이미지의 경로를 설정
                        img.setAttribute('src',url);
                        // width 속성에는 가로크기 즉 200px로 설정
                        img.setAttribute('width', '200');
                        })
                    .catch((error) =>{
                        console.log(" 이미지 다운로드 중 에러",error)
                    });
                fileRows.push(
                    <tr key={itemRef.name}>
                        {/* 이미지의 전체 경로 출력 */}
                        <td>{myPathRef.fullPath}</td>
                        {/*  이미지 파일명을 통해 id 속성값 부여 */}
                        <td><img id={`img_${itemRef.name}`} /></td>
                        {/* 파일명 출력 */}
                        <td>{itemRef.name}</td>
                        <td><button type="button" onClick={() => {
                            if(window.confirm('정말 삭제하시겠습니까?')){
                                // 앞에서 생성한 파일 삭제를 위한 참조로 삭제처리
                                deleteObject(deleteRef)
                                    .then(()=>{
                                        console.log("파일 삭제 성공");
                                        // 파일이 삭제되면 화면을 리렌더링
                                        setRenderFlag(!renderFlag);
                                    })
                                    .catch((error) => {
                                        console.log(" 파일 삭제 실패",error);
                                    });
                                }
                            }}>삭제</button></td>
                    </tr>
                );
            });
            setFileLists(fileRows);
        })
        .catch((error) => {
            console.log(" 파일 목록 출력 중 에러발생",error);
        });
    }, [renderFlag,paramPath]);
    /*
    상태변수 renderFlag가 변경되거나, 일반변수 paramPath가 변경되면
    UseEffect()  훅을 재실행 하도록 의존성 배열을 설정한다.
    */

    return (<>
        <h2>Storage - 목록보기</h2>
        <p>현재위치 :  /{myPathRef.fullPath}</p>
        <table border={1}>
            <tbody>
                <tr>
                    <th>경로명</th><th>이미지</th><th colSpan={2}>파일명</th>
                </tr>
                {fileLists}
            </tbody>
        </table>
        </>);
}


export default FileLists;