export interface Control {
  toLeft(to: { render: Function }): void;
  toRight(to: { render: Function }): void;
  toButton(to: { render: Function }): void;
  toUp(to: { render: Function }): void;
}
