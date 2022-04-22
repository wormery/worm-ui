import { PE, px } from "@wormery/wtsc";
import { defineComponent, ref, computed } from "vue";
import { WRow, WCol, WGrid } from "..";
import { breakpoints } from "../../utils/screen/useBreakpoints";
import { the, wtsc } from "../../wtsc";

const w = wtsc.scoped();
export const Layout = defineComponent({
  name: "Layout",
  setup() {
    const box = computed(() => {
      return w.add
        .backgroundColor(the.commonly.actionColor)
        .add.width(PE(100))
        .add.display("flex")
        .add.justifyContent("center")
        .add.alignItems("center")
        .add.height(px(40))
        .add.border(px(1), "solid")
        .out();
    });
    return () => {
      return (
        <div
          style={w.add
            .margin(px(20))
            .add.color(the.commonly.type.defaul.main.text)
            .out()}
        >
          <WGrid
            cols={{
              sm: 1,
              md: 3,
              lg: 4,
              xl: 8,
              xxl: 12,
              xxxl: 16,
              xxxxl: 20,
              default: 12,
            }}
          >
            <WRow>
              <WCol span={16}>
                <p>可以设置跟随屏幕变化来自动变化盒子区</p>
                <span>
                  sm: 1, md: 3, lg: 4, xl: 8, xxl: 12, xxxl: 16, xxxxl: 20,
                  default: 12,
                </span>
                <p>当前屏幕大小：{breakpoints.current.value}</p>
              </WCol>
            </WRow>
            <WRow>
              <WCol span={16}>
                <p>这里设置了边空隙 3px</p>
              </WCol>
            </WRow>
            <WRow
              space={3}
              style={w.add.backgroundColor(the.commonly.color2).out()}
            >
              <WCol span={4}>
                <div style={box.value}>当前盒子大小4</div>
              </WCol>
              <WCol span={4}>
                <div style={box.value}>当前盒子大小4</div>
              </WCol>
              <WCol span={4}>
                <div style={box.value}>当前盒子大小4</div>
              </WCol>
              <WCol span={4}>
                <div style={box.value}>当前盒子大小4</div>
              </WCol>
            </WRow>
            <WRow>
              <WCol span={16}>
                <p>当盒子大小为三的时候</p>
              </WCol>
            </WRow>
            <WRow style={w.add.backgroundColor(the.commonly.color2).out()}>
              <WCol span={3}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
              <WCol span={3}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
              <WCol span={3}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
              <WCol span={3}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
            </WRow>
            <WRow>
              <WCol span={16}>
                <p>可以使用偏移</p>
              </WCol>
            </WRow>
            <WRow style={w.add.backgroundColor(the.commonly.color2).out()}>
              <WCol span={3}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
              <WCol span={3} offset={1}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
              <WCol span={3} offset={1}>
                <div style={box.value}>当前盒子大小3</div>
              </WCol>
            </WRow>

            <WRow>
              <WCol span={16}>
                <p>面积为一的小盒子并添加偏移</p>
              </WCol>
            </WRow>

            <WRow style={w.add.backgroundColor(the.commonly.color2).out()}>
              <WCol span={1}>
                <div style={box.value}>当前盒子大小1</div>
              </WCol>
              <WCol span={1} offset={1}>
                <div style={box.value}>当前盒子大小1</div>
              </WCol>
              <WCol span={1} offset={1}>
                <div style={box.value}>当前盒子大小1</div>
              </WCol>
            </WRow>
          </WGrid>
        </div>
      );
    };
  },
});
