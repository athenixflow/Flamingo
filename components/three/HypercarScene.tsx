"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshReflectorMaterial,
  ContactShadows,
  Float,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useDeviceTier } from "@/lib/hooks/useDeviceTier";

export function HypercarScene() {
  const tier = useDeviceTier();
  const high = tier === "high";

  return (
    <Canvas
      shadows={high}
      dpr={[1, high ? 1.75 : 1.25]}
      camera={{ position: [5, 1.6, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 22]} />

      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <spotLight
          position={[6, 8, 4]}
          angle={0.35}
          penumbra={0.85}
          intensity={50}
          color="#ffffff"
          castShadow={high}
        />
        <spotLight
          position={[-7, 4, -4]}
          angle={0.5}
          penumbra={1}
          intensity={20}
          color="#E50982"
        />
        <spotLight
          position={[0, 5, -8]}
          angle={0.5}
          penumbra={1}
          intensity={15}
          color="#8A2EFF"
        />

        <Float floatIntensity={0.4} rotationIntensity={0.2} speed={1.2}>
          <Hypercar />
        </Float>

        <Floor reflective={high} />
        <ContactShadows
          position={[0, -0.49, 0]}
          opacity={0.7}
          scale={14}
          blur={2}
          far={4}
        />

        <CursorOrbit />
        <LightStreaks />

        <Environment preset="warehouse" environmentIntensity={0.45} />

        {high && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.55}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.4}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.2} darkness={0.85} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}

function Hypercar() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.18;
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* main body */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[4.2, 0.55, 1.7]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
        />
      </mesh>

      {/* roof / cabin */}
      <mesh castShadow position={[-0.1, 0.85, 0]}>
        <boxGeometry args={[2.4, 0.55, 1.55]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.08}
          clearcoat={1}
        />
      </mesh>

      {/* windshield strip — glow */}
      <mesh position={[0.7, 0.85, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.6, 0.4, 1.5]} />
        <meshStandardMaterial
          color="#E50982"
          emissive="#E50982"
          emissiveIntensity={1.6}
          metalness={0}
          roughness={0.2}
        />
      </mesh>

      {/* nose taper */}
      <mesh castShadow position={[1.95, 0.35, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[0.7, 0.45, 1.7]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>

      {/* rear taper */}
      <mesh castShadow position={[-1.95, 0.35, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.7, 0.45, 1.7]} />
        <meshPhysicalMaterial
          color="#0a0a0a"
          metalness={1}
          roughness={0.18}
          clearcoat={1}
        />
      </mesh>

      {/* headlight pink stripe */}
      <mesh position={[2.25, 0.4, 0.6]}>
        <boxGeometry args={[0.05, 0.06, 0.4]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>
      <mesh position={[2.25, 0.4, -0.6]}>
        <boxGeometry args={[0.05, 0.06, 0.4]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={3}
        />
      </mesh>

      {/* tail light */}
      <mesh position={[-2.25, 0.5, 0]}>
        <boxGeometry args={[0.05, 0.05, 1.6]} />
        <meshStandardMaterial
          color="#E50982"
          emissive="#E50982"
          emissiveIntensity={3}
        />
      </mesh>

      {/* wheels */}
      {[
        [-1.4, -0.05, 0.85],
        [-1.4, -0.05, -0.85],
        [1.5, -0.05, 0.85],
        [1.5, -0.05, -0.85],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.32, 32]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.4} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.34, 24]} />
            <meshStandardMaterial color="#B8B8B8" metalness={1} roughness={0.2} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.36, 16]} />
            <meshStandardMaterial color="#E50982" emissive="#E50982" emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}

      {/* underglow strip */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[3.5, 0.02, 1.4]} />
        <meshStandardMaterial
          color="#E50982"
          emissive="#E50982"
          emissiveIntensity={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

function Floor({ reflective }: { reflective: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      {reflective ? (
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={45}
          roughness={0.85}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.6}
          mirror={0.4}
        />
      ) : (
        <meshStandardMaterial color="#050505" metalness={0.6} roughness={0.4} />
      )}
    </mesh>
  );
}

function CursorOrbit() {
  const target = useRef({ x: 0, y: 0 });
  useFrame(({ camera, mouse }) => {
    target.current.x += (mouse.x * 0.6 - target.current.x) * 0.04;
    target.current.y += (mouse.y * 0.25 - target.current.y) * 0.04;
    camera.position.x = 5 + target.current.x;
    camera.position.y = 1.6 + target.current.y;
    camera.lookAt(0, 0.4, 0);
  });
  return null;
}

function LightStreaks() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const m = child as THREE.Mesh;
      m.position.x = ((clock.elapsedTime * (0.4 + i * 0.18) + i * 3) % 24) - 12;
    });
  });

  return (
    <group ref={ref} position={[0, 3.5, -4]}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[i * 1.5 - 6, Math.sin(i) * 1.5, -i * 0.5]}>
          <boxGeometry args={[2, 0.02, 0.02]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#E50982" : "#8A2EFF"}
            emissive={i % 2 === 0 ? "#E50982" : "#8A2EFF"}
            emissiveIntensity={2.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
