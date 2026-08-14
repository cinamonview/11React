import { Routes, Route } from 'react-router-dom';



import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import Edit from './components/board/Edit';
import NotFound from './components/common/NotFound';



function App() {
    return (<>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/list' element={<List />}></Route>
        <Route path='/write' element={<Write />} />
        {/* 중첩라우팅으로 게시물의 일련번호가 하위 경로로 추가된다.
        이 값은 useParams() 훅을 통해 읽어올 수 있다.
        view/99와 같은 형태로 요청되면 :idx에 99가 저장되는 형식이다. */}
        <Route path='/view'>
          <Route path=':idx' element={<View />} />
        </Route> 
        {/* view와 동일한 라우팅 처리 방식 */}
        <Route path='/edit/:idx' element={<Edit />} />
        {/* 설정된 URL(요청명)이 아닌 경우에는 not found 404 처리를 한다. */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    
    </>);
  
}

export default App;
