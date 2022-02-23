import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Line,
} from 'three';
import { getColor } from './helpers/getColor';
import { Crate } from './meshes/crate';
import './styles/index.scss';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 400);
camera.lookAt(0, 0, 0);
console.log(camera);
console.log(scene);

scene.background = new Color(getColor(0x000000));

try {
  const crate = Crate();

  scene.add(crate);

  const points = [];
  points.push(new Vector3(-360, 0, 0));
  points.push(new Vector3(0, 370, 0));
  points.push(new Vector3(360, 210, 320));

  const lineGeometry = new BufferGeometry().setFromPoints(points);
  const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
  const line = new Line(lineGeometry, lineMaterial);
  scene.add(line);

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.compile(scene, camera);

  document.getElementById('root')?.replaceChildren(renderer.domElement);

  const animate = () => {
    requestAnimationFrame(animate);

    crate.rotation.x += 0.005;
    crate.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();
} catch (err) {
  console.log(err);
}
