import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/navbar';
import Home from './components/home-page/home';
import Authorization from './components/auth-page/authorization';
import Register from './components/register/register';
import Post from './components/post-page/post';
import CreatePost from './components/create-post-page/create-post';
import UserPage from './components/user-page/user-page';
import MyPage from './components/user-page/my-page/my-page';
import EditMyPage from './components/edit-user/edit-user';
import PrivateRoute from './lib/private-route';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/auth/' element={<Authorization />} />
        <Route path='/register/' element={<Register />} />

        <Route path='/*' element={
          <PrivateRoute>
            <Routes>
              <Route path='/post/:pk/' element={<Post />} />
              <Route path='/create/' element={<CreatePost />} />
              <Route path='/user-page/:pk/' element={<UserPage />} />
              <Route path='/my-page/' element={<MyPage />} />
              <Route path='/edit-user/' element={<EditMyPage />} />
            </Routes>
          </PrivateRoute>
        } />

        </Routes>
    </BrowserRouter>
  );
}

export default App;