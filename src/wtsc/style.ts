import { PE, px } from "@wormery/wtsc";
import { wtsc } from "./wtsc";
const w = wtsc.global();

export const center = w
  .clear()
  .add.position("absolute")
  .add.left(PE(50))
  .add.top(PE(50))
  .add.transform("translate(-50%,-50%)")
  .class("center")
  .out();

export const rCenter = w
  .clear()
  .add.position("absolute")
  .add.left(PE(50))
  .add.transform("translateX(-50%)")
  .class("r-center")
  .out();

export const cCenter = w
  .clear()
  .add.position("absolute")
  .add.top(PE(50))
  .add.transform("translateY(-50%)")
  .class("c-center")
  .out();

export const clearFloat = w
  .clear()
  .addAny("*zoom", 1)
  .class("clear-float")
  .add.display("block")
  .add.height(px(0))
  .add.content("''")
  .add.clear("both")
  .add.visibility("hidden")
  .pseudo(":after")
  .out();
