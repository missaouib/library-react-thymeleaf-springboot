
import HeaderComponent from './components/HeaderComponent';
import {Routes, Route} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import * as ReactBootStrap from 'react-bootstrap';
import BookHome from './components/books/BookHome';
import AddBook from './components/books/AddBook';
import BookDetail from './components/books/BookDetail';
import SearchBook from './components/books/SearchBook';
import FooterComponent from './components/FooterComponent';

import PublisherHome from './components/publishers/PublisherHome';
import AddPublisher from './components/publishers/AddPublisher';

import CategoryHome from './components/categories/CategoryHome';
import AddCategory from './components/categories/AddCategory';

import AuthorHome from './components/authors/AuthorHome';
import AddAuthor from './components/authors/AddAuthor';
import NotFound from './components/NotFound';
import LoginComponent from './components/user/LoginComponent';
import RegisterComponent from './components/user/RegisterComponent';

import UserProfile from './components/user/UserProfile';
import AddUser from './components/user/AddUser';
import AuthVerify from './services/auth/AuthVerify';

import UserHome from './components/user/UserHome';
import Dashboard from './components/admin/Dashboard';

function App() {
  return (
    <div>
      <HeaderComponent />
        <ReactBootStrap.Container>
          <Routes>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path={"/"} element={<HomeComponent/>}></Route>
              <Route path={"/home"} element={<HomeComponent/>}></Route>
              <Route path="/all/books" element={<BookHome />}></Route>
              <Route path="/login" element={<LoginComponent />}></Route>
              <Route path="/register" element={<RegisterComponent />}></Route>
              <Route path="/profile/:id" element={<UserProfile />}></Route>
              <Route path="/user/create/:id" element={<AddUser />}></Route>
              <Route path="/all/users" element={<UserHome />}></Route>
              <Route path="/search/books" element={<SearchBook />}></Route>
              <Route path="/create-book/:id" element={<AddBook />}></Route>
              <Route path="/books/:id" element={<BookDetail />}></Route>
              <Route path="/all/publishers" element={<PublisherHome />}></Route>
              <Route path="/create-publisher/:id" element={<AddPublisher />}></Route>
              <Route path="/all/categories" element={<CategoryHome />}></Route>
              <Route path="/create-category/:id" element={<AddCategory />}></Route>
              <Route path="/all/authors" element={<AuthorHome />}></Route>
              <Route path="/create-author/:id" element={<AddAuthor />}></Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
        </ReactBootStrap.Container>
      <FooterComponent />
      <AuthVerify />
    </div>
  );
}

export default App;
