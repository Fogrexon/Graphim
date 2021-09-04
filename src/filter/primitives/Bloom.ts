import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import bloomFs from './glsl/bloom.fs';

class Bloom extends Filter {
  public threshold: Float;

  public strength: Float;

  public blur: Float;

  constructor(threshold: number, strength: number, blur: number) {
    const uniforms = {
      threshold: new Float(threshold),
      strength: new Float(strength),
      blur: new Float(blur),
    };

    super(bloomFs, new UniformSetter(uniforms));
    this.threshold = uniforms.threshold;
    this.strength = uniforms.strength;
    this.blur = uniforms.blur;
  }
}

export { Bloom };
