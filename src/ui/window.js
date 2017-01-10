import {Base} from './base';

export class Window extends Base{

}

Window.template = `
  <div class="window" :style=" {width: width, height: height} ">
    <div class="window-header">TODO: header</div>
    <slot />
  </div>
`;

Window.defaults = {
  width: 300,
  height: 200
};
