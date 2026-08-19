import { useState } from "react";
import { storage } from "../storageConfig"
import { ref, uploadBytes } from "firebase/storage";

const FileUpload = () => {
    // 스토리지 연결 및 경로설정 
    const imageRef = ref(storage, 'images/myFile.jpg');
    /*
    앞에서 얻어온 참조값을 통해 폴더 및 파일명에 접근할 수 있따.
    parent, root 속성으로 한단계 상위,
    최상위 경로를 표현할 수 있따.
    */
    console.log('경로/파일명', imageRef.fullPath, imageRef.name);
    console.log('parent경로', imageRef.parent.fullPath);
    console.log('root경로', imageRef.root.fullPath);

    // 폴더명 입력을 위한 상태변수
    const [folder, setFolder] = useState('');
    /*
    폴더명 입력 여부에 따라 스토리지의 참조 얻어오기.
    설정한 경로에 따라 해당 폴더 하위에 파일이 업로드 된다.
    */
    const storageRef = ref(storage, (folder==='') ? '':'/' + folder);
    return(<>
        <h2>Storage - 업로드</h2>
        <p>파일을 선택하면 즉시 업로드 됩니다.</p>
        {/* 폴더명은 상태변수(state)를 통해 관리한다. */}
        폴더명 :  <input type="text" name="folder" value={folder} onChange={(e) => setFolder(e.target.value)} />
        <br />
        {/* 파일을 선택하면 스토리지의 참조를 얻어온 후 즉시 업로드 처리한다. */}
        <input type="file" name = "myfile" onChange={(e) => {
            const uploadRef = ref (storageRef, e.target.files[0].name);
            // 합성이벤트 객체의 target 속성으로 파일을 인수로 적용한다.
            uploadBytes(uploadRef, e.target.files[0])
            .then((snapshot) => {
                // 업로드에 성공하면 then 절로 성공메세지 콜백함수를 호출한다.
                console.log('파일 업로드 성공', snapshot);
        });
        }} />
    </>);
}

export default FileUpload;
