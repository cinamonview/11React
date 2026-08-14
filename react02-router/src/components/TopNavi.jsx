import { Link, NavLink } from 'react-router-dom';


/*
NavLink, Link 컴포넌트는 <a> 태그와 같이 하이퍼 링크를 제공한다.
단 preventDefault() 가 적용된 형태로 화면의 깜빡임 없이
페이지 이동을 할 수 있다.
*/
// 네비게이션 바를 표시하는 컴포넌트이다.

const TopNavi = () => {
    return (
        <nav>
            {/* a 태그를 사용하는 경우에는 화면의 깜빡임이 있으므로
            합성 이벤트 객체를 통해 반드시 preventDefault() 메서드를 호출해서
            기본동작을 차단해야 한다. */}
            <a href="/">Home</a> &nbsp;
            {/* NavLink 컴포넌트의 경우
            링크를 클릭하면 엘리먼트에 active 라는 클래스 속성을 자동으로 추가해준다.
            이를 통해 CSS로 스타일을 부여 할 수 있게 해준다. */}
            <NavLink to="/intro">인트로</NavLink>&nbsp;
            <NavLink to="/intro/router">Router 관련 Hooks</NavLink>&nbsp;
            {/* Link 컴포넌트는 NavLink와 동일한 기능을 제공하지만,
            active 라는 클래스 속성을 자동으로 부여하지는 않는다. */}
            <Link to="/xyz">잘못된 URL</Link>&nbsp;
        </nav>
    );
}

export default TopNavi;