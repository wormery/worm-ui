import { mixColor, px, rgb } from "@wormery/wtsc";
import { defineComponent, toRefs, } from "vue";
import { wtsc, the } from "../../../wtsc";
import { call } from "../../../utils/call";
import { createHoverColor, createPressedColor } from "../../../wtsc/mixColor";
const w = wtsc.scoped();
export default defineComponent({
    props: {
        type: {
            type: String,
            default: "defaul",
        },
        level: {
            type: String,
            default: "default",
        },
        ghost: {
            type: Boolean,
            default: false,
        },
        onClick: [Function, Array],
    },
    emits: ["click"],
    setup(props, { slots, emit }) {
        const { type, level } = toRefs(props);
        const types = wtsc.the.commonly.type;
        return () => {
            var _a;
            w.add
                .display("flex")
                .add.justifyContent("center")
                .add.alignItems("center")
                .add.padding("0px 15px")
                .add.margin("10px")
                .add.height(the.commonly.rowHeight)
                .add.fontSize(the.commonly.fontSize)
                .add.width("fit-content")
                .add.borderRadius(px(5))
                .add.userSelect("none");
            if (level.value === "secondary") {
                const color = w.inject(types[type.value].main.color);
                const cn = color.toNumbers();
                const nColor = mixColor(color, rgb(255, 255, 255, 3));
                w.add.color(color).add.backgroundColor(nColor);
                w.class(`button-${level.value}-${type.value}`)
                    .add.backgroundColor(mixColor(color, rgb(255, 255, 255, 1.5)))
                    .pseudo(":hover")
                    .add.backgroundColor(mixColor(color, rgb(255, 255, 255, 1)))
                    .pseudo(":active");
            }
            else if (level.value === "tertiary") {
                const color = rgb(240, 240, 240);
                w.add
                    .color(types[type.value].main.color)
                    .add.backgroundColor(color)
                    .class(`button-${level.value}-${type.value}`)
                    .add.backgroundColor(createHoverColor(color))
                    .pseudo(":hover")
                    .add.backgroundColor(createPressedColor(color))
                    .pseudo(":active");
            }
            else if (level.value === "quaternary") {
                const color = rgb(230, 230, 230);
                w.add
                    .color(types[type.value].main.color)
                    .add.backgroundColor(w.the.commonly.backgroundColour)
                    .class(`button-${level.value}-${type.value}`)
                    .add.backgroundColor(createHoverColor(color))
                    .pseudo(":hover")
                    .add.backgroundColor(createPressedColor(color))
                    .pseudo(":active");
            }
            else {
                w.add
                    .color(types[type.value].main.text)
                    .add.backgroundColor(types[type.value].main.color);
                w.class("button-" + type.value)
                    .add.backgroundColor(types[type.value].hover.color)
                    .pseudo(":hover")
                    .add.backgroundColor(types[type.value].pressed.color)
                    .pseudo(":active");
            }
            const className = w.out();
            const { onClick } = props;
            return (<div v-magic={"selection"} class={className} onClick={(e) => {
                    onClick && call(onClick, e);
                }}>
          <span>{(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)}</span>
        </div>);
        };
    },
});
//# sourceMappingURL=index.jsx.map