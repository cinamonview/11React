import { NavLink } from 'react-router-dom';

const TopNavi = () => {
    return (
        <nav>
            <NavLink to="/crud">CRUD</NavLink>&nbsp;&nbsp;
            <NavLink to="/listener">Listener</NavLink>&nbsp;&nbsp;
            <NavLink to="/chat">Chatting</NavLink>&nbsp;&nbsp;
        </nav>
    );
}

export default TopNavi;