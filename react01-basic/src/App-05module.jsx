/*
모듈화 한 컴포넌트를 임포트 한다.
경로와 파일명까지만 작성하면 되고
확장자는 별도로 추가하지 않는다.
그리고 export할때 사용했던 이름으로
import해준다.
*/



import FrontComp from './components/_FrontComp';
import BackComp from './components/_BackComp';

function App() {
    return(<>
      <h2>React - Modules</h2>
      <ol>

        <FrontComp onMyEvent1={()=>{
          alert("프론트엔드 클릭됨 (부모전달");
        }}></FrontComp>

        <BackComp onMyEvent2={(msg)=>{
          alert(msg);
        }}></BackComp>
      </ol>
    </>)
  }

export default App