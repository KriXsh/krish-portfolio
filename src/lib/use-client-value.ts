import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** A value only the browser can know (dates, device hints), with a stable
    server fallback so hydration never mismatches. */
export function useClientValue<T>(read: () => T, serverValue: T): T {
  return useSyncExternalStore(noop, read, () => serverValue);
}
