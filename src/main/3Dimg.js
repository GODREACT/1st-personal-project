import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function Astronaut() {
  const canvasRef = useRef();
  let scene, renderer, camera, gltfModel;

  useEffect(() => {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 15); 

    scene.background = null;

    const light = new THREE.DirectionalLight('white', 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load('3Dimg/scene.gltf', function (gltf) {
      if (gltfModel) {
        scene.remove(gltfModel);
        gltfModel.traverse((node) => {
          if (node.isMesh) {
            node.geometry.dispose();
            node.material.dispose();
          }
        });
      }

      gltfModel = gltf.scene;
      scene.add(gltfModel);

      gltfModel.scale.set(1.5, 1.5, 1.5); 

      function animate() {
        if (gltfModel) {
          gltfModel.rotation.y += 0.01; 
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        }
      }

      animate();
    });

    return () => {
      if (gltfModel) {
        scene.remove(gltfModel);
        gltfModel.traverse((node) => {
          if (node.isMesh) {
            node.geometry.dispose();
            node.material.dispose();
          }
        });
      }

      renderer.dispose(); 
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '200px', height: '200px' }} />;
}

export default Astronaut ;
