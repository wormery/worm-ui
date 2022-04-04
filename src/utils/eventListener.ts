import { isArray } from "@wormery/utils";
import { MaybeArray } from "./maybeArray";
export type EventListener<T extends (...rest: any) => void> = MaybeArray<T>;
