
const BackComp = ({setMode}) => {
    return(<>
    {/* 프롭스로 전달받은 함수를 통해 상태변수를 'back'으로 변경한다. */}

    <li><a href="/" onClick={(event)=>{
      event.preventDefault();
      setMode('back');
    }}>백엔드</a></li>
    <ul>
      <li>Java</li>
      <li>Oracle</li>
      <li>JSP</li>
      <li>Spring Boot</li>
    </ul>
    </>)
  
  }
  
  export default BackComp;