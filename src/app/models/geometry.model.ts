export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface Triangle {
  normal: Vec3;
  vertices: [Vec3, Vec3, Vec3];
}

export interface Face {
  normal: Vec3;
  corners: [Vec3, Vec3, Vec3, Vec3];
}
