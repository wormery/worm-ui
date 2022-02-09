<template lang="">
  <WTypeWriting :str="str" :curserStyleType="'line'"></WTypeWriting>
</template>
<script lang="ts" setup>
import { WTypeWriting } from "../../";

const str = `带上她的眼睛

`;

// 连续工作了两个多月，我实在累了，便请求主任给我两天假，出去短暂旅游一下散散心。主任答应了，条件是我再带一双眼睛去，我也答应了，于是他带我去拿眼睛。
</script>

<style lang="scss" scoped>
.type-writing {
  font-size: 3rem;
}
</style>
