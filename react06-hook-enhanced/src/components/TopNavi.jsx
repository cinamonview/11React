import { NavLink } from 'react-router-dom';


const TopNavi = () => {
    return (
        <nav>
            <NavLink to="/use-optimistic">useOptimistic</NavLink>
            <NavLink to="/use-action-state">useActionState</NavLink>
            <NavLink to="/use-form-status">useFormStatus</NavLink>
        </nav>
    );
};

export default TopNavi;