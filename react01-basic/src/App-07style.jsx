
/*
JSX에서 스타일을 적용하는 방법 :
    JSX에서는 HTML과는 조금 다른 방식으로 스타일을 적용한다.
        -class 속성은 className으로 변경한다. JavaScript에서는 
            이미 예약어로 사용하고 있기 때문이다.
        -id 속성은 그대로 사용할 수 있따.
        -style 속성을 인라인 방식으로 사용할 때는 컬리브레이스(콧수염괄호)로
            JSON 객체 형식의 값을 부여해야 한다. 
*/
// 이미지 경로를 통해 임포트
import jqueryLogo from './assets/jquery.png';


function App() {
    // CSS 스타일을 JSON 객체 형식으로 정의
    const myStyle = {
        color: "white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Verdana"
    };
    const iWidth = {maxWidth: '300px'};

    return(<>
        <h2>React - Style</h2>
        <ol>
            {/* style 속성으로 인라인 방식의 스타일 부여.
            이때는 콧수염괄호{{}}를 통해 속성값을 부여한다. */}
            <li style={{color: 'red'}}>프론트엔드</li>
            <ul>
                {/* public 하위의 img 폴더에 있는 이미지를 화면에 표시한다.
                React 프로젝트에서 정적파일은 주로 public 폴더를 사용한다. */}
                <li><img src="/img/html_css_js.png" style={iWidth}></img></li>
                {/*  import한 이미지를 표시해준다. */}
                <li><img src={jqueryLogo} style={iWidth} /></li>
                {/*  http://로 시작하는 외부 이미지 표시 */}
                <li><img src="http://nakja.co.kr/images/reactjs.png" style={iWidth}/></li>
            </ul>
            {/* index.css에 정의된 스타일 시트를 적용한다.
            이 파일은 main.jsx에서 이미 import 처리가 된 상태이므로
            별도의 처리없이 즉시 사용할 수 있다. */}
            <li className='backEnd'>백엔드</li>
            <ul>
                <li id='backEndSub'>Java</li>
                {/* class 속성을 사용하면 크리티컬한 에러가 발생하지는
                않지만 경고가 발생되므로 권고사항대로 className을 사용하도록 한다. */}
                <li class='Warning'>Oracle</li>
                <li style={myStyle}>JSP</li>
                <li>Spring Boot</li>
            </ul>
        </ol>
    </>)
}
    export default App