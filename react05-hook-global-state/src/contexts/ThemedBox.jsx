import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemedBox =() =>{
    //useContext 훅을 이용해서 상태변수 isDark를 가져온다.
    const {isDark} = useContext(ThemeContext);

    /*
    박스의 스타일을 지정하기 위한 객체 정의.
    isDark의 값에 따라 배경색과 텍스트의
    색깔이 변경되는 구조이다!
    */
    const boxStyle ={
        padding: '20px',
        marginTop : '10px',
        backgroundColor : isDark ? '#333' : '#eee',
        color : isDark ? '#fff' : '#000',
        textAlign : 'center',

    };
    // UI 구성
    return (
        <>
        <div style={boxStyle}>
            현재 테마 : {isDark ? '다크모드': '라이트모드'}
            </div>
            
        </>
    );
};

export default ThemedBox;