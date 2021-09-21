export interface event {
  title: string;
  date: string;
  start?: string;
  end?: string;
  city?: string;
  location?: string;
  adress?: string;
  description?: string;
  image?: string;
}
export declare class EventList {
  dataurl: string;
  buttons: boolean;
  animated: boolean;
  color: string;
  el: HTMLElement;
  render(): any;
  componentDidLoad(): void;
}
