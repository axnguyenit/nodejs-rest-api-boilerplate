type Join<S1, S2> = S1 extends string
  ? S2 extends string
    ? `${S1}.${S2}`
    : never
  : never;

export type MappedUnion<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? Join<K, MappedUnion<T[K]>>
    : K;
}[keyof T];
