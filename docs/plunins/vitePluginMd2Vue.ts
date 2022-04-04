// const marked = require("marked");
import { marked } from "marked";

export default function () {
  return {
    name: "vitePluginMd2Vue",
    transform(src, id) {
      if (id.endsWith(".md")) {
        console.log(src);

        const code = marked(src);
        console.log(code);

        return {
          code: `import {h, defineComponent,ref} from "vue";
                export default {
                  template:\`<div class="markdown">\n${code}\n</div>\`,
                  setup(){
                    const dirname = ref("${id}")
                    return {dirname,console}
                  }
                }`,
          map: null,
        };
      }
    },
  };
}
