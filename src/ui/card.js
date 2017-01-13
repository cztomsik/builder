import {Base} from './base';

export class Card extends Base{

}

Card.template = `
  <div class="card"><slot /></div>
`;

Card.style = `
  .card{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
  }
`;
