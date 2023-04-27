type RVF = (...args: Array<any>) => void;
type RNF = (...args: Array<any>) => number;
type RSF = (...args: Array<any>) => string;

export type returnVoidFunction = RVF;
export type returnNumberFunction = RNF;
export type returnStringFunction = RSF;