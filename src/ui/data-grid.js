import {Base} from './base';

export class DataGrid extends Base{
  init(){
    super.init();

    // it's not possible to access children directly
    this.columns = [];
  }

  mounted(){
    super.mounted();

    // TODO: directive?
    // TODO2: get DataGridColumn instances rather than XComp ones
    const mo = new MutationObserver((mutations) => {
      this.columns = _.map(this.$children, '$children.0');
    });

    this.columns = _.map(this.$children, '$children.0');

    mo.observe(this.$refs.theadTr, {childList: true})
  }
}

DataGrid.template = `
  <table class="data-grid">
    <thead>
      <tr ref="theadTr">
        <slot />
      </tr>
    </thead>
    <tbody>
      <tr v-for=" i in [1, 2, 3, 4] ">
        <td v-for=" c in columns ">{{ c.field }}</td>
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
