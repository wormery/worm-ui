import { capitalize, isArray, isString } from "@wormery/utils";
import { PropType, defineComponent, toRef, toRefs, Ref } from "vue";
import { call } from ".";
import { Letters, Capitalize } from "./letter";
import { MaybeArray } from "./maybeArray";
import { eventListenerKey } from "../Magic/src/keys";
export type EventListener<T extends (...rest: any) => void> = MaybeArray<T>;
export type GetPropsType<T extends any | PropType<any>> = T extends PropType<
  infer V
>
  ? V
  : T extends { type: PropType<infer V> }
  ? V
  : T;
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
const eventListenerValue = [Array, Function];
export function syncProps<
  Options extends typeof defineComponent extends (
    o: infer Option,
    ...rest: any[]
  ) => void
    ? Option extends { props: infer T }
      ? T
      : never
    : never
>(
  props: Options
): {
  useUpdate: (
    props: object
  ) => <K extends keyof Options>(k: K, value: GetPropsType<Options[K]>) => void;
  props: Options &
    UnionToIntersection<
      {
        [k in keyof Options]: k extends string
          ? {
              [kk in `onUpdate${Capitalize<k>}` | `onUpdate:${k}`]: PropType<
                EventListener<(value: GetPropsType<Options[k]>) => void>
              >;
            }
          : never;
      }[keyof Options]
    >;
} {
  const _props = { ...props } as any;
  Object.keys(props).forEach((key) => {
    if (isString(key)) {
      _props[`onUpdate${capitalize(key)}`] = eventListenerValue;
      _props[`onUpdate:${key}`] = eventListenerValue;
    }
  });

  return {
    useUpdate(props) {
      const propsRef = toRefs(props) as {
        [k in string]: Ref<EventListener<(value: any) => void>>;
      };

      return (s: any, value: any) => {
        const update = propsRef[`onUpdate${capitalize(s)}`];
        call(update.value, value);

        const _update = propsRef[`onUpdate:${s}`];
        call(_update.value, value);
      };
    },
    props: _props,
  };
}

export function onUpdate<T extends string>(str: T): `onUpdate:${T}` {
  return `onUpdate:${str}`;
}

export function onUpdateValue<T>(): PropType<
  EventListener<(value: T) => void>
> {
  return [Function, Array] as any;
}
