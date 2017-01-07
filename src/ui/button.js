import {Base} from './base';

export class Button extends Base{}

Button.template = `
  <button class="button" @click="$emit('click')">{{ text }}</button>
`;

Button.defaults = {
  text: ''
};

Button.style = `
  .button{
    padding: 5px 10px;
  }
`;
