// src/components/Scene.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Avatar from './Avatar.jsx';
import Campfire from './Campfire.jsx';

const Scene = ({ participants }) => {
  // Calculate positions for avatars in a circle
  const getAvatarPosition = (index, total) => {
    const angle = (index / total) * 2 * Math.PI;
    const radius = 2.5; // How far from the center
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    return [x, 0, z];
  };

  return (
    <Canvas camera={{ position: [0, 2.5, 6], fov: 60 }}>
      {/* --- Lighting & Environment --- */}
      <ambientLight intensity={0.2} />
      <Stars />
      <OrbitControls />

      {/* --- Scene Content --- */}
      <Suspense fallback={null}>
        <Campfire position={[0, -0.1, 0]} />
        {participants.map((p, index) => (
          <Avatar
            key={p.id}
            url={p.avatarUrl}
            name={p.name}
            position={getAvatarPosition(index, participants.length)}
          />
        ))}
      </Suspense>
    </Canvas>
  );
};

export default Scene;