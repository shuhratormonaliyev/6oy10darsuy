import {Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Boards from './components/Boards';
import Card from './components/Card';
import LeyoutApp from './components/leyout/LeyoutApp';
import ErrorPage from './components/ErrorPage';
function App() {
  return (
      <LeyoutApp>
        <Routes>
        <Route path='/' element = {<Boards></Boards>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Card" element={<Card />} />
        <Route path= '*' element = {<ErrorPage></ErrorPage>}></Route>
      </Routes>
      </LeyoutApp>
  );
}

export default App;
