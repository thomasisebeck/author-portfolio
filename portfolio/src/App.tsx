import React, { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { BookOpen, ArrowUpRight, Mail } from "lucide-react";
import * as THREE from "three";

interface BookCardProps {
  coverUrl?: string;
  title: string;
  author: string;
}

interface Story {
  title: string;
  year: string;
  description: string;
  link: string;
}

const SHORT_WORKS: Story[] = [
  {
    title: "Cartography",
    year: "2026",
    description:
      "Short fiction exploring memory, distance, and the quiet maps we draw between people.",
    link: "#cartography",
  },
  {
    title: "Apathy",
    year: "2026",
    description: "A meditation on stillness and modern detachment.",
    link: "#apathy",
  },
  {
    title: "The Shallows",
    year: "2020",
    description:
      "Early flash fiction examining what lingers just beneath the surface.",
    link: "#the-shallows",
  },
];

// Procedural paper page-edge texture for top, bottom, and right sides
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
        {/* 1: Left edge (spine) - Matte finish */}
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
        {/* 4: Front cover - Matte paperback finish */}
        <meshStandardMaterial
          attach="material-4"
          map={frontTex}
          roughness={0.82}
          metalness={0}
        />
        {/* 5: Back cover - Matte paperback finish */}
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

const BookCard: React.FC<BookCardProps> = ({
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
        {/* Softer ambient fill + lower directional key light to prevent glare */}
        <ambientLight intensity={0.95} />
        <directionalLight position={[5, 8, 5]} intensity={0.85} />
        <directionalLight position={[-5, -2, -4]} intensity={0.35} />

        {/* Subtle environment reflections so paper looks matte, not laminated */}
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

export function App() {
  return (
    <div className="min-h-screen bg-[#fbf9f5] text-stone-900 antialiased selection:bg-amber-200/60">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        {/* Minimal Header */}
        <header className="flex items-center justify-between border-b border-stone-200/80 py-8">
          <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
            Thomas Isebeck
          </span>
          <nav className="flex gap-7 text-sm font-medium text-stone-600">
            <a href="#novel" className="transition-colors hover:text-stone-950">
              Novel
            </a>
            <a
              href="#stories"
              className="transition-colors hover:text-stone-950"
            >
              Stories
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-stone-950"
            >
              Contact
            </a>
          </nav>
        </header>

        <main>
          {/* Hero Section: Blurb + 3D Interactive Book */}
          <section
            id="novel"
            className="grid grid-cols-1 items-center gap-12 py-14 md:grid-cols-12 md:gap-10 md:py-20"
          >
            {/* Left Column: Blurb & Actions */}
            <div className="order-2 text-center md:order-1 md:col-span-7 md:text-left">
              <span className="mb-3 inline-block text-xs font-semibold tracking-[0.14em] text-amber-700 uppercase">
                Debut Novel
              </span>
              <h1 className="mb-6 font-serif text-4xl leading-[1.12] font-bold tracking-tight text-stone-900 sm:text-5xl">
                What’s Right With You?
              </h1>
              <p className="mx-auto mb-5 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg md:mx-0">
                Replace this with your official back-cover blurb. Set the
                central tension, introduce your protagonists, and leave the
                reader with the core question that drives the story forward.
              </p>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg md:mx-0">
                Whether read late at night or in a quiet afternoon corner, this
                novel asks what happens when the quiet truths we avoid finally
                demand an answer.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <a
                  href="#buy"
                  className="inline-flex items-center gap-2 rounded-md bg-stone-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-amber-700"
                >
                  Get the Book <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href="#excerpt"
                  className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-800 transition-colors hover:border-stone-900 hover:text-stone-950"
                >
                  <BookOpen className="h-4 w-4" /> Read Chapter One
                </a>
              </div>
            </div>

            {/* Right Column: 3D Interactive Book */}
            <div className="order-1 flex flex-col items-center md:order-2 md:col-span-5">
              <BookCard
                coverUrl="/cover"
                title="What's Right With You?"
                author="Thomas Isebeck"
              />
              <span className="mt-1 text-xs tracking-wide text-stone-400">
                Drag to rotate 360°
              </span>
            </div>
          </section>

          {/* Selected Writing / Short Stories */}
          <section
            id="stories"
            className="border-t border-stone-200/80 py-16 sm:py-20"
          >
            <div className="mb-10">
              <h2 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                Selected Stories &amp; Essays
              </h2>
              <p className="mt-1.5 text-sm text-stone-600 sm:text-base">
                Short fiction and standalone pieces, free to read.
              </p>
            </div>

            <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200/80">
              {SHORT_WORKS.map((story) => (
                <a
                  key={story.title}
                  href={story.link}
                  className="group grid grid-cols-1 items-center gap-2 px-3 py-6 transition-colors hover:bg-stone-200/40 md:grid-cols-12 md:gap-6"
                >
                  <div className="md:col-span-4">
                    <span className="block text-xs font-semibold tracking-wider text-amber-700">
                      {story.year}
                    </span>
                    <h3 className="mt-0.5 font-serif text-xl font-semibold text-stone-900 group-hover:text-amber-800">
                      {story.title}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-stone-600 md:col-span-6 sm:text-base">
                    {story.description}
                  </p>

                  <div className="mt-2 flex items-center gap-1 text-sm font-medium text-stone-900 md:col-span-2 md:mt-0 md:justify-end">
                    <span>Read</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          id="contact"
          className="flex flex-col items-center justify-between gap-4 border-t border-stone-200/80 py-10 text-sm text-stone-500 sm:flex-row"
        >
          <p>© {new Date().getFullYear()} Thomas Isebeck</p>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 font-medium text-stone-800 transition-colors hover:text-amber-700"
          >
            <Mail className="h-4 w-4" /> Get in touch
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
