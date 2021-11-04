import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import pixelFs from './glsl/pixel.fs';

class Pixel extends Filter {

  constructor(blockSize: number = 5) {
    const uniforms = {
      blockSize: new Float(blockSize),
    };

    super(pixelFs, new UniformSetter(uniforms));
  }
}

export { Pixel };
