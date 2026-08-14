import { Link, useNavigate } from "react-router-dom";



function Write(){

    // 페이지 이동을 위한 Hook 선언 . 별도의 인자없이 변수 생성
    //페이지 이동을 위한 Hook
    const navigate = useNavigate();

    return (<>
    <header>
      <h2>게시판-작성</h2>
    </header>
    <nav>
      <Link to="/list">목록</Link>
    </nav>
    <article>
    <form onSubmit={
        (event)=>{
            event.preventDefault();
            /**
            작성 API 호출
            fetch () 함수를 통해 post 방식으로 요청을 하는 경우
            객체 형식의 두번째 인자가 필요하다 . 그러하다 .
             */
            fetch(
                'http://nakja.co.kr/APIs/php7/boardWriteJSON.php',
                //1. 전송방식 설정
                {
                    method: 'POST',
                    // 2. 헤더성정( 컨텐츠 타입, 케릭터 셋)
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    },
                    /*
                    3. 바디 설정
                    작성자가 입력한 폼값을 JSON 형식으로 조립하여 전송한다.
                        URLSearchParams 객체는 JavaScript에서 제공되며,
                        JSON 형식의 데이터를 쿼리스트링 형식으로 변환한다.
                    */
                    body : new URLSearchParams({
                        'tname' : 'board_apis',
                        'apikey' : 'e88d7c8ed833a7569da4fd9832944404',
                        'name' : event.target.writer.value,
                        'subject' : event.target.title.value,
                        'content' : event.target.contents.value,
                    }),
                }
            )
            .then((resopnse) => Response.json())
            .then((json) => console.log(json));

            //글쓰기가 완료되면 목록으로 이동.
            navigate('/list');
            }
        }>
            <table id="boardTable">
                <tbody>
                    <tr>
                        <th>작성자</th>
                        <td><input type="text" name="writer" /></td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" name="title" /></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea name="contents" rows="3"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <input type="submit" value="작성" />
            </form>
    </article>
    
    </>);
}

export default Write;