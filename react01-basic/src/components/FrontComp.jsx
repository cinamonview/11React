export default function FrontComp(props){
      
    return(<>
    {/* 상태변수 mode를 'front'로 변경한다. */}
      <li><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onSetMode('front');
      }}>프론트엔드</a></li> 
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>jQuery</li>
      </ul>
    </>)
  }

