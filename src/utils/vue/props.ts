import { defineComponent, PropType } from "vue";

export type VueProps = typeof defineComponent extends (
  o: infer Option,
  ...rest: any[]
) => void
  ? Option extends { props: infer T }
    ? T
    : never
  : never;

export type GetPropsType<T extends any | PropType<any>> = T extends PropType<
  infer V
>
  ? V
  : T extends { type: PropType<infer V> }
  ? V
  : T;