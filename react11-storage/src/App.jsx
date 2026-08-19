import { Routes, Route } from 'react-router-dom';
import TopNavi from './components/TopNavi';
import RefUpload from './storages/FileUpload';
import FileLists from './storages/FileLists';

function App() {
  return (<>
    <TopNavi />
    <Routes>
      <Route path='/' element={<RefUpload />}></Route>
      <Route path='/upload' element={<RefUpload />}></Route>
      {/* 파일 목록을 렌더링하기 위한 라우팅 처리 부분  */}
      <Route path='/filelists'>
      {/* 경로형식의 파라미터가 없는 경우에는
      최상위 root경로의 파일 목록을 출력하고, 파라미터가 있는 경우
      해당 경로 하위의 목록을 출력한다.
      즉 파라미터 유무에 상관없이 FileLists 컴포넌트를 렌더링하도록 처리한다. */}
        <Route index element={<FileLists />}></Route>
        <Route path=":path" element={<FileLists />}></Route>
      </Route>
    </Routes>
  </>)
}

export default App
