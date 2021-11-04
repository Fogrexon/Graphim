import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import blurFs from './glsl/blur.fs';

class Blur extends Filter {
  constructor(strength: number = 5.0) {
    const uniforms = {
      strength: new Float(strength),
    };

    super(blurFs, new UniformSetter(uniforms));
  }
}

export { Blur };
