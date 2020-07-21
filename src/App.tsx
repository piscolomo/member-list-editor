import React from 'react';
import './App.css';
import { default as usersData } from './members.json';
import MemberListEditor from './components/MemberListEditor';

function App() {
  return (
    <div className="App">
      <MemberListEditor users={usersData} />
    </div>
  );
}

export default App;
