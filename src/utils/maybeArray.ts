export type MaybeArray<T> = T | T[];

export type MaybeArrayToArray<T extends MaybeArray<any>> = T extends any[] ? T : [T];
