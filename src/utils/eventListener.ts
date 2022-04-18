import { capitalize, isString } from "@wormery/utils";
import { IN } from "@wormery/wtsc";
import { on } from "events";
import { PropType, defineComponent, getCurrentInstance, warn, Ref } from "vue";
import { call } from ".";
import { Capitalize } from "./letter";
import { MaybeArray } from "./maybeArray";
import {
  CreateObjectByArray,
  UnionToIntersection,
  UnionToTuple,
} from "./typeConversion";
import { VueProps } from "./vue";
import { useModifiable } from "./vue/modifiable";

export type EventListener<T extends (...rest: any) => void> = MaybeArray<T>;

const eventListenerValue = [Array, Function];

export function defListerProps<EventNameList extends string[]>(
  ...rest: EventNameList
): <
  P extends Array<any[] | any> = { [k in keyof EventNameList]: [] },
  OP = CreateObjectByArray<
    {
      [k in keyof EventNameList]: EventNameList[k] extends string
        ? `on${Capitalize<EventNameList[k]>}`
        : EventNameList[k];
    },
    P,
    []
  >
>() => {
  listerProps: {
    [k in OP extends infer TT
      ? TT extends object
        ? keyof TT
        : never
      : never]: OP[k] extends any[]
      ? PropType<EventListener<(...rest: OP[k]) => void>>
      : PropType<EventListener<(value: OP[k]) => void>>;
  };
  useOn(): <EventNames extends EventNameList[number]>(
    propName: EventNames,
    ...rest: `on${Capitalize<EventNames>}` extends infer EventName
      ? EventName extends keyof OP
        ? OP[EventName] extends infer OPV
          ? OPV extends any[]
            ? OPV
            : [OPV]
          : []
        : []
      : []
  ) => void;
} {
  return () => {
    const listerProps: any = {};
    rest.forEach((item) => {
      listerProps[`on${capitalize(item)}`] = eventListenerValue;
    });
    return {
      listerProps,
      useOn() {
        const instance = getCurrentInstance();
        if (!instance) {
          warn("请在setup里使用");
          warn("Please Use useupdate in Vue setup");
          return () => {
            warn("此函数什么也没做");
            warn("Please Use useupdate in Vue setup");
          };
        }
        const { props } = instance;
        return function on(name, ...rest) {
          call((props as any)[`on${capitalize(name)}`], ...rest);
        };
      },
    };
  };
}

export type GetPropsType<T extends any | PropType<any>> = T extends PropType<
  infer V
>
  ? V
  : T extends { type: PropType<infer V> }
  ? V
  : T;

export function syncProps<Props extends VueProps>(
  props: Props
): {
  useUpdate: <PropsNames extends Array<keyof Props>>(
    propsNames?: PropsNames
  ) => { [k in PropsNames[number]]: Ref<GetPropsType<Props[k]>> } & {
    update: <K extends keyof Props>(
      k: K,
      value: GetPropsType<Props[K]>
    ) => void;
  } & (<K extends keyof Props>(k: K, value: GetPropsType<Props[K]>) => void);
  props: Props &
    UnionToIntersection<
      {
        [k in keyof Props]: k extends string
          ? {
              [kk in `onUpdate${Capitalize<k>}` | `onUpdate:${k}`]: PropType<
                EventListener<(value: GetPropsType<Props[k]>) => void>
              >;
            }
          : never;
      }[keyof Props]
    >;
} {
  const _props = { ...props } as any;
  Object.keys(props).forEach((key) => {
    if (!isString(key)) {
      return;
    }
    _props[`onUpdate${capitalize(key)}`] = eventListenerValue;
    _props[`onUpdate:${key}`] = eventListenerValue;
  });
  return {
    useUpdate(propsName) {
      const props: any = getCurrentInstance()?.props;
      if (!props) {
        warn("Please Use useupdate in Vue setup");
        return () => {
          warn("Please Use useupdate in Vue setup");
        };
      }

      const updateHook: any = (s: any, value: any) => {
        call(props[`onUpdate${capitalize(s)}`] as any, value);
        call(props[`onUpdate:${s}`] as any, value);
      };

      if (propsName) {
        propsName.forEach((item) => {
          updateHook[item] = useModifiable(props, item);
        });
      }

      return (updateHook["update"] = updateHook);
    },
    props: _props,
  };
}
