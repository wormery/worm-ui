import { capitalize, isString } from "@wormery/utils";
import { getCurrentInstance, PropType, Ref, warn } from "vue";
import { GetPropsType, VueProps } from ".";
import { eventListenerValue, EventListener, calls } from "..";
import { clone } from "../object";
import { FilterString } from "../string";
import { UnionToIntersection } from "../typeConversion";
import { useModifiable } from "./modifiable";

export function genOnUpdateKeys(key: string): string[] {
  return [`onUpdate${capitalize(key)}`, `onUpdate:${key}`];
}

export function defSyncProps<Props extends VueProps>(
  props: Props
): DefSyncPropsHook<Props> {
  return {
    useSync,
    syncProps: addUpdateProps(clone(props)),
  };
}

function addUpdateProps(props: any) {
  Object.keys(props).forEach((key) => {
    if (!isString(key)) {
      return;
    }
    genOnUpdateKeys(key).forEach((key) => {
      props[key] = eventListenerValue;
    });
  });

  return props;
}

const propsKey = Symbol();

const useSync: UseSync<any> = function (propsName) {
  const instance = getCurrentInstance();
  if (instance === null) {
    notFoundCurrentInstanceOfWarn();
    return () => {
      notFoundCurrentInstanceOfWarn();
    };
  }

  const { props } = instance;
  const updateHook: any = Object.create(null);

  if (propsName) {
    propsName.forEach((item) => {
      updateHook[item] = useModifiable(props, item);
    });
  }

  updateHook[propsKey] = props;

  updateHook["update"] = updateHook;
  updateHook["on"] = updateFunction;

  return updateHook;
};

function updateFunction(this: any, key: any, value: any): void {
  calls(this[propsKey], genOnUpdateKeys(key), [value]);
}

export function notFoundCurrentInstanceOfWarn(): void {
  warn("请在setup里使用");
  warn("Not Found Current Instance,Please Use useupdate in Vue setup");
}


type DefSyncPropsHook<Props extends VueProps> = {
  useSync: UseSync<Props>;
  syncProps: SyncProps<Props>;
};

type UseSync<Props extends VueProps> = <
  PropsNames extends Array<FilterString<keyof Props>>
>(
  propsNames?: PropsNames
) => UseUpdateHook<Props, PropsNames>;

type UseUpdateHook<
  Props extends VueProps,
  PropsNames extends Array<keyof Props>
> = {
  on: <K extends keyof Props>(k: K, value: GetPropsType<Props[K]>) => void;
  update: UseUpdateHook<Props, PropsNames>;
} & { [k in PropsNames[number]]: Ref<GetPropsType<Props[k]>> };

type SyncProps<Props extends VueProps> = Props &
  UnionToIntersection<
    keyof Props extends infer PropsKey
      ? PropsKey extends string
        ? PropsKey extends keyof Props
          ? {
              [kk in
                | `onUpdate${Capitalize<PropsKey>}`
                | `onUpdate:${PropsKey}`]: PropType<
                EventListener<(value: GetPropsType<Props[PropsKey]>) => void>
              >;
            }
          : never
        : never
      : never
  >;
