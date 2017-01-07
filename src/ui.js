import {Base} from './ui/base';

export * from './ui/button';
export * from './ui/dialog';
export * from './ui/text-input';
export * from './ui/tree-view';
export * from './ui/window';

export class BContainer extends Base{}
BContainer.template = '<div><slot /></div>';

export class BText extends Base{}
BText.template = '<span>{{ value }}</span>';
BText.defaults = {
  value: ''
};

export class PropertyGrid extends Base{}
PropertyGrid.template = `
  <table class="table">
    <tr v-for=" k in _.keys(data) ">
      <td>{{ k }}</td>
      <td style="padding-left: 5px">
        <b-text-input v-model=" data[k] " />
      </td>
    </tr>
  </table>
`;
PropertyGrid.defaults = {
  data: null
};
