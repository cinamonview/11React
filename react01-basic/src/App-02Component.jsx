
/*
컴포넌트는 일반적인 JavaScript 함수와 같이 제작할 수 있다.
이름이 있는 유기명 함수, 이름이 없는 무기명 함수,
화살표 함수 모두 사용할 수 있따.
단 return문에 삽입된 UI가 웹브라우저에 렌더링 되므로
 return문이 필수로 작성되어야 한다.
*/
function FrontComp() {
  /**
  JSX에서 UI를 작성할 때는 반드시 최상위 엘리먼트는 1개여야 한다.
  만약 2개 이상이 되면 에러가 발생하게 된다.
  그래서 React에서는 최상위 엘리먼트를 대신해서 
  빈 꺽쇄괄호인 프래그먼트(<> </>)를 주로 사용한다. 
  */

  return (<>
    
    
        <li>프론트엔드</li>
        <ul>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>JavaScript</li>
            <li>jQuery</li>
        </ul>
        </>)
}

//화살표 함수 형식으로 컴포넌트 제작.
const BackComp =() => {

  return (<>
        <li>백엔드</li>
        <ul>
            <li>Java</li>
            <li>Oracle</li>
            <li>JSP</li>
            <li>Spring Boot</li>
        </ul>
    </>)
}
// 익명함수 형식으로 컴포넌트 제작
let FormComp = function() {

  return (<>
    <form>
        <select name="gubun">
            <option value="fromt">프론트엔드</option>
            <option value="back">백엔드</option>
        </select>
        {/* <input> 태그와 같이 싱글태그를 사용할때는
        self-closing 형식으로 <input /> 형식으로 작성해야 한다.
        그렇지 않으면 에러가 발생한다.
        JSX는 XML의 문법을 따르기 때문이다. */}
        <input type="text" name="title" />
        <input type="submit" name="추가"></input>
    </form>
    </>);
}
function App() {
  return (<>

  <h2>React - Component</h2>
  <ol>
    {/* 쌍(Pair)으로 작성하지 않는다면 아래와 같이 
    셀프클로징 형식으로 작성해야 한다. */}
    <FrontComp />
        {/* 컴포넌트를 삽입할때는 HTML 태그와 같이 작성하면 된다.
    단 반드시 닫는 태그가 있어야 한다. */}
    <BackComp></BackComp>
    {/* 컴포넌트로 제작했으므로 재사용이 매우 편리하다. */}
    <FormComp />
  </ol>
  </>)
}


export default App
