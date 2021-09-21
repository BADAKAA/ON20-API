import { EventEmitter } from '../../stencil-public-runtime';
export declare class ExampleComponent {
  exampleProp: string;
  exampleEvent: EventEmitter<string>;
  clickListener(): void;
  exampleToUpperCase(): Promise<void>;
  exampleHandler(ev: MouseEvent): void;
  componentDidLoad(): void;
  render(): any;
}
