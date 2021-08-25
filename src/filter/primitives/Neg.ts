import { Filter } from '../Filter';

import negFs from './glsl/neg.fs';

class Neg extends Filter {
  constructor() {
    super(negFs);
  }
}

export { Neg };
