import React from 'react';
import logo from '../assets/img/logo.jpg';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  return (
    <header>
      <img className="logo" src={logo} alt="Wealth Health Logo" />
      <h1 className="title">HRNet</h1>
      <nav className="nav">
        <Link
          className={location.pathname === '/Create' ? 'inactive' : ''}
          to="/Create"
        >
          Create employee
        </Link>
        <Link className={location.pathname === '/' ? 'inactive' : ''} to="/">
          Current employees
        </Link>
      </nav>
    </header>
  );
}
