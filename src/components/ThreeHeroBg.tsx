import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeHeroBg() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0x4f46e5, 1.5); // Purple
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0x06b6d4, 1.2); // Cyan/Blue
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xec4899, 1.0); // Pink/Purple
    light3.position.set(0, 0, 3);
    scene.add(light3);

    // Objects - Liquid Blobs
    // We will create a high-detail sphere and displace its vertices in the animation loop
    const geometry = new THREE.IcosahedronGeometry(2.5, 32); // Radius, Detail
    
    // Custom vertex shader to deform the sphere (or we can deform vertices in JS for simplicity)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.25,
      transmission: 0.9, // Glass-like transparency
      ior: 1.5,
      thickness: 1.0,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const blob = new THREE.Mesh(geometry, material);
    scene.add(blob);

    // Add a couple of smaller floating secondary blobs
    const secondaryGeo = new THREE.IcosahedronGeometry(1, 16);
    const secondaryMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.4,
      transmission: 0.6,
      ior: 1.2,
      clearcoat: 0.5,
    });

    const blob2 = new THREE.Mesh(secondaryGeo, secondaryMat);
    blob2.position.set(4, 2, -2);
    scene.add(blob2);

    const blob3 = new THREE.Mesh(secondaryGeo, secondaryMat.clone());
    blob3.material.color.setHex(0x06b6d4);
    blob3.position.set(-4, -2, -1);
    scene.add(blob3);

    // Keep track of original vertex positions for deformation
    const positionAttribute = geometry.getAttribute("position");
    const originalPositions = positionAttribute.array.slice();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Deform main blob vertices using sine/cosine waves for liquid effect
      const positions = positionAttribute.array;
      for (let i = 0; i < positions.length; i += 3) {
        const vx = originalPositions[i];
        const vy = originalPositions[i + 1];
        const vz = originalPositions[i + 2];

        // Calculate length of vertex from center
        const len = Math.sqrt(vx * vx + vy * vy + vz * vz);
        
        // Complex wave function using space and time
        const wave = 
          Math.sin(vx * 1.2 + time * 1.5) * 0.15 +
          Math.cos(vy * 1.5 + time * 1.2) * 0.15 +
          Math.sin(vz * 1.0 + time * 2.0) * 0.1;

        // Displace vertex along its normal (which is from center out, since it's a sphere at 0,0,0)
        positions[i] = vx + (vx / len) * wave;
        positions[i + 1] = vy + (vy / len) * wave;
        positions[i + 2] = vz + (vz / len) * wave;
      }
      
      // Mark geometry for update
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();

      // Rotate blobs slowly
      blob.rotation.x = time * 0.1;
      blob.rotation.y = time * 0.15;

      blob2.rotation.x = -time * 0.2;
      blob2.position.y = 2 + Math.sin(time * 0.5) * 0.5;
      blob2.position.x = 4 + Math.cos(time * 0.5) * 0.3;

      blob3.rotation.y = time * 0.3;
      blob3.position.y = -2 + Math.cos(time * 0.7) * 0.4;
      blob3.position.x = -4 + Math.sin(time * 0.7) * 0.3;

      // Slowly move lights to shift reflections
      light1.position.x = 5 + Math.sin(time * 0.5) * 2;
      light1.position.y = 5 + Math.cos(time * 0.5) * 2;

      light3.position.x = Math.sin(time * 1.0) * 3;
      light3.position.y = Math.cos(time * 1.0) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      secondaryGeo.dispose();
      material.dispose();
      secondaryMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-60 mix-blend-screen"
      style={{
        maskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
      }}
    />
  );
}
