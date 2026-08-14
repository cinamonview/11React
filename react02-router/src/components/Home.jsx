
// 제일 첫번째 화면을 표시하는 컴포넌트이다.

const Home = () => {
    // 최상위 엘리먼트가 2개인 상태이므로 프레그먼트로 랩핑해준다. 즉 감싸준다.
    return (<>
        <h2>React Home</h2>
        <p>
            React Router에 대해 학습합니다.
        </p>
    </>);
}

export default Home;