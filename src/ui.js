import {Base} from './ui/base';

export * from './ui/button';
export * from './ui/dialog';
export * from './ui/label';
export * from './ui/text-input';
export * from './ui/tree-view';
export * from './ui/text';
export * from './ui/window';

export class Container extends Base{}
Container.template = '<div class="container"><slot /></div>';
Container.style = `
  .container{
    padding: 1em;
  }
`;
