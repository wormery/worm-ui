<script lang='ts' setup>
import { ref } from 'vue';

//定义传参
interface Props {
    width?: number,
    height?: number
}
var definProperty = {
    width: "200px",
    height: "300px",
}
console.log(definProperty);
console.log({
    xxx: 'hello',
    labels: () => ['one', 'two'],
    xxysd: ""
})

const props = withDefaults(defineProps<Props>(), {
    xxx: 'hello',
    labels: () => ['one', 'two'],
    xxysd: ""
})

console.log(props);

const width = ref(20);

const msg = ref("message")
</script>

<template>
    <div class="content"></div>
</template>

<style src="./index.scss"  lang="scss" scoped></style>

