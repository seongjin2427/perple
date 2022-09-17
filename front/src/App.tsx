import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'store/store';
import GlobalStyle from 'styles/global';
import Main from 'pages/Main';
import BookmarkPage from 'pages/BookmarkPage';
import MyPage from 'pages/MyPage';
import Page404 from 'pages/404';
import MyProfile from 'components/MyProfile';
import OpenPlayPage from 'pages/OpenPlayPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/search/:searchWord" element={<Main />} />
            <Route path="/my" element={<MyPage />}>
              <Route path="/my" element={<MyProfile />} />
              <Route path="/my/play" element={<OpenPlayPage />} />
            </Route>
            <Route path="/error" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
