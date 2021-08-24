import { Filter } from '../Filter';

import sepiaFs from './glsl/sepia.fs';

class Sepia extends Filter {
  constructor() {
    super(sepiaFs);
  }
}

export { Sepia };
