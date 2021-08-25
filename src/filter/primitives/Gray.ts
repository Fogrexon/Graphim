import { Filter } from '../Filter';

import grayFs from './glsl/gray.fs';

class Gray extends Filter {
  constructor() {
    super(grayFs);
  }
}

export { Gray };
