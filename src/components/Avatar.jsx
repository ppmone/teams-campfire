// src/components/Avatar.js
import React, { useRef } from 'react';
import { useGLTF, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Avatar = ({ url, name, position }) => {
  const { scene } = useGLTF(url);
  const avatarRef = useRef();

  // Simple idle animation
  useFrame((state, delta) => {
    if (avatarRef.current) {
      avatarRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  // Position the avatar and make it face the center (the fire)
  const lookAtTarget = [0, 0, 0];
  scene.rotation.y = Math.atan2(
    position[0] - lookAtTarget[0],
    position[2] - lookAtTarget[2]
  );

  return (
    <group position={position} ref={avatarRef}>
      {/* The 3D model */}
      <primitive object={scene} scale={1} position={[0, -0.85, 0]} />
      
      {/* The name tag */}
      <Text
        position={[0, 1.1, 0]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
};

// Preload the models for faster loading
useGLTF.preload('https://models.readyplayer.me/65a582b18ac234234033b00f.glb');
useGLTF.preload('https://models.readyplayer.me/65a582962e2e3fab5033afa8.glb');
useGLTF.preload('https://models.readyplayer.me/65a582a88ac234234033afb4.glb');
useGLTF.preload('https://models.readyplayer.me/65a582842e2e3fab5033af9c.glb');

export default Avatar;