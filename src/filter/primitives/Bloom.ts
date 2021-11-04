import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import bloomFs from './glsl/bloom.fs';

class Bloom extends Filter {

  constructor(threshold: number = 0.5, strength: number = 2.0, blur: number = 1.0) {
    const uniforms = {
      threshold: new Float(threshold),
      strength: new Float(strength),
      blur: new Float(blur),
    };

    super(bloomFs, new UniformSetter(uniforms));
  }
}

export { Bloom };
