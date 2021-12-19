// 文件夹组件自动引入
// 非懒加载模式
// 你可以在引入本模块时使用 import.meta.glob("Component.vue")来懒加载引入
// const files = import.meta.globEager("./src/*.vue");

// const [key] = Object.keys(files);

// const { default: Component } = files[key];
import Component from "./src/SildingSwitching.vue";

export default Component;
