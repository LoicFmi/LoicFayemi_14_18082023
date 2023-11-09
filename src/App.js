import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
import Header from './components/Header';
import Home from './pages/Home';
import Create from './pages/Create';

export default function App() {
  return (
    // <Provider store={store}>
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </Router>
    // </Provider>
  );
}
