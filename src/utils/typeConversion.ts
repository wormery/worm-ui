/**
 * 将联合类型转为对应的交叉函数类型
 * @template U 联合类型
 */
type UnionToInterFunction<U> = (
  U extends any ? (k: () => U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/**
 * 获取联合类型中的最后一个类型
 * @template U 联合类型
 */
type GetUnionLast<U> = UnionToInterFunction<U> extends { (): infer A }
  ? A
  : never;

/**
 * 在元组类型中前置插入一个新的类型（元素）；
 * @template Tuple 元组类型
 * @template E 新的类型
 */
type Prepend<Tuple extends any[], E> = [E, ...Tuple];

/**
 * 联合类型转元组类型；
 * @template Union 联合类型
 * @template T 初始元组类型
 * @template Last 传入联合类型中的最后一个类型（元素），自动生成，内部使用
 */
export type UnionToTuple<
  Union,
  T extends any[] = [],
  Last = GetUnionLast<Union>
> = {
  0: T;
  1: UnionToTuple<Exclude<Union, Last>, Prepend<T, Last>>;
}[[Union] extends [never] ? 0 : 1];

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type CreateObjectByArray<
  A1 extends { [k in string | number]: any },
  A2 extends { [k in string | number]: any },
  Default = undefined
> = UnionToIntersection<
  keyof A1 extends infer T
    ? T extends string
      ? A1[T] extends string
        ? { [k in A1[T]]: A2[T] extends undefined ? Default : A2[T] }
        : never
      : never
    : never
>;

// oh boy don't do this
type UnionToIntersection1<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
type LastOf<T> = UnionToIntersection1<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
export type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;
