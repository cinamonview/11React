import TopNavi from './components/TopNavi';
import { Routes, Route } from 'react-router-dom';
import UseReducerExam from './components/UseReducerExam';
import UseContextExam from './components/UseContextExam';

function App() {
  return (
    <>
      <TopNavi />
      <Routes>
        <Route path='/' element={<UseReducerExam />}></Route>
        <Route path="/use-reducer" element={<UseReducerExam />} />
        <Route path="/use-context" element={<UseContextExam />} />
      </Routes>
    </>
  );
}

export default App;
