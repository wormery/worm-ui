export type TitleCase<S extends string> =
  S extends `${infer Initials}${infer other}`
    ? Initials extends "a" | "A"
      ? `${"A"}${other}`
      : Initials extends "b" | "B"
      ? `${"B"}${other}`
      : Initials extends "c" | "C"
      ? `${"C"}${other}`
      : Initials extends "d" | "D"
      ? `${"D"}${other}`
      : Initials extends "e" | "E"
      ? `${"E"}${other}`
      : Initials extends "f" | "F"
      ? `${"F"}${other}`
      : Initials extends "g" | "G"
      ? `${"G"}${other}`
      : Initials extends "h" | "H"
      ? `${"H"}${other}`
      : Initials extends "i" | "I"
      ? `${"I"}${other}`
      : Initials extends "j" | "J"
      ? `${"J"}${other}`
      : Initials extends "k" | "K"
      ? `${"K"}${other}`
      : Initials extends "l" | "L"
      ? `${"L"}${other}`
      : Initials extends "m" | "M"
      ? `${"M"}${other}`
      : Initials extends "n" | "N"
      ? `${"N"}${other}`
      : Initials extends "o" | "O"
      ? `${"O"}${other}`
      : Initials extends "p" | "P"
      ? `${"P"}${other}`
      : Initials extends "q" | "Q"
      ? `${"Q"}${other}`
      : Initials extends "r" | "R"
      ? `${"R"}${other}`
      : Initials extends "s" | "S"
      ? `${"S"}${other}`
      : Initials extends "t" | "T"
      ? `${"T"}${other}`
      : Initials extends "u" | "U"
      ? `${"U"}${other}`
      : Initials extends "v" | "V"
      ? `${"V"}${other}`
      : Initials extends "w" | "W"
      ? `${"W"}${other}`
      : Initials extends "x" | "X"
      ? `${"X"}${other}`
      : Initials extends "y" | "Y"
      ? `${"Y"}${other}`
      : Initials extends "z" | "Z"
      ? `${"Z"}${other}`
      : S
    : S;

export type Letters = LowercaseLetters | CapitalLetter;

export type LowercaseLetters =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export type CapitalLetter =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
