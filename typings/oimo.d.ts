declare module 'oimo' {
  import { Mesh } from 'three';

  export type WorldDimmensions = {
    x: number;
    y: number;
    z: number;
  };
  export type Dimmensions = [WorldDimmensions.x, WorldDimmensions.y, WorldDimmensions.z];
  export type WorldProperties = {
    timestep: number;
    iterations: number;
    broadphase: 1 | 2 | 3; // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: number; // scale full world
    random: boolean; // randomize sample
    info: boolean; // calculate statistic or not
    gravity: Dimmensions;
  };

  export type WorldAddConstrait = {
    type: 'sphere' | 'box' | 'cylinder'; // type of shape : sphere, box, cylinder
    size: Dimmensions; // size of shape
    pos: Dimmensions; // start position in degree
    rot: Dimmensions; // start rotation in degree
    move: true; // dynamic or statique
    density: number;
    friction: number;
    restitution: number;
    belongsTo: number; // The bits of the collision groups to which the shape belongs.
    collidesWith: number; // The bits of the collision groups with which the shape collides.
  };

  export type WorldJoint = {
    type: 'jointHinge' | 'jointDistance' | 'jointPrisme' | 'jointSlide' | 'jointWheel'; // type of joint : jointDistance, jointHinge, jointPrisme, jointSlide, jointWheel
    body1: string; // name or id of attach rigidbody
    body2: string; // name or id of attach rigidbody
  };

  export class World {
    constructor(properties: WorldProperties);

    add(object: WorldAddConstrait | WorldJoint): Mesh;

    step(): void;
  }
}
