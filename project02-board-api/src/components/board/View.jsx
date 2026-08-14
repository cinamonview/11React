import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";



function View(){
    // 화면 이동을 위한 Hook.
    const navigate = useNavigate();
    /*
    경로변수 (Path variable) 형식의 라우팅 처리방식에서
    파라미터(일련번호)를 읽어오기 위한 훅
    */
    const params = useParams();
    //게시물 데이터 저장을 위한 상태 변수
    const [boardData, setBoardData] = useState({});
    // 외부 API 요청을 위한 요청 URL과 파라미터 변수
    let requestURL = 'http://nakja.co.kr/APIs/php7/boardViewJSON.php';
    // 파라미터( 일련번호 idx 추가됨. )
    let parameter = "tname=board_apis&idx="+params.idx;
    parameter += "&apikey=e88d7c8ed833a7569da4fd9832944404";

    //렌더링 후 API 요청 및 리렌더링
    useEffect(function(){
        fetch(requestURL+"?"+parameter)
        .then((result)=>{
            return result.json();
        })
        .then((json)=>{
            setBoardData(json);
        })
    }, []);

    return (<>
        <header>
            <h2>게시판 - 열람</h2>
        </header>
        <nav>
            <Link to="/list">목록</Link>&nbsp;
            <Link to={"/edit/"+params.idx}>수정</Link>&nbsp;
            <Link onClick={()=> {
                //삭제 여부 확인
                if(window.confirm('정말 삭제하시겠습니까?')){
                    //삭제 api를 호출하여 삭제처리
                    fetch('http://nakja.co.kr/APIs/php7/boardDeleteJSON.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                        // 삭제이므로 게시물의 일련번호만 있으면 됨.
                        body: new URLSearchParams({
                            tname: 'board_apis',
                            idx: params.idx,
                            apikey: 'e88d7c8ed833a7569da4fd9832944404',
                        }),
                    })
                    .then((result)=> {
                        return result.json();
                })
                    .then((json)=> {
                        // 삭제에 성공인 경우에는 경고창을 띄우고 목록으로 이동
                        if(json.result === 'success'){
                            alert('삭제되었습니다.');
                            navigate('/list');
                        }
                        else{
                            alert('삭제에 실패했습니다.');
                        }
                    });
                }
            }}>삭제</Link>
            </nav>
            
            <article>
            <table id="boardTable">
                <colgroup>
                    <col width="20%" />
                    <col width="*"/>
                </colgroup>
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td>{boardData.name}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{boardData.regdate}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{boardData.subject}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        {/* HTML 태그가 그대로 출력된다.
                        React에서는 보안적인 이유로 태그를 화면에 그대로 출력하는 것이 디폴트 설정이다.
                        즉 마크업 되지 않은 상태로 출력한다. */}
                        <td style={{whiteSpace: 'pre-wrap'}}>{boardData.content}</td>

                        {/* 엔터키로 줄바꿈을 하는 경우 웹브라우저에서는
                        <br>태그로 처리해야 한다.
                        여기서는 CSS의 whiteSpace: 'pre-wrap' 속성을 사용하여 줄바꿈을 처리한다. */}

                        {/* 마크업이 적용된 상태로 출력된다.
                        해당 속성명은 HTML 태그가 적용된 상태로 출력하는
                        것은 '위험' 할 수 있다는 의미를 담고 있다. */}
                        {/* <td dangerouslySetInnerHTML={
                            {__html: boardData.content}}
                            style={{whiteSpace: 'pre-wrap'}}></td> */}
                    </tr>
                </tbody>
            </table>
        </article>
    </>);
}

export default View;