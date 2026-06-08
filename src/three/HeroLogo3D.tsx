import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './HeroLogo3D.module.css';

export default function HeroLogo3D() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const w = container.clientWidth;
    const h = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0x1c352d, 0.4);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xf8f0e5, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x8ca399, 0.8, 20);
    pointLight.position.set(-3, 2, 2);
    scene.add(pointLight);

    // Build logo geometry from shapes
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8c0b5,
      roughness: 0.15,
      metalness: 0.85,
    });

    // Lightning bolt shape
    const boltShape = new THREE.Shape();
    boltShape.moveTo(0.5, 3.2);
    boltShape.lineTo(-1.0, 0.4);
    boltShape.lineTo(0.1, 0.4);
    boltShape.lineTo(-0.5, -3.2);
    boltShape.lineTo(1.1, -0.3);
    boltShape.lineTo(0.0, -0.3);
    boltShape.lineTo(0.8, 3.2);
    boltShape.closePath();

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 4,
    };

    const boltGeometry = new THREE.ExtrudeGeometry(boltShape, extrudeSettings);
    boltGeometry.center();
    const bolt = new THREE.Mesh(boltGeometry, material);
    scene.add(bolt);

    // Wreath rings (torus segments for left and right)
    const wreathMat = new THREE.MeshStandardMaterial({
      color: 0xc8c0b5,
      roughness: 0.2,
      metalness: 0.8,
    });

    // Left wreath arc
    const leftArc = new THREE.TorusGeometry(2.8, 0.12, 8, 40, Math.PI * 0.75);
    const leftMesh = new THREE.Mesh(leftArc, wreathMat);
    leftMesh.rotation.z = Math.PI * 0.58;
    leftMesh.position.set(-1.0, -0.8, 0);
    scene.add(leftMesh);

    // Right wreath arc
    const rightArc = new THREE.TorusGeometry(2.8, 0.12, 8, 40, Math.PI * 0.75);
    const rightMesh = new THREE.Mesh(rightArc, wreathMat);
    rightMesh.rotation.z = -Math.PI * 0.58;
    rightMesh.rotation.y = Math.PI;
    rightMesh.position.set(1.0, -0.8, 0);
    scene.add(rightMesh);

    // Leaf spheres on arcs
    const leafGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const leafPositions = [
      [-2.2, 0.8], [-2.6, 0.0], [-2.6, -0.9], [-2.2, -1.7], [-1.6, -2.3],
      [2.2, 0.8], [2.6, 0.0], [2.6, -0.9], [2.2, -1.7], [1.6, -2.3],
    ];
    leafPositions.forEach(([lx, ly]) => {
      const leaf = new THREE.Mesh(leafGeo, wreathMat);
      leaf.position.set(lx, ly, 0);
      scene.add(leaf);
    });

    // Group all for rotation
    const group = new THREE.Group();
    group.add(bolt, leftMesh, rightMesh);
    leafPositions.forEach((_, i) => {
      const children = scene.children.filter(c => c instanceof THREE.Mesh && c !== bolt && c !== leftMesh && c !== rightMesh);
      if (children[i]) group.add(children[i]);
    });
    scene.children
      .filter(c => c instanceof THREE.Mesh && c !== bolt && c !== leftMesh && c !== rightMesh)
      .forEach(c => {
        scene.remove(c);
        group.add(c);
      });
    scene.add(group);

    // Rotation state
    let targetSpeed = 0.003;
    let currentSpeed = 0.003;
    let isHovered = false;

    const onMouseEnter = () => { isHovered = true; targetSpeed = 0.008; };
    const onMouseLeave = () => { isHovered = false; targetSpeed = 0.003; };
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    // Scroll-based scale/fade
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      const s = 1 - progress * 0.7;
      group.scale.setScalar(s);
      renderer.domElement.style.opacity = String(1 - progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Animation loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      group.rotation.y += currentSpeed;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      boltGeometry.dispose();
      material.dispose();
      wreathMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
