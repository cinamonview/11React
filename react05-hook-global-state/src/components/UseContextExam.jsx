import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemedBox from '../contexts/ThemedBox';
import { ThemeProvider } from '../contexts/ThemeContext';


// 테마 변경을 위한 버튼 컴포넌트   
const ThemeToggleButton = () => {
    // useContext 훅을 이용해서 테마 변경을 위한 toggleTheme 함수를 가져온다.
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme}>테마 전환</button>
    );
};

const UseContextExam = () => {
    return (<>
        <h2>useContext 사용하기</h2>
        {/* 프로바이더 컴포넌트로 데이터를 공유할 자식 컴포넌트를
        감싸준다.
        children은 바로 2개의 자식 컴포넌트를 가리키게 된다. */}
        <ThemeProvider>
            <ThemeToggleButton />
            <ThemedBox />
        </ThemeProvider>

    </>);
}

export default UseContextExam;
