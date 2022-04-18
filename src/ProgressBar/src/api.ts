export type Api =
  | {
      endNow: () => void;
      startAgain: () => void;
    }
  | null
  | undefined;
