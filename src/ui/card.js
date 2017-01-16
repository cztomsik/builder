import {Base} from './base';

export class Card extends Base{

}

Card.template = `
  <div class="card">
    <a href="" @click.prevent="">
      <img src="http://placehold.it/200x150/FFC107/000000">
      <h3>{{ title }}</h3>
    </a>
    <slot />
  </div>
`;

Card.defaults = {
  title: ''
};

Card.style = `
  .card{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
  }

  .card a img {
    margin: -15px;
    margin-bottom: 15px;
  }
`;
