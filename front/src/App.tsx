import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from 'pages/Main';
import Page404 from 'pages/404';
import GlobalStyle from 'styles/global';
import { store } from 'store/store';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:search" element={<Main />} />
            <Route path="/error" element={<Page404 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
