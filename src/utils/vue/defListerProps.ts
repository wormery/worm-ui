import { capitalize } from "@wormery/utils";
import { getCurrentInstance, PropType, warn } from "vue";
import { notFoundCurrentInstanceOfWarn, eventListenerValue } from "../";
import { call } from "../call";
import { CreateObjectByArray } from "../typeConversion";
import { EventListener, MaybeArrayToArray } from "..";
import { MaybeArray } from "../maybeArray";
import { FilterString } from "../string";
import { ObjValueDefault } from "../object";

function genOnEventName(name: string) {
  return `on${capitalize(name)}`;
}
/**
 * 传入evenNames将会定义OnXxx这样的运行时校验
 * 总之如果未来可能需要用到OnXxx请一定传入，否则一时疏忽将带来苦恼
 * @author meke
 * @export
 * @template EventObj
 * @param {...Array<keyof EventObj>} evenNames 类型定义了什么就传入什么，否则事件无反应
 * @return {*}  {DefListerPropsHook<ObjValueDefault<EventObj, []>>}
 */
export function defListerProps<
  EventObj extends { [k: string]: MaybeArray<any> }
>(
  ...eventNames: Array<FilterString<keyof EventObj>>
): DefListerPropsHook<ObjValueDefault<EventObj, []>> {
  const listerProps = addListerProps(eventNames);

  return {
    listerProps,
    useOn() {
      const instance = getCurrentInstance();
      if (instance === null) {
        notFoundCurrentInstanceOfWarn();
        return () => {};
      }

      return on.bind(instance) as any;
    },
  };
}

function on(this: any, name: string, ...rest: any) {
  const evenName = genOnEventName(name);

  if (__DEV__) {
    if (!this.props[evenName]) {
      warn(
        "worm-ui:警告:您使用defListerProps时忘记传入了EventName,您定义了什么类型请在函数中传入什么类型"
      );
    }
  }

  call((this.props as any)[evenName], ...rest);
}

function addListerProps(names: string[]) {
  const listerProps: any = {};
  for (let i = 0; i < names.length; i++) {
    listerProps[genOnEventName(names[i])] = eventListenerValue;
  }
  return listerProps;
}

type EventNameListType = string[];
type EventValuesListType = Array<MaybeArray<any>>;

// export type DefListerPropsFunctionType = {
//   <EventNames extends EventNameListType>(
//     ...rest: EventNames
//   ): DefListerPropsHook<
//     EventNames,
//     PretreatmentEventObj<EventNames, Array<[]>>
//   >;
// };

// type xxx = DefListerPropsHook<["3"], PretreatmentEventObj<["3"], Array<[]>>>;

// type DefListerPropsRestsFunctionType<EventNameList extends string[]> = <
//   EventValuesList extends EventValuesListType = DefaultEventValuesTpye<EventNameList>
// >() => DefListerPropsHook<
//   PretreatmentEventObj< EventValuesList>
// >;

type PretreatmentEventObj<
  EventNameList extends EventNameListType,
  EventValuesTpye extends EventValuesListType
> = CreateObjectByArray<
  {
    [k in keyof EventNameList]: EventNameList[k] extends string
      ? `on${Capitalize<EventNameList[k]>}`
      : EventNameList[k];
  },
  EventValuesTpye,
  []
>;

type DefaultEventValuesTpye<EventNameList extends string[]> = {
  [k in keyof EventNameList]: [];
};

type DefListerPropsHook<PretreatmentEventObj> = {
  listerProps: ListerProps<PretreatmentEventObj>;
  useOn(): OnFunctionType<PretreatmentEventObj>;
};

type ListerProps<PretreatmentEventObj> = {
  [k in PretreatmentEventObj extends infer TT
    ? TT extends object
      ? keyof TT
      : never
    : never]: PropType<
    EventListener<
      (...value: MaybeArrayToArray<PretreatmentEventObj[k]>) => void
    >
  >;
};

type OnFunctionType<PretreatmentEventObj> = <
  EventName extends FilterString<keyof PretreatmentEventObj>
>(
  eventName: EventName,
  ...rest: EventName extends infer EventName
    ? EventName extends keyof PretreatmentEventObj
      ? PretreatmentEventObj[EventName] extends infer OPV
        ? OPV extends any[]
          ? OPV
          : [OPV]
        : []
      : []
    : []
) => void;

type OnEventName<key extends string> = `on${Capitalize<key>}`;
