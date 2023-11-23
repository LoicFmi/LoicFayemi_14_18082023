import React from 'react';
import Table from '../components/Table';

export default function Home() {
  return (
    <div className="employees-list">
      <h2 className="title">Current Employee</h2>
      <Table />
    </div>
  );
}
