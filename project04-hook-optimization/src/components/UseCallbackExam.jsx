import { useEffect, useState, useCallback } from "react"


/*
<div> 태그로 만든 상자 컴포넌트
박스 스타일을 표현한 함수와 숫자를 프롭스로 전달받고 있다.
*/

const DivBox=({ fnBoxStyle, numberVar}) => {
    // 상태변수. 초기값은 빈 객체이다.
    const [myStyle, setMyStyle] = useState({});
    //1차 렌더링 후 실행
    useEffect(() => {
        console.log('박스 스톼일 변경');
        // fnBoxStyle() 함수의 반환값을 통해 상태변수를 변경하고 리렌더링
        setMyStyle(fnBoxStyle());
    },
    [fnBoxStyle]);
    /*
    의존성 배열로 fnBoxStyle 함수를 지정한다. 
    즉 함수가 변경될때마다 useEffect() 함수를 재실행 하겠다는 의미이다.
    */

    // <div> 태그로 간단한 상자 형태의 UI로 구성.
    return <div style={myStyle}>{numberVar}</div>
}

const UseCallbackExam = () => {
    //상태 변수로 박스크기, 박스색깔(컬러), 숫자를 각각 정의한다.
    const [boxSize, setBoxSize] = useState(100);
    const [boxColor, setBoxColor] = useState(0);
    const [number, setNumber] = useState(0);
    // 박스에 적용할 색깔을 배열로 정의했다.
    const colorArr = ['red', 'green', 'blue'];


    //step1
    /*
    스테이트 변경에 의해 리렌더링이 될때마다 이 함수는 새로운
    참조값을 부여받게 된다.
    즉 참조값이 지속적으로 변경되므로 useEffect() 함수가 
    재실행 되는 현상이 발생된다.
    JavaScript에서 함수는 객체로 취급되어 할당된
    참조값을 통해 실행하기 때문이다.
    박스 스타일과 상관없는 숫자 변경 버튼을 눌러도
    useEffect() 함수가 재실행 되므로 애플리케이션의
    성능이 저하될 수 있다.
    */
    // const fnBoxStyle = () => {
    //     return {
    //         backgroundColor: `${colorArr[boxColor]}`,
    //         width: `${boxSize}px`,
    //         height: `${boxSize}px`,
    //         textAlign: 'center',
    //         lineHeight: `${boxSize}px`
    //     };
    // }

    // step2

    /*
    step1의 함수를 메모이제이션 하기 위해 useCallback()의 
    첫번째 인수로 설정한다.
    두번째 인수는 의존성 배열로 박스의 크기와 색깔이 변경될때만
    함수를 재할당 하겠다는 의미이다.
    즉 박스의 스타일과 상관없는 작업이 수행될때는 
    함수를 재할당 하지 않기 때문에 성능의 향상을 기대할 수 있다.
    */
    const fnBoxStyle = useCallback(() => {
        return {
            backgroundColor: `${colorArr[boxColor]}`,
            width: `${boxSize}px`,
            height: `${boxSize}px`,
            textAlign: 'center',
            lineHeight: `${boxSize}px`
        };
    }, [boxColor, boxSize]);

    return (<>
        <h2>useCallback 사용하기</h2>
        <button onClick={() => setBoxSize(boxSize + 10)}>박스 크기 증가</button>
        <button onClick={() => setBoxColor(boxColor + 1)%3}>박스 컬러 변경</button>
        <button onClick={() => setNumber(number + 1)}>숫자 증가</button>
        {/* 앞에서 정의한 함수와 상태변수를 프롭스를 통해 자식 컴포넌트로 전달한다. */}
        <DivBox fnBoxStyle={fnBoxStyle} numberVar={number} />
          
    </>);

}

export default UseCallbackExam;
    