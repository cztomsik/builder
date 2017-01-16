import {Base} from './base';

export class Grid extends Base{

}

Grid.template = `
  <div class="grid"><slot /></div>
`;

Grid.style = `
  .grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;
