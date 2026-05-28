"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshReflectorMaterial,
  ContactShadows,
  Float,
  RoundedBox,
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
      camera={{ position: [6.5, 2.2, 7], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 9, 26]} />

      <Suspense fallback={null}>
        {/* Key light — warm, front-upper-right (real automotive commercial light) */}
        <spotLight
          position={[6, 9, 5]}
          angle={0.3}
          penumbra={0.9}
          intensity={70}
          color="#fff0d8"
          castShadow={high}
        />
        {/* Fill light — cool, from the left, low intensity for shadow detail */}
        <spotLight
          position={[-8, 4, 3]}
          angle={0.5}
          penumbra={1}
          intensity={18}
          color="#9fbcff"
        />
        {/* Rim light — the only pink in the scene besides tail lights */}
        <spotLight
          position={[-2, 3, -8]}
          angle={0.45}
          penumbra={1}
          intensity={25}
          color="#E50982"
        />
        <ambientLight intensity={0.08} />

        <Float floatIntensity={0.3} rotationIntensity={0.15} speed={1.1}>
          <Hypercar />
        </Float>

        <Floor reflective={high} />
        <ContactShadows
          position={[0, -0.49, 0]}
          opacity={0.85}
          scale={16}
          blur={2.2}
          far={5}
        />

        <CursorOrbit />
        <LightStreaks />

        <Environment preset="night" environmentIntensity={0.55} />

        {high && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.45}
              luminanceThreshold={0.85}
              luminanceSmoothing={0.35}
              mipmapBlur
            />
            <Vignette eskil={false} offset={0.18} darkness={0.92} />
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
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.15;
  });

  const bodyMat = (
    <meshPhysicalMaterial
      color="#0c0c0d"
      metalness={0.55}
      roughness={0.22}
      clearcoat={1}
      clearcoatRoughness={0.04}
      reflectivity={1}
      envMapIntensity={1.2}
    />
  );

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* Main body — sculpted with RoundedBox for real curves */}
      <RoundedBox
        args={[4.6, 0.55, 1.85]}
        radius={0.14}
        smoothness={4}
        position={[0, 0.32, 0]}
        castShadow
        receiveShadow
      >
        {bodyMat}
      </RoundedBox>

      {/* Lower body sill (rocker panel) — sits just under the door line */}
      <RoundedBox
        args={[4.2, 0.18, 1.95]}
        radius={0.06}
        smoothness={3}
        position={[0, 0.04, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#040404"
          metalness={0.7}
          roughness={0.35}
          clearcoat={0.6}
        />
      </RoundedBox>

      {/* Raked roof / cabin — lower + narrower than body for hypercar silhouette */}
      <RoundedBox
        args={[2.2, 0.42, 1.45]}
        radius={0.18}
        smoothness={4}
        position={[-0.1, 0.78, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#020202"
          metalness={0.9}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </RoundedBox>

      {/* Windshield rake — angled glass plane */}
      <mesh position={[0.9, 0.7, 0]} rotation={[0, 0, -0.32]} castShadow>
        <boxGeometry args={[0.85, 0.35, 1.35]} />
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.2}
          roughness={0.05}
          transmission={0.55}
          thickness={0.5}
          ior={1.45}
          clearcoat={1}
        />
      </mesh>

      {/* Rear glass rake */}
      <mesh position={[-1.05, 0.72, 0]} rotation={[0, 0, 0.32]} castShadow>
        <boxGeometry args={[0.75, 0.32, 1.35]} />
        <meshPhysicalMaterial
          color="#0a0a1a"
          metalness={0.2}
          roughness={0.05}
          transmission={0.55}
          thickness={0.5}
          ior={1.45}
          clearcoat={1}
        />
      </mesh>

      {/* Sculpted nose taper */}
      <RoundedBox
        args={[0.95, 0.42, 1.7]}
        radius={0.1}
        smoothness={4}
        position={[2.05, 0.28, 0]}
        rotation={[0, 0, -0.14]}
        castShadow
      >
        {bodyMat}
      </RoundedBox>

      {/* Sculpted rear haunches */}
      <RoundedBox
        args={[0.9, 0.5, 1.85]}
        radius={0.12}
        smoothness={4}
        position={[-2.1, 0.32, 0]}
        rotation={[0, 0, 0.09]}
        castShadow
      >
        {bodyMat}
      </RoundedBox>

      {/* Signature side-light streak — the cinematic profile line */}
      <mesh position={[0, 0.42, 0.94]}>
        <boxGeometry args={[4.0, 0.018, 0.012]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.6}
        />
      </mesh>
      <mesh position={[0, 0.42, -0.94]}>
        <boxGeometry args={[4.0, 0.018, 0.012]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.6}
        />
      </mesh>

      {/* Headlight LED strip — strong emissive, both sides */}
      <mesh position={[2.42, 0.42, 0.62]}>
        <boxGeometry args={[0.06, 0.045, 0.42]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#fff8e0"
          emissiveIntensity={8}
        />
      </mesh>
      <mesh position={[2.42, 0.42, -0.62]}>
        <boxGeometry args={[0.06, 0.045, 0.42]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#fff8e0"
          emissiveIntensity={8}
        />
      </mesh>

      {/* Tail light bar — the ONLY pink emissive in the car */}
      <mesh position={[-2.5, 0.46, 0]}>
        <boxGeometry args={[0.05, 0.06, 1.7]} />
        <meshStandardMaterial
          color="#E50982"
          emissive="#E50982"
          emissiveIntensity={5}
        />
      </mesh>

      {/* Wheels with chrome torus rim */}
      {(
        [
          [-1.55, -0.05, 0.93],
          [-1.55, -0.05, -0.93],
          [1.6, -0.05, 0.93],
          [1.6, -0.05, -0.93],
        ] as const
      ).map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.46, 0.46, 0.34, 32]} />
            <meshStandardMaterial color="#070707" roughness={0.85} metalness={0.1} />
          </mesh>
          {/* Hub (alloy) */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.29, 0.29, 0.36, 24]} />
            <meshPhysicalMaterial
              color="#cccccc"
              metalness={1}
              roughness={0.15}
              clearcoat={0.8}
            />
          </mesh>
          {/* Chrome outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.43, 0.025, 12, 36]} />
            <meshPhysicalMaterial
              color="#dddddd"
              metalness={1}
              roughness={0.08}
            />
          </mesh>
          {/* Spokes — five thin radial bars */}
          {Array.from({ length: 5 }).map((_, s) => {
            const a = (s / 5) * Math.PI * 2;
            return (
              <mesh
                key={s}
                rotation={[Math.PI / 2, 0, a]}
                position={[0, 0, 0]}
              >
                <boxGeometry args={[0.06, 0.34, 0.5]} />
                <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.18} />
              </mesh>
            );
          })}
          {/* Center cap */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.37, 16]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Floor({ reflective }: { reflective: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[80, 80]} />
      {reflective ? (
        <MeshReflectorMaterial
          blur={[320, 110]}
          resolution={1024}
          mixBlur={1.1}
          mixStrength={55}
          roughness={0.78}
          depthScale={1.3}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#030303"
          metalness={0.65}
          mirror={0.5}
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
    target.current.x += (mouse.x * 0.7 - target.current.x) * 0.035;
    target.current.y += (mouse.y * 0.2 - target.current.y) * 0.035;
    camera.position.x = 6.5 + target.current.x;
    camera.position.y = 2.2 + target.current.y;
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
      m.position.x = ((clock.elapsedTime * (0.35 + i * 0.14) + i * 3) % 26) - 13;
    });
  });

  return (
    <group ref={ref} position={[0, 4, -5]}>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[i * 1.8 - 6, Math.sin(i) * 1.5, -i * 0.5]}>
          <boxGeometry args={[2.4, 0.018, 0.018]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1.4}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}
