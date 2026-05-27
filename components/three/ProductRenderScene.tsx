"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";

interface ProductRenderSceneProps {
  color: string;
}

export function ProductRenderScene({ color }: ProductRenderSceneProps) {
  const tier = useDeviceTier();
  const high = tier === "high";

  return (
    <Canvas
      dpr={[1, high ? 2 : 1.25]}
      camera={{ position: [0, 0.8, 4.2], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 4, 12]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <spotLight
          position={[3, 5, 3]}
          angle={0.4}
          penumbra={1}
          intensity={40}
          color="#ffffff"
        />
        <spotLight
          position={[-3, 2, -3]}
          angle={0.5}
          penumbra={1}
          intensity={25}
          color={color}
        />

        <Bottle color={color} />

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.6}
          scale={6}
          blur={2.4}
        />

        <Environment preset="studio" environmentIntensity={0.5} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.6}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 1.6}
        />

        {high && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.65}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}

function Bottle({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <group ref={group}>
      {/* cap */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.32, 0.4, 32]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.25}
          clearcoat={0.6}
        />
      </mesh>

      {/* neck */}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.24, 0.28, 0.2, 24]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 2, 64]} />
        <meshPhysicalMaterial
          color="#070707"
          metalness={0.4}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* label band */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.605, 0.605, 1.1, 64, 1, true]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          metalness={0.1}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* label hairlines */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.61, 0.61, 0.01, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.61, 0.61, 0.01, 64]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
      </mesh>

      {/* base */}
      <mesh position={[0, -1.05, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.55, 0.12, 32]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}
