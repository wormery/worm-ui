import { MaybeArray } from "./maybeArray";

export type EventListener<T extends (...rest: any) => void> = MaybeArray<T>;

export const eventListenerValue = [Array, Function];
