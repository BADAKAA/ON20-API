export declare class FlipCard {
  name?: string;
  turnable: boolean;
  img: string;
  place?: string;
  date?: string;
  description?: string;
  colorfront?: string;
  colorback?: string;
  textfront?: string;
  textback?: string;
  el: HTMLElement;
  flipcard?: string;
  handleMouseOver(): void;
  handleMouseOut(): void;
  googleMaps(): void;
  meme(): void;
  render(): any;
  componentDidLoad(): void;
}
