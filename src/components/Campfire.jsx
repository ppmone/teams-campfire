// src/components/Campfire.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Campfire = (props) => {
  const lightRef = useRef();

  // Make the fire light flicker
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 5) * 0.5;
    }
  });

  return (
    <group {...props}>
      {/* The flame */}
      <mesh>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial emissive="orange" emissiveIntensity={2} color="orange" />
      </mesh>
      {/* The logs */}
      <mesh position={[0, -0.4, 0.3]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshStandardMaterial color="#6F4E37" />
      </mesh>
      <mesh position={[0.3, -0.4, 0]} rotation={[Math.PI / 2, Math.PI / 3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 8]} />
        <meshStandardMaterial color="#6F4E37" />
      </mesh>
      {/* The light source */}
      <pointLight ref={lightRef} color="orange" distance={10} intensity={3} position={[0, 0.5, 0]} />
    </group>
  );
};

export default Campfire;