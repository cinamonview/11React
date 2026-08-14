import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//게시판 목록 컴포넌트
function List(){
    //API 통신을 통해 얻어온 데이터를 저장할 상태변수. 초깃값은 빈배열.
    const [boardData, setBoardData] = useState([]);

    //요청 URL
    let requestURL ="http://nakja.co.kr/APIs/php7/boardListJSON.php";
    // 요청 파라미터 : 게시판의 종류, API 키
    let parameter = "tname=board_apis";
    parameter += "&apikey=e88d7c8ed833a7569da4fd9832944404";

    // 외부 API 요청하기
    useEffect(function(){
        fetch(requestURL + "?" + parameter)
            .then((result)=>{
                return result.json();
            })
            .then((json)=>{
                console.log(json);
                //API를 통해 얻어온 데이터로 상태변경 및 리렌더링
                setBoardData(json);
            });
        }, []);

        //의존성 배열에 빈 배열을 설정하여 딱 한번만 실행되도록 처리한다.
        // 즉, 컴포넌트가 마운트될 때만 실행되도록 처리한다.
        // 이후 컴포넌트가 업데이트될 때는 실행되지 않도록 처리한다.
        // 이렇게 하면 컴포넌트가 마운트될 때만 한번만 실행되도록 처리할 수 있다.
        
    
    let lists = boardData.map((row)=>{
        // 작성일은 앞에서 10글자를 잘라서 0000-00-00 형식으로 출력된다.
        let date = row.regdate.substring(0,10);
        // 제목도 문자열 잘라내기 처리(20글자)
        let subject = row.subject.substring(0,20);
        return (
            // 중복되지 않는 key prop는 게시물의 일변번호로 설정해준다.
            <tr key={row.idx}>
                <td className="cen">{row.idx}</td>
                {/* 열람 링크는 일련번호를 파라미터로 사용해서 요청  URL을 생성한다. */}
                <td><Link to={"/view/" + row.idx}>{subject}</Link></td>
                <td className="cen">{row.name}</td>
                <td className="cen">{date}</td>
            </tr>
        );
    });
    return (<>
        <header>
        <h2>게시판-목록</h2>
      </header>
      <nav>
        <Link to="/write">글쓰기</Link>
      </nav>
      <article>
        <table id="boardTable">
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {/* 앞에서 map() 함수를 통해 처리한 UI를 이 부분에 삽입 */}
            {lists}
          </tbody>
        </table>
      </article>
    </>);
}

export default List;