import {Base} from './base';

export class Window extends Base{

}

Window.template = `
  <div class="window" :style=" {width: width, height: height} ">
    TODO: window
  </div>
`;

Window.defaults = {
  width: 300,
  height: 200
};
