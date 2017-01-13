import {Base} from './base';

export class DataGrid extends Base{}

DataGrid.template = `
  <table class="data-grid">
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

DataGrid.style = `
  .data-grid{
    width: 100%;
    border-collapse: collapse;
  }

  .data-grid td{
    border-top: 1px solid #ccc;
    padding: 2px 5px;
  }

  .data-grid th{
    border: 1px solid #ccc;
  }
`;
