import { BoxGeometry, Mesh, MeshBasicMaterial, MeshBasicMaterialParameters, TextureLoader } from 'three';

export const Crate = (color?: number): Mesh => {
  let options: MeshBasicMaterialParameters;
  const crateGeometry = new BoxGeometry(200, 200, 200);

  if (color) {
    options = { color };
  } else {
    const texture = new TextureLoader().load('/textures/crate.gif');
    options = { map: texture };
  }

  const crateMaterial = new MeshBasicMaterial(options);
  const crate = new Mesh(crateGeometry, crateMaterial);

  return crate;
};
