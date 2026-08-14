/**
Event 처리 :
    HTML에서는 이벤트 리스너를 작성할때 대소문자를 구분하지 않는다.
    하지만 React는 이벤트명의 첫글자를 반드시 대문자로 작성해야 한다.
    또한 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 전달하는 용도로
    주로 사용된다.
 */


function FrontComp(props){
  // 매개변수는 props로 정의되어 있다. 즉 모든 프롭스를 한꺼번에 받을 수 있다.
  return(<>
  {/* <a> 태그를 통해 생성한 링크를 클릭하면 부모로 부터
  전달받은 함수를 호출한다. 그러면 alert()를 통해 경고창이
  화면에 표시된다. */}
    <li><a href="/" onClick={()=>{
      props.onMyEvent1();
    }}>프론트엔드</a></li> 
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
      <li>jQuery</li>
    </ul>
  </>)
}
//프롭스를 구조분해해서 전달받는다.
const BackComp = ({onMyEvent2}) => {
  return(<>
  {/* 
  이벤트 리스너에서는 Event 객체를 통해 화면이 새로고침 되지 않도록
  기본동작을 차단한다.
  <a> 태그는 화면이동이 기본동작이므로 클릭했을때 
  화면이 새로고침 된다.
  */}
  <li><a href="/" onClick={(event)=>{
    //기본동작차단
    event.preventDefault();
    // 부모가 프롭스를 통해 전달해준 함수를 호출할때 인수를 전달한다.
    // 즉 부모 컴포넌트 쪽으로 데이터를 전달한다.
    onMyEvent2('백엔드 클릭됨(자식전달)');
  }}>백엔드</a></li>
  <ul>
    <li>Java</li>
    <li>Oracle</li>
    <li>JSP</li>
    <li>Spring Boot</li>
  </ul>
  </>)

}
  


function App() {
  return(<>
    <h2>React - Event</h2>
    <ol>
      {/* 프롭스를 통해 함수를 전달하고 있다.
      이 함수는 고정된 메세지를 알림창으로 출력한다. */}
      <FrontComp onMyEvent1={()=>{
        alert("프론트엔드 클릭됨 (부모전달");
      }}></FrontComp>
      {/* 
      프롭스를 통해 매개변수가 있는 함수를
      자식 컴퍼넌트로 전달한다.
      이를 통해 자식이 전달한 데이터가 부모쪽에서 사용된다.
      이벤트 객체를 통해 화면이 새로고침 되지 않도록 기본동작을 차단한다.
      React는 비동기 방식으로 화면을 전환하므로,
      화면이 새로고침되면 초기화면으로 전환된다.
      */}
      <BackComp onMyEvent2={(msg)=>{
        alert(msg);
      }}></BackComp>
    </ol>
  </>)
}

export default App;