import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";




function Edit(){
    // navigate :  페이지 이동 훅
    // params : 파라미터 관련 훅
    const navigate = useNavigate();
    const params = useParams();
    // 기존 작성된 게시물의 내용을 얻어오기 위한 열람 API 호출
    let requestURL = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
    let parameter = "tname=board_apis&idx="+params.idx;
    parameter += "&apikey=e88d7c8ed833a7569da4fd9832944404";

    /*
    <input> 태그의 value 속성에 값을 설정하면
    React는 ReadOnly 속성으로 렌더링 한다.
    따라서 이 값을 수정하려면 스테이트가 필요하다.
    onChange 핸들러에서 setter 함수를 호출하여 값을 
    변경할 수 있도록 해야 한다.
    */
   // 입력상자의 갯수만큼 상태변수를 생성하였다.
    const [writer,setWriter] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    // 열람 API를 요청하여 데이터를 얻어온다.
    useEffect(function(){
        fetch(requestURL+"?"+parameter)
        .then((result)=>{
            return result.json();
        })
        .then((json)=>{
            // 얻어온 데이터를 파싱해서 상태변수 변경 ( input에 설정된 값.) 
            setWriter(json.name);
            setTitle(json.subject);
            setContents(json.content);
        })
    }, []);

    return (<>
        <header>
            <h2>게시판 - 수정</h2>
        </header>
        <nav>
            <Link to="/list">목록</Link>&nbsp;
        </nav>
        <article>
        <form onSubmit={
            (event)=>{
            event.preventDefault();
            // 수정 처리를 위한 API 호출
            fetch('http://nakja.co.kr/APIs/php7/boardEditJSON.php',
                 {
                method: 'POST',
                headers: {
                    'Content-Type':
                    'application/x-www-form-urlencoded;charset=utf-8',
                },
                // 입력값과 게시물의 일련번호를 쿼리스트링으로 조합한다.
                body: new URLSearchParams({
                    tname: 'board_apis',
                    idx: params.idx,
                    name: event.target.writer.value,
                    subject: event.target.title.value,
                    content: event.target.contents.value,
                    apikey: 'e88d7c8ed833a7569da4fd9832944404',
                }),
            })
            .then((response)=> response.json())
            .then((json)=> console.log(json));

            // 수정이 완료되면 내용 확인을 위해 열람페이지로 이동한다.
            navigate("/view/"+params.idx);
        }
    }>
        <table id="boardTable">
            <tbody>
                <tr>
                    <th>작성자</th>
                    {/* 스테이트에 저장된 값을 value에 설정하고,
                    onChange 이벤트 핸들러를 통해 입력한 값을 
                    실시간으로 변경해서 적용한다. */}
                    <td>
                        <input type="text" name="writer" value={writer}
                        onChange={(event)=> {setWriter(event.target.value)}} />
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>
                        <input type="text" name="title" value={title}
                        onChange={(event)=> {setTitle(event.target.value)}} />
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    {/* HTML에서는 textarea에 값을 적용하려면
                    태그사이에 값을 삽입해야 하지만 JSX는 
                    input과 동일하게 value속성을 사용하면 값을 설정할 수 있다. */}
                    <td>
                        <textarea name="contents" rows="3" value={contents}
                        onChange={(event)=> {setContents(event.target.value)}} />
                    </td>
                </tr>
            </tbody>
        </table>
        <input type="submit" value="수정" />
        </form>
        </article>
        </>
    );
}

export default Edit;