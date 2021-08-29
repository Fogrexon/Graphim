import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import blurFs from './glsl/blur.fs';

class Blur extends Filter {

  public strength: Float;

  constructor(strength: number) {
    
    const uniforms = {
      'strength': new Float(strength),
    }
    
    super(blurFs, new UniformSetter(uniforms));
    this.strength = uniforms.strength;

  }
}

export { Blur };
