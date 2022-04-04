import { defineComponent } from "vue";
import { isNumber, isString, isNotUndef, isTure, } from "@wormery/utils";
import { computed, ref, toRefs } from "vue";
import { toPX, ifReturn } from "../../utils/utils";
import { wtsc } from "../../wtsc";
import { resolveWrappedSlot, withDefaultsOfToRefs } from "../../utils/utils";
import { PE } from "@wormery/wtsc";
const props = {
    title: String,
    content: String,
    coverImg: String,
    borderRadius: String,
    width: String,
    height: String,
};
export default defineComponent({
    name: "WCard",
    props,
    setup(props, { slots }) {
        const { title, content, coverImg, borderRadius, width, height } = withDefaultsOfToRefs(props, {
            borderRadius: "10px",
            width: "300px",
            height: "auto",
        });
        const w = wtsc.scoped();
        const cardRef = ref(null);
        const { bgColor } = toRefs({ bgColor: "#ededef" });
        const cardStyle = computed(() => w.clean.add
            .display("flex")
            .add.flexDirection("column")
            .add.width(width.value)
            .add.height(toPX(height.value))
            .add.backgroundColor(bgColor.value)
            .add.borderRadius(borderRadius.value)
            .add.boxShadow("0px 1px 2px #000000aa")
            .add.overflow("hidden")
            .out());
        const contentPlopStyle = computed(() => w.clean.add.margin("1rem").add.fontSize("1rem").add.flexGrow("0").out());
        const coverImgStyle = computed(() => {
            w.clean.add
                .height(PE(100))
                .add.width(PE(100))
                .add.backgroundImage(`url(${coverImg.value})`)
                .add.backgroundPosition("center")
                .add.backgroundSize("cover")
                .add.backgroundRepeat("no-repeat");
            return w.out();
        });
        const coverStyle = computed(() => {
            w.clean.add
                .flexGrow("1")
                .if(isNotUndef(coverImg.value) &&
                (height.value == "auto" || width.value.endsWith("%")), () => {
                var _a;
                const cordWidth = (_a = cardRef === null || cardRef === void 0 ? void 0 : cardRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth;
                if (isNumber(cordWidth)) {
                    w.add.height(toPX(cordWidth * 0.618)).add.width(width.value);
                }
            });
            return w.out();
        });
        const titleHStyle = computed(() => {
            w.clean.add.fontSize("1.3em");
            return w.out();
        });
        const titleStyle = computed(() => {
            w.clean.add.flexGrow("0").add.margin("0px 1rem");
            return w.out();
        });
        return () => (<>
        <div ref={($el) => (cardRef.value = $el)} class={["w-card"]} style={cardStyle.value}>
          {ifReturn(isTure(slots.cover) || isString(coverImg.value), <div class="cover" style={[coverStyle.value]}>
              {resolveWrappedSlot(slots.cover, () => ifReturn(isNotUndef(coverImg.value), <div style={[coverImgStyle.value]} class="coverImg"></div>))}
            </div>)}
          {ifReturn(!!slots.title || isString(title.value), <div class="title" style={titleStyle.value}>
              {resolveWrappedSlot(slots.title, () => ifReturn(isString(title.value), <h4 class={["titleh1"]} style={titleHStyle.value}>
                    {title.value}
                  </h4>))}
            </div>)}
          {ifReturn(!!slots.default || isString(content.value), <div class="content" style={contentPlopStyle.value}>
              {resolveWrappedSlot(slots.default, () => ifReturn(isString(content.value), <div class="content-slot">{content.value}</div>))}
            </div>)}
        </div>
      </>);
    },
});
//# sourceMappingURL=index.jsx.map