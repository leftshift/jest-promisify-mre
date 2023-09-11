
export function foo(a: string, cb: (err: Error|null, res?: string) => void): void;

export namespace foo {
  function __promisify__(a: string): Promise<number>;
}
