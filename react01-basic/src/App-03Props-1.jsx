
/*
Props(프롭스) :
    React에서 상태를 저장하기 위한 값으로 
    부모 컴포넌트가 자식 컴포넌트로 전달하는 읽기 전용 데이터를 말한다.
    전달시에는 HTML의 속성처럼 작성한다.

    형식]
    <컴포넌트 props속성명 ={전달할 값} />
    이와 같이 전달하면 자식 컴포넌트에서는 'props.속성명'과 같이 
    사용할 수 있다.
*/

/*
컴포넌트로 전달되는 모든 프롭스를 매개변수 props를 통해
한꺼번에 받는다.
이렇게 받은 값은 객체를 사용하듯 'props.프롭스명'으로 작성한다.
*/
function FrontComp(props) {
  //props.frTitle = "프롭스 변경하기 Error";
  //빈 배열 생성
  const liRows =[];
  //propData1은 배열이므로 반복문을 통해 반복할 수 있다.
  for(let i=0; i<props.propData1.length; i++) {
    /*
    반복하면서 빈 배열에 <li> 태그를 순차적으로 추가한다.
    push() 함수는 배열의 끝에 요소를 추가하는 기능을 가지고 있따.
    이런 문법이 가능한 이유는 JSX를 사용하고 있기 때문이다.
    */
    liRows.push(
      <li key={i}>{props.propData1[i]}</li>
    );
  }

  /*
  앞에서 <li> 태그가 추가된 배열 변수를 UI에 삽입한다.
  return 내부에 있는 내용은 화면에 렌더링 된다.
  */
  return (<>
    <li>{props.frTitle}</li>
    <ul>
      {liRows}
    </ul>
  </>)
}
/*
React 에서는 게시판의 목록과 같이 반복적으로 출력되는 요소에
Unique한 Key라는 이름의 prop을 추가하도록 권고하고 있다.
따라서 위와같이 배열의 인덱스나 중복되지 않는 일련번호등을
부여해야 한다.
그렇지 않으면 Warning 메시지가 출력된다 (발생하게 된다.)
*/

/*
전달되는 인수를 매개변수에 바로 구조분해하여 
필요한 프롭스만 직접 추출하는 방식을 사용한다.
이 경우 프롭스명을 자식 컴포넌트에서 그대로 사용할 수 있다.
단 전달되는 갯수만큼 매개변수를 추가해야한다.
*/
const BackComp = ({propData2, baTitle}) => {
  const liRows =[];
  let keyCnt=0;
  for(let row of propData2) {
    liRows.push(
      <li key={keyCnt++}>{row}</li>
    );
  }
  return (<>
    
    <li>{baTitle}</li>
    <ul>
      {liRows}
    </ul>
  </>)
}

function App(){
  // props로 전달하기 위한 배열 상수 선언 (데이터로 사용)
  const frontData = ["HTML5", "CSS3", "JavaScript", "jQuery","React추가"];
  const backData = ["Java", "Oracle", "JSP", "Spring Boot", "Nextjs추가"];
  return (<>
  <ol>
    {/* 컴포넌트를 삽입할때는 속성명을 작성하고 전달할 값을 중괄호로 감싸서 작성한다. */}
    {/* 배열 데이터를 자식 컴포넌트로 props를 통해 전달한다.
    props는 HTML의 속성과 속성값을 명시하듯 작성하면 된다.
    변수의 경우 중괄호를 사용하고, 문자열인 경우 "을 사용하면 된다. */}
    <FrontComp propData1={frontData} frTitle="프론트엔드 언어"></FrontComp>
    <BackComp propData2={backData} baTitle="백엔드 언어" />

  </ol>
  </>)
}

export default App
