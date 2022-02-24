import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  Vector3,
  BufferGeometry,
  LineBasicMaterial,
  Line,
  Camera,
} from 'three';
import { World } from 'oimo';
import { getColor } from './helpers/getColor';
import { Crate } from './meshes/crate';
import './styles/index.scss';
import { Mesh } from 'three';

class Game {
  private scene: Scene;
  private camera: Camera;
  private renderer: WebGLRenderer;
  private world: World;
  private crate: Mesh;

  constructor() {
    this.init();
    this.createWorld();
    this.animate();
  }

  init() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(0, 0, 0);

    this.scene.background = new Color(getColor(0x000000));

    // meshes
    this.createCrate();
    this.createLine();

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.compile(this.scene, this.camera);

    document.getElementById('root')?.replaceChildren(this.renderer.domElement);
  }

  createCrate() {
    this.crate = Crate();
    this.scene.add(this.crate);
  }

  createLine() {
    const points = [];
    points.push(new Vector3(-360, 0, 0));
    points.push(new Vector3(0, 370, 0));
    points.push(new Vector3(360, 210, 320));

    const lineGeometry = new BufferGeometry().setFromPoints(points);
    const lineMaterial = new LineBasicMaterial({ color: 0x0000ff });
    const line = new Line(lineGeometry, lineMaterial);
    this.scene.add(line);
  }

  createWorld() {
    this.world = new World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2,
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -9.8, 0],
    });
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.crate.rotation.x += 0.005;
    this.crate.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.world.step();
  }
}

new Game();
/*
const init = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 400);
  camera.lookAt(0, 0, 0);
  console.log(camera);
  console.log(scene);

  scene.background = new Color(getColor(0x000000));

  return {
    scene,
    camera,
  };
};

const animate = () => {
  requestAnimationFrame(animate);

  this.crate.rotation.x += 0.005;
  crate.rotation.y += 0.01;

  renderer.render(scene, camera);
};

const update = () => {};


const { scene, camera } = init();

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

  init();
  animate();
} catch (err) {
  console.log(err);
}
*/
