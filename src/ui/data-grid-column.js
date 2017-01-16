import {Base} from './base';

export class DataGridColumn extends Base{

}

DataGridColumn.template = `
  <th>{{ header }}</th>
`;

DataGridColumn.defaults = {
  header: '',
  field: ''
};
