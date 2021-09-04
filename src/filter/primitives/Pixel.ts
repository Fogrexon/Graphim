import { Float } from '../../utils/Uniforms';
import { Filter } from '../Filter';
import { UniformSetter } from '../UniformSetter';

import pixelFs from './glsl/pixel.fs';

class Pixel extends Filter {
  public blockSize: Float;

  constructor(blockSize: number) {
    const uniforms = {
      blockSize: new Float(blockSize),
    };

    super(pixelFs, new UniformSetter(uniforms));
    this.blockSize = uniforms.blockSize;
  }
}

export { Pixel };
