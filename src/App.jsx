// src/App.jsx
import React, { useState, useEffect } from 'react';
import Scene from './components/Scene.jsx';
import './App.css';

// --- MOCK TEAMS SDK DATA ---
// In a real app, this data would come from the TeamsJS and Live Share SDKs.
const mockParticipants = [
  { id: 'user1', name: 'Alex', avatarUrl: 'https://models.readyplayer.me/65a582b18ac234234033b00f.glb' },
  { id: 'user2', name: 'Brenda', avatarUrl: 'https://models.readyplayer.me/65a582962e2e3fab5033afa8.glb' },
  { id: 'user3', name: 'Carlos', avatarUrl: 'https://models.readyplayer.me/65a582a88ac234234033afb4.glb' },
  { id: 'user4', name: 'Diana', avatarUrl: 'https://models.readyplayer.me/65a582842e2e3fab5033af9c.glb' },
];
// ----------------------------

function App() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    // Simulate fetching participants when the component mounts
    console.log("Simulating fetching meeting participants...");
    setParticipants(mockParticipants);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>🔥 Campfire Meeting</h1>
        <p>A demo using React Three Fiber and Ready Player Me</p>
      </div>
      <Scene participants={participants} />
    </div>
  );
}

export default App;