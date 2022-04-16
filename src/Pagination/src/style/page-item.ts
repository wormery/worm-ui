import { the } from "../../../wtsc";
import { createHoverColor } from "../../../wtsc/mixColor";
import { w } from "../wtsc";
import { duration } from "../../../Magic/src/status";
import { ms, px } from "@wormery/wtsc";
const color = w.inject(the.commonly.color2);
export const pageItemButtonClass = w.add
  .position("absolute")
  .add.top("5px")
  .add.left("5px")
  .add.bottom("5px")
  .add.right("5px")
  .add.backgroundColor(color)
  .add.borderRadius(the.commonly.borderRadius)
  .class("page-item")
  .add.backgroundColor(createHoverColor(color, 0.5))
  .pseudo(":hover")
  .out();

const pageItemButtonTextClassName = "page-item-button-text";
export const pageItemButtonTextClass = w.add
  .transition("color", ms(500))
  .class(pageItemButtonTextClassName)
  .out();

//选中发光
const actionColor = w.inject(the.commonly.actionColor);
w.add
  .color(actionColor)
  .add.textShadow(
    [0, 0, px(5), actionColor],
    [0, 0, px(10), actionColor],
    [0, 0, px(15), actionColor],
    [0, 0, px(20), actionColor]
  )
  .class(`${pageItemButtonTextClassName}.active`)
  .out();
