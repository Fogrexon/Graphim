import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import frostedFs from './glsl/frosted.fs';

class FrostedGlass extends Filter {

  public randomSize: Float;

  constructor(randomSize: number) {
    const uniforms = {
      'randomSize': new Float(randomSize),
    }
    
    super(frostedFs, new UniformSetter(uniforms));
    this.randomSize = uniforms.randomSize;

  }
}

export { FrostedGlass };
