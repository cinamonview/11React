import TopNavi from './components/TopNavi';
import FireConnect from './firestores/FireConnect';
import FireCreate from './firestores/FireCreate';
import FireRead from './firestores/FireRead';
import FireUpdate from './firestores/FireUpdate';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (<>
    <TopNavi />
    <Routes>
        <Route path='/' element={<FireConnect />}></Route>
        <Route path='/connect' element={<FireConnect />}></Route>
        <Route path='/create' element={<FireCreate />}></Route>
        <Route path='/read' element={<FireRead />}></Route>
        {/* 경로 변수로 전달되는 파라미터 (수정할 id)를 이용해서 라우팅 처리) */}
        <Route path='/update/:userid' element={<FireUpdate />}></Route>
    </Routes>
  </>)
}

export default App
