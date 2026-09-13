import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

export function ThreeHeroBg() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Refs to allow smooth theme updates without rebuilding the Three.js scene
  const materialRef = useRef<THREE.MeshPhongMaterial | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const pointLight1Ref = useRef<THREE.PointLight | null>(null);
  const pointLight2Ref = useRef<THREE.PointLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  
  const { theme } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Use container dimensions with window size fallback to avoid 0x0 canvas sizes on mount
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Initialize Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 25;

    // 2. Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Explicitly style the canvas element to fill the container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    
    container.appendChild(renderer.domElement);

    // 3. Generate Low-Poly Geometry
    // We create a plane large enough to cover the screen plus tilt/parallax margin
    const geometry = new THREE.PlaneGeometry(105, 65, 22, 14);
    const positionAttribute = geometry.attributes.position;
    const vertexCount = positionAttribute.count;

    // Save initial coordinates for animation offsets
    const initialZ = new Float32Array(vertexCount);
    for (let i = 0; i < vertexCount; i++) {
      // Displace Z to create a low-poly terrain/mountainous look
      const zOffset = (Math.random() - 0.5) * 5.0;
      positionAttribute.setZ(i, zOffset);
      initialZ[i] = zOffset;
    }
    geometry.computeVertexNormals();

    // 4. Create Flat-Shaded Material
    const material = new THREE.MeshPhongMaterial({
      color: theme === "dark" ? 0x0c152b : 0xe2e8f0, // Rich navy-slate base or light slate
      specular: theme === "dark" ? 0x224488 : 0xffffff,
      shininess: theme === "dark" ? 45 : 25,
      flatShading: true,
      transparent: false,
    });
    materialRef.current = material;

    // 5. Create Mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -5; // Recess back slightly
    scene.add(mesh);

    // 6. Setup Lights (Ambient + colorful Directional & Point lights with 0 decay)
    const ambientLight = new THREE.AmbientLight(
      theme === "dark" ? 0x0c1122 : 0xf1f5f9,
      theme === "dark" ? 0.9 : 1.4
    );
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    // Directional Light: casting broad cyan highlights
    const dirLight = new THREE.DirectionalLight(
      theme === "dark" ? 0x00f0ff : 0x3b82f6,
      theme === "dark" ? 2.5 : 1.2
    );
    dirLight.position.set(1, 1, 1).normalize();
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Point Light 1: Cyan / Bright Blue (intensity with 0 decay for predictable volume)
    const pointLight1 = new THREE.PointLight(
      theme === "dark" ? 0x00f0ff : 0x3b82f6,
      theme === "dark" ? 10 : 4,
      120,
      0 // zero decay
    );
    pointLight1.position.set(25, 15, 15);
    scene.add(pointLight1);
    pointLight1Ref.current = pointLight1;

    // Point Light 2: Indigo / Purple
    const pointLight2 = new THREE.PointLight(
      theme === "dark" ? 0x7000ff : 0xc084fc,
      theme === "dark" ? 8 : 3,
      120,
      0 // zero decay
    );
    pointLight2.position.set(-25, -15, 15);
    scene.add(pointLight2);
    pointLight2Ref.current = pointLight2;

    // 7. Interactive Mouse Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Animation and Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth interpolation (lerping) for parallax movement
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Apply subtle tilt to the low-poly mesh based on mouse position
      mesh.rotation.x = targetY * 0.08;
      mesh.rotation.y = targetX * 0.12;

      // Shift lighting positions slightly based on cursor to animate highlights
      pointLight1.position.x = 25 + targetX * 15;
      pointLight1.position.y = 15 + targetY * 10;
      
      pointLight2.position.x = -25 - targetX * 15;
      pointLight2.position.y = -15 - targetY * 10;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 10. Clean up and resource disposal on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Three.js materials and lights dynamically when the app theme toggles
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.setHex(theme === "dark" ? 0x0c152b : 0xe2e8f0);
      materialRef.current.specular.setHex(theme === "dark" ? 0x224488 : 0xffffff);
      materialRef.current.shininess = theme === "dark" ? 45 : 25;
      materialRef.current.needsUpdate = true;
    }

    if (ambientLightRef.current) {
      ambientLightRef.current.color.setHex(theme === "dark" ? 0x0c1122 : 0xf1f5f9);
      ambientLightRef.current.intensity = theme === "dark" ? 0.9 : 1.4;
    }

    if (dirLightRef.current) {
      dirLightRef.current.color.setHex(theme === "dark" ? 0x00f0ff : 0x3b82f6);
      dirLightRef.current.intensity = theme === "dark" ? 2.5 : 1.2;
    }

    if (pointLight1Ref.current) {
      pointLight1Ref.current.color.setHex(theme === "dark" ? 0x00f0ff : 0x3b82f6);
      pointLight1Ref.current.intensity = theme === "dark" ? 10 : 4;
    }

    if (pointLight2Ref.current) {
      pointLight2Ref.current.color.setHex(theme === "dark" ? 0x7000ff : 0xc084fc);
      pointLight2Ref.current.intensity = theme === "dark" ? 8 : 3;
    }
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-90 dark:opacity-85 transition-opacity duration-500"
      style={{
        maskImage: "radial-gradient(circle at center, black 65%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 65%, transparent 100%)",
      }}
    />
  );
}
