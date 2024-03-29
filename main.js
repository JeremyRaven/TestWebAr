import {loadGLTF} from "./libs/loader.js";

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/Pylon10m.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const gltf = await loadGLTF('./assets/models/Pylon3M.glb');
    gltf.scene.scale.set(0.03, 0.03, 0.03);
    gltf.scene.position.set(0, 0.3, 0);
    gltf.scene.rotation.set(Math.PI/2, 0, 0)

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(gltf.scene);

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      gltf.scene.rotation.y += delta //gltf.scene.rotation.y+delta
      renderer.render(scene, camera);
    });
  }
  start();
});
