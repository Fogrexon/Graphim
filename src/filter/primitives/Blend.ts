import { Float } from '../../utils/Uniforms';
import { BlendFilter } from '../BlendFilter';
import { UniformSetter } from '../UniformSetter';

import blendFs from './glsl/blend.fs';

class Blend extends BlendFilter {

  constructor(blend: number = 0.5) {
    const uniforms = {
      blend: new Float(blend),
    };

    super(blendFs, new UniformSetter(uniforms));
  }
}

export { Blend };
