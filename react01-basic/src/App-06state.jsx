/*
useState() :
    리엑트에서 상태값을 가지는 state의 값을 변경하거나
    초깃값을 부여할때 사용하는 React Hook(훅)이다.
    이 함수의 반환값은 배열인데,
    0번 요소는 state의 초깃값을 저장하기 위한 변수이고
    1번 요소는 이 값을 변경할 수 있는 함수로 사용한다.
    구조 분해 할당을 이용해서 좌측항의 배열로 각각 변수와 함수를 
    할당하게 된다.
*/

import FrontComp from './components/FrontComp';
import BackComp from './components/BackComp';
import { useState } from 'react';

function App() {
    /*
    컴포넌트의 상태 관리를 위한 state 변수를 생성해준다.
    변수명은 mode, 초깃값은 both로 설정해준다.
    이 값을 변경하기 위한 함수는 setMode()로 정의한다.
    */
    const[mode, setMode] = useState('both');
    /*
    내부 함수를 정의해준다.
    매개변수로 전달된 값을 통해 
    상태변수를 변경하기 위한 setMode()함수를 호출한다.
    */
    const handleSetMode = (mode) => {
        setMode(mode);
    };

    // ===는 동일한지 확인하고 타입까지 동일해야 true를 반환한다.
    // 컴포넌트 저장을 위한 변수 선언
    let contents = '';
    // 상태변수 mode의 값에 따라 contents에는 서로 다른 컴포넌트를 할당
    if(mode==='front'){
        //'front'일때는 FrontComp 컴포넌트를 변수에 할당
        contents=<>
        {/* 자식 컴포넌트로 mode 변경을 위한 함수를 프롭스로 전달한다.
        자식에서 이 함수를 호출할떄 인수를 전달하면 여기에서
        state가 변경되면서 리렌더링 된다. */}
        <FrontComp onSetMode={(mode)=>{
            setMode(mode);
        }}></FrontComp>
    </>
    }else if(mode==='back'){
        // 프롭스를 통해 상태변경을 위한 setMode() 를 그대로 전달한다.
        contents = <>
        <BackComp setMode={setMode}/>
        </>
    }else{
        //mode가 'both'일때는 2개의 컴포넌트를 한꺼번에 렌더링 한다.
        contents = <>
        <FrontComp onSetMode={(mode)=>{
            handleSetMode(mode);
            }}></FrontComp>

        <BackComp setMode={handleSetMode}/>
        </>
    }
    return(<>
    {/* 타이틀의 링크는 상태변수의 값을 'both'로 변경한다. */}
    <h2><a href="/" onClick={(event)=>{
        event.preventDefault();
        setMode('both');
    }}>React - State</a></h2>
    <ol>
        {/* 컴포넌트를 저장한 변수가 여기에 삽입된다. */}
        {contents}
    </ol>
    </>)
}

export default App;