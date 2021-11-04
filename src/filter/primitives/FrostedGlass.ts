import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import frostedFs from './glsl/frosted.fs';

class FrostedGlass extends Filter {
  constructor(randomSize: number = 3) {
    const uniforms = {
      randomSize: new Float(randomSize),
    };

    super(frostedFs, new UniformSetter(uniforms));
  }
}

export { FrostedGlass };
