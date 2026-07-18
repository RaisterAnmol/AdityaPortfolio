import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function CyberLaptopMesh() {
  const meshRef = useRef(null);

  // Animate rotation slowly on frame update and adjust towards mouse coordinates
  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x * 0.4 + Math.PI / 6, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y * 0.3 + 0.1, 0.05);
  });

  return (
    <group ref={meshRef}>
      {/* 1. Base / Keyboard section */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.2, 0.12, 2.2]} />
        <meshPhysicalMaterial 
          color="#1e1e2f" 
          roughness={0.2} 
          metalness={0.9} 
          clearcoat={0.5} 
        />
      </mesh>
      
      {/* Keyboard trackpad/accents */}
      <mesh position={[0, -0.53, 0.4]}>
        <boxGeometry args={[0.8, 0.02, 0.5]} />
        <meshBasicMaterial color="#6366F1" opacity={0.4} transparent />
      </mesh>

      {/* 2. Screen section */}
      <mesh position={[0, 0.7, -1.05]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[3.2, 2.0, 0.08]} />
        <meshPhysicalMaterial 
          color="#0f0f15" 
          roughness={0.3} 
          metalness={0.9} 
        />
      </mesh>

      {/* Screen Display Face (Glow / Glassmorphism panel) */}
      <mesh position={[0, 0.7, -0.99]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[3.0, 1.8, 0.02]} />
        <meshPhysicalMaterial 
          color="#00FF99"
          emissive="#00FF99"
          emissiveIntensity={0.2}
          transmission={0.6}
          opacity={0.7}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Futuristic floating wireframe surrounding the laptop */}
      <mesh position={[0, 0.2, 0]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[3.8, 2.4, 2.6]} />
        <meshBasicMaterial 
          color="#6366F1" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Center Holographic Core Ring */}
      <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.8, 0.06, 16, 100]} />
        <meshPhysicalMaterial 
          color="#00FF99"
          emissive="#00FF99"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function FloatingLaptop3D() {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-screen">
      <Canvas 
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 2]} intensity={1.0} color="#6366F1" />
        <directionalLight position={[5, -5, -2]} intensity={0.8} color="#00FF99" />
        
        {/* Float Animation Wrapper */}
        <Float 
          speed={2.2} 
          rotationIntensity={0.5} 
          floatIntensity={1.2}
        >
          <CyberLaptopMesh />
        </Float>

        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
