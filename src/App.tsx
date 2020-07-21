import React from 'react';
import './App.css';
import { default as usersData } from './members.json';
import MemberListEditor from './components/MemberListEditor';
import User from "./User";

function compare(a: User, b: User): number{
  const nameA = a.firstName.toUpperCase();
  const nameB = b.firstName.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

function App() {
  return (
    <div className="App">
      <MemberListEditor users={usersData.sort(compare)} />
    </div>
  );
}

export default App;
