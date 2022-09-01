import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from 'store/store';
import Main from 'pages/Main';
import BookmarkPage from 'pages/BookmarkPage';
import Page404 from 'pages/404';
import Page500 from 'pages/500';
import GlobalStyle from 'styles/global';

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
            <Route path="/500" element={<Page500 />} />
            <Route path="/error" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
