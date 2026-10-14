"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { MarketplaceAsset, SponsorSpot } from '../data/marketplace';

type Props = {
  mode: MarketplaceAsset;
  spots: SponsorSpot[];
  selectedSpot: SponsorSpot | null;
  logoUrl?: string;
  onSelect: (spot: SponsorSpot) => void;
};

const assetUrls: Record<MarketplaceAsset, string[]> = {
  athlete: [
    '/assets/3d/argentina/toufic_body_lod1.glb',
    '/assets/3d/argentina/toufic_trisuit.glb',
    '/assets/3d/argentina/toufic_sleeves.glb',
  ],
  helmet: ['/assets/3d/argentina/toufic_helmet.glb'],
  bike: ['/assets/3d/argentina/toufic_bike_lod1.glb'],
};

const posterUrls: Record<MarketplaceAsset, string> = {
  athlete: '/assets/3d/argentina/poster_full_front.webp',
  helmet: '/assets/3d/argentina/poster_helmet.webp',
  bike: '/assets/3d/argentina/poster_bike_left.webp',
};

function makeContainTexture(url: string) {
  return new Promise<any>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas unavailable'));
      ctx.clearRect(0, 0, 1024, 1024);
      const scale = Math.min(900 / image.width, 900 / image.height);
      const w = image.width * scale;
      const h = image.height * scale;
      ctx.drawImage(image, (1024 - w) / 2, (1024 - h) / 2, w, h);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.flipY = false;
      texture.needsUpdate = true;
      resolve(texture);
    };
    image.onerror = reject;
    image.src = url;
  });
}

export function MarketplaceScene({ mode, spots, selectedSpot, logoUrl, onSelect }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070707');
    scene.fog = new THREE.Fog('#070707', 4, 9);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
    camera.position.set(0, 1.2, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 1, 0);
    controls.minDistance = 0.45;
    controls.maxDistance = 6;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x202020, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff3b42, 1.4);
    rim.position.set(-4, 2.5, -3);
    scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.8, 64),
      new THREE.MeshStandardMaterial({ color: 0x0b0b0b, roughness: 0.92, metalness: 0.08 }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.006;
    scene.add(floor);

    const root = new THREE.Group();
    scene.add(root);
    const overlays = new Map<string, any>();
    const meshToSpot = new Map<string, SponsorSpot>();
    spots.forEach((spot) => meshToSpot.set(spot.mesh, spot));

    const loader = new GLTFLoader();

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    Promise.all(assetUrls[mode].map((url) => loader.loadAsync(url))).then((models) => {
      if (cancelled) return;
      models.forEach(({ scene: model }) => {
        model.traverse((obj) => {
          if (!(obj instanceof THREE.Mesh)) return;
          obj.castShadow = false;
          obj.receiveShadow = false;
          if (meshToSpot.has(obj.name)) {
            overlays.set(obj.name, obj);
            obj.material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.12,
              side: THREE.DoubleSide,
              depthWrite: false,
              toneMapped: false,
            });
          }
        });
        root.add(model);
      });

      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const distance = Math.max(size.x, size.y, size.z) * (mode === 'bike' ? 1.55 : 1.75);
      controls.target.copy(center);
      camera.position.set(center.x, center.y + size.y * 0.08, center.z + Math.max(distance, 1.6));
      controls.update();
      setReady(true);
      apiRef.current = { camera, controls, overlays, renderer };
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(Array.from(overlays.values()), false);
      if (!hits.length) return;
      const hit = hits[0].object;
      const spot = meshToSpot.get(hit.name);
      if (spot) onSelect(spot);
    };
    renderer.domElement.addEventListener('pointerdown', onPointer);

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointer);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach((material) => material.dispose());
        }
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, [mode, onSelect, spots]);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    api.overlays.forEach((mesh, name) => {
      const active = selectedSpot?.mesh === name;
      if (!logoUrl || !active) {
        mesh.material = new THREE.MeshBasicMaterial({
          color: active ? 0xff3138 : 0xffffff,
          transparent: true,
          opacity: active ? 0.62 : 0.12,
          side: THREE.DoubleSide,
          depthWrite: false,
          toneMapped: false,
        });
      }
    });

    if (!selectedSpot) return;
    const target = new THREE.Vector3(...selectedSpot.position);
    const normal = new THREE.Vector3(...selectedSpot.normal).normalize();
    const distance = selectedSpot.asset === 'bike' ? 1.45 : selectedSpot.asset === 'helmet' ? 0.58 : 0.82;
    const desired = target.clone().add(normal.multiplyScalar(distance));
    desired.y += selectedSpot.asset === 'bike' ? 0.05 : 0.015;
    api.controls.target.copy(target);
    api.camera.position.lerp(desired, 0.92);
    api.controls.update();

    if (logoUrl) {
      const mesh = api.overlays.get(selectedSpot.mesh);
      if (mesh) {
        void makeContainTexture(logoUrl).then((texture) => {
          mesh.material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
            toneMapped: false,
          });
        });
      }
    }
  }, [selectedSpot, logoUrl]);

  return (
    <div className="market-scene" ref={mountRef}>
      {!ready && <img className="market-scene-poster" src={posterUrls[mode]} alt="" />}
      {!ready && !failed && <div className="market-scene-loading"><span /> Loading interactive model</div>}
      {failed && <div className="market-scene-fallback">3D preview unavailable. The placement cards below remain fully usable.</div>}
      <div className="market-scene-hint">Drag to rotate · Scroll to zoom · Click a highlighted placement</div>
    </div>
  );
}
