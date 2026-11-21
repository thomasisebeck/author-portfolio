import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

export interface BookCardProps {
  coverUrl?: string;
  title: string;
  author: string;
}

function createPageEdgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#f5f0e6";
  ctx.fillRect(0, 0, 128, 128);

  for (let i = 0; i < 128; i += 2) {
    ctx.fillStyle =
      i % 4 === 0 ? "rgba(180, 170, 155, 0.35)" : "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(0, i, 128, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

const BookMesh: React.FC<{ basePath: string }> = ({ basePath }) => {
  const groupRef = useRef<THREE.Group>(null);
  const cleanPath = basePath.replace(/\/$/, "");

  const [frontTex, spineTex, backTex] = useTexture([
    `${cleanPath}/front.webp`,
    `${cleanPath}/spine.webp`,
    `${cleanPath}/back.webp`,
  ]);

  [frontTex, spineTex, backTex].forEach((tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
  });

  const pageTex = useMemo(() => createPageEdgeTexture(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle floating motion
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.05;

    // Subtle cursor follow tilt (angled slightly to showcase the spine)
    const targetRotX = -state.pointer.y * 0.2;
    const targetRotY = state.pointer.x * 0.35 + 0.28;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.06,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.06,
    );
  });

  // 6x9 trade paperback proportions
  const width = 2.4;
  const height = 3.6;
  const depth = 0.38;

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        {/* 0: Right edge (pages) */}
        <meshStandardMaterial
          attach="material-0"
          map={pageTex}
          roughness={0.95}
          metalness={0}
        />
        {/* 1: Left edge (spine) */}
        <meshStandardMaterial
          attach="material-1"
          map={spineTex}
          roughness={0.82}
          metalness={0}
        />
        {/* 2: Top edge (pages) */}
        <meshStandardMaterial
          attach="material-2"
          map={pageTex}
          roughness={0.95}
          metalness={0}
        />
        {/* 3: Bottom edge (pages) */}
        <meshStandardMaterial
          attach="material-3"
          map={pageTex}
          roughness={0.95}
          metalness={0}
        />
        {/* 4: Front cover */}
        <meshStandardMaterial
          attach="material-4"
          map={frontTex}
          roughness={0.82}
          metalness={0}
        />
        {/* 5: Back cover */}
        <meshStandardMaterial
          attach="material-5"
          map={backTex}
          roughness={0.82}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export const BookCard: React.FC<BookCardProps> = ({
  coverUrl = "/cover",
  title,
  author,
}) => {
  return (
    <div
      aria-label={`3D interactive book cover: ${title} by ${author}`}
      className="h-[460px] w-full cursor-grab active:cursor-grabbing sm:h-[500px]"
    >
      <Canvas camera={{ position: [0, 0, 6.2], fov: 38 }} dpr={[1, 2]}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={0.85} />
        <directionalLight position={[-5, -2, -4]} intensity={0.35} />

        <Environment preset="apartment" environmentIntensity={0.35} />

        <Suspense fallback={null}>
          <BookMesh basePath={coverUrl} />
        </Suspense>

        <ContactShadows
          position={[0, -2.15, 0]}
          opacity={0.32}
          scale={8}
          blur={2.6}
          far={4}
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};
