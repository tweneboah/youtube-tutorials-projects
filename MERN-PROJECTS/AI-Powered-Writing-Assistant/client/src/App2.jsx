// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PrivyProvider } from '@privy-io/react-auth';
import Login from './Login';
import Editor from './Editor';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Provider store={store}>
     
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/editor" element={<Editor />} />
            </Route>
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </Router>
     
    </Provider>
  );
};

export default App;