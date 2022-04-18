import { defineComponent } from "vue";

export type VueProps = typeof defineComponent extends (
  o: infer Option,
  ...rest: any[]
) => void
  ? Option extends { props: infer T }
    ? T
    : never
  : never;
