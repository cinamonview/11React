import { useLocation, useSearchParams } from 'react-router-dom';


/*
useLocation : 현재 라우트의 정보를 조회하는 훅
    React router를 통해 라우팅 처리된 페이지에서
    현재 URL (경로)과 관련된 정보를 얻는데 사용하는 훅.
    URL경로, 쿼리스트링의 정보를 제공한다.
use
useSearchParams : 현재 라우트의 쿼리스트링 정보를 조회하는 훅
    React router를 통해 라우팅 처리된 페이지에서
    현재 쿼리스트링의 정보를 얻는데 사용하는 훅.
    쿼리스트링의 키와 값을 조회하고 수정할 수 있다.
    (생선님)현재 URL의 쿼리스트링을 얻어오거나 조작할때 사용한다.
*/

const RouterHooks = () => {
    //별도의 인수없이 변수 선언
    const location = useLocation();
    /*
    쿼리스트링의 정보를 얻어와서 저장하기 위한 변수와 
    파라미터 변경을 위한 함수로 정의한다.
    */
    const [searchParams, setSearchParams] = useSearchParams();
    /*
    쿼리스트링에서 파라미터를 얻어온다.
    첫 진입시에는 둘다 null이다.
    조작을 위한 함수를 실행하면 설정된 값을 읽어올 수 있다.
    */
    const mode = searchParams.get('mode');
    const pageNum = searchParams.get('pageNum');

    // 파라미터 mode의 값을 토글하는 함수
    const changeMode = () => {
        //삼항 연산자를 통해 list와 view로 토글할 값을 설정하고
        const nextMode = (mode==='list') ? 'view' : 'list';
        /*
        파라미터 변경을 위한 setter 함수를 실행한다.
        pageNum의 경우 값이 지정되지 않았으므로
        기존의 값을 유지한다.
        */
        setSearchParams({
            mode:nextMode, pageNum
        });
        /*
        ES6에서는 객체 생성시 Key와 Value가 동일하면
        하나의 값만 기술하면 된다.
        {pageNum:pageNum} => {pageNum}과 같이 쓸 수 있다.
        */
    };
/*
    퀴즈] nextPage(), prevPage() 함수 실행시 페이지를 1~10으로 고정하는 기능을 추가하시오. 현재는 버튼을 계속 누르는 경우 페이지번호가 음수가 된다. 
*/

    // 다음페이지로 이동하기 위한 파라미터 조작함수.
    const nextPage = () => {
        /*
        페이지 번호가 null 이거나 없는 상태라면 1로 지정하고 ,
        값이 있는 경우에는 +1 시켜준다. 
        */
        let pageTemp = (pageNum===null || isNaN(pageNum))
                         ? 1 : parseInt(pageNum)+1;
        // 퀴즈] 페이지 번호를 1~10으로 고정
        if (pageTemp > 10) pageTemp = 10;
            alert('최대 페이지 번호는 10입니다.');

                         // mode는 고정된 상태에서 pageNum만 변경한다.
        setSearchParams({
            mode,
            pageNum:pageTemp
        });
    };

    // 이전페이지로 이동하기 위한 파라미터 조작함수.
    const prevPage = () => {
        let pageTemp = (pageNum===null || isNaN(pageNum))
                         ? 1 : parseInt(pageNum)-1;
        // 퀴즈] 페이지 번호를 1~10으로 고정 (음수 방지)
        if (pageTemp < 1) pageTemp = 1;
        alert('최소 페이지 번호는 1입니다.');
        setSearchParams({
            mode,
            pageNum:pageTemp
        });
    };





        return ( <>
            <h2>라우터 관련 Hook</h2>
            <div>
                <ul>
                    {/* 
                    useLocation 훅을 통해 얻을 수 있는 정보
                        pathname : 쿼리스트링을 제외한 Host의 정보를 얻어옴.
                        search : 쿼리스트링을 문자열 형식으로 얻어옴. */}
                    <li>URL : {location.pathname}</li>
                    <li>쿼리스트링 : {location.search}</li>
                    <li>mode : {mode}</li>
                    <li>pageNum : {pageNum}</li>
                </ul>
                {/* 버튼에 함수 연결시에는 이벤트 리스너에 함수명만 붙여주면 된다. */}
                <button onClick={changeMode}>mode 변경</button>
                <button onClick={prevPage}>이전 Page</button>
                <button onClick={nextPage}>다음 Page</button>
            </div>
        </>);
    }
    
    
    export default RouterHooks;
