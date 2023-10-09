// import './style/app.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Home from './pages/Home';

export default function App() {
  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    // </Provider>
  );
}
