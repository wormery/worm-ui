export function clone<T>(o: T): T {
  return { ...o };
}
export type Data<
  Key extends string | symbol | number = string | symbol | number,
  Value = any
> = {
  [k in Key]: Value;
};

export type ObjValueDefault<Obj extends object, Default> = {
  [k in keyof Obj]: unknown extends Obj[k] ? Default : Obj[k];
};
