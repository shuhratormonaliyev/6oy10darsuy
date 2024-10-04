import {Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Boards from './components/Boards';
import CreateBoard from './components/CreateBoard';
import Home from './components/Home';

function App() {
  return (
      <Routes>
        <Route path='/' element = {<Home></Home>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/create-board" element={<CreateBoard />} />
      </Routes>
  );
}

export default App;
