import { useEffect,useState } from "react";

/*
useEffect() :
    함수형 컴포넌트에서 Life cycle(수명주기)를 사용하기 위한
    Hooks로 컴포넌트 내부에서 발생하는 데이터 가져오기,
    구독설정, DOM 조작 등과 같은 작업을 수행한다.
    컴포넌트가 렌더링 된 후 실행할 코드를 정의할때 주로 사용한다.
*/



/*
컴포넌트가 렌더링 되는 것은 해당 함수가 호출되어
내부코드가 실행된다는 의미이다.
함수의 실행에 의해 컴포넌트는 화면상에 렌더링된다.
*/
function MoveBox(props){
    /*
    이 컴포넌트에서 제일 먼저 실행되는 코드.
    즉 렌더링 전에 실행할 코드가 있다면 이 부분에
    작성하면 된다.
    */
    console.log('LifeCycle==>1. 컴포넌트 실행(함수 호출');

    // 상태변수 생성. 프롭스로 전달받은 50으로 초기화
    const[position, setPosition] = useState(props.initPosition);
    // 좌측이동 횟수를 저장하기 위한 상태변수 생성. 1로 초기화
    // (생선님)좌측이동 횟수 표현을 위한 상태변수
    const[leftCount, setLeftCount] = useState(1);
    /*
    박스에 지정할 스타일을 객체로 정의. 
    Left속성을 통해 박스를 이동시킬 것이므로
    position 속성은 relative로 지정한다.
    */
    // 박스의 스타일을 저장하기 위한 상수 생성.
    const boxStyle={
        backgroundColor: 'red',
        position: 'relative',
        textAlign: 'center',
        width: '100px',
        height: '100px',
        margin: '10px',
        lineHeight: '100px',
        left: `${position}px`,
    };
    //최초 left는 50px으로 초기화됨.

    // 박스를 좌/우측으로 이동하기 위한 함수.
    // 상태변수 position의 값을 증감시킨다.
    const moveLeft = () => {
        // 함수 실행시 상태값이 변경되면서 리렌더링됨.
        setPosition(()=> position -20);
        // 좌측이동 상태값을 1 증가.
        setLeftCount(()=> leftCount + 1);
    };

    const moveRight = () => {
        setPosition(()=> position +20);
    };

    /*
    이 컴포넌트가 렌더링 된 후 실행된다.
    첫 실행에서는 마운트만 되고, 
    두번째 실행부터 언마운트, 마운트 순으로 실행된다.
    */
    useEffect(function(){
        console.log('useEffect 실행 ==>3.컴포넌트 마운트');
        return ()=>{
            console.log('useEffect 실행 ==>4.컴포넌트 언마운트');
        }
    // }); // 1. 의존성 배열 생략
    // }, []); // 2. 의존성 배열에 빈 배열 지정
    }, [leftCount]); //3. 의존성 배열에 State 변수 할당.

    /*
    의존성 배열 유무에 따른 실행 설명 
        1. 2개의 버튼을 누를때마다 useEffect()가 재실행 된다.
        2. 최초 실행시에만 useEffect()가 실행되고,
            그 이후에는 재실행 되지 않는다.
        3. leftCount의 상태값이 변경될때만 useEffect가 재실행된다.
            우측 이동 버튼을 누를때에는 실행되지 않는다.
    */


    console.log('return 실행 ==> 2. 렌더링(return 문))');

    /*
    앞에서 useEffect()가 먼저 선언되었지만,
    수명주기에서는 렌더링이 먼저 수행된다.
    즉 화면에 UI가 먼저 표시된 후 
    useEffect()가 실행된다.
    */
    return (
        <div>
            <h4>함수형 컴포넌트의 수명주기</h4>
            {/* <div>로 생성한 빨간색 박스 표시.
            박스 가운데는 leftCount가 삽입되어
            최초 1이 표시된다. */}
            <div style={boxStyle}>{leftCount}</div>
            <input type="button" value="좌측이동" onClick={moveLeft} />
            <input type="button" value="우측이동" onClick={moveRight} />
        </div>
        );
    }
    

    function LifeCycle(){
        return (<>
            <h2>React Hook - useEffect</h2>
            {/* UI 컴포넌트 추가. 프롭스로 정수 50 전달 */}
            <MoveBox initPosition={50} />
        </>);
    }

    export default LifeCycle;