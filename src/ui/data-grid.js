import {Base} from './base';

export class DataGrid extends Base{}

DataGrid.template = `
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for=" i in [1, 2, 3, 4] ">
        <td>TODO</td>
        <td>TODO</td>
      </tr>
    </tbody>
  </table>
`;

DataGrid.defaults = {

};
