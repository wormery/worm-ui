export type FilterString<T> = T extends string ? T : never;
export type FilterStringArr<T, Default = never> = T extends string[]
  ? T
  : Default;
