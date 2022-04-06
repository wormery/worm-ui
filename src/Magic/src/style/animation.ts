import { keyframes, rgb } from "@wormery/wtsc";
import w from "../wtsc";

export const lodingAnmaiton = keyframes(
  "loding",
  (a, w) => {
    a("0%", w.add.border("3px solid").add.borderColor(rgb(0, 255, 255)));
    a("50%", w.add.border("5px solid").add.borderColor(rgb(0, 255, 0)));
    a("100%", w.add.border("3px solid").add.borderColor(rgb(0, 255, 255)));
  },
  w
).out(w);
