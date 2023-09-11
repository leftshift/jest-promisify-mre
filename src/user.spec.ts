import util from 'util';
import libModule from './lib';
import { bar } from './user';

jest.mock('./lib')

const lib = jest.mocked(libModule)

it('doesn\'t let me mock the promisified function :(', async () => {
  const promisifiedFoo = util.promisify(lib.foo);

  // it thinks promisifiedFoo is a mockfn, and let's me call stuff on it.
  // the argument type also gets correctly inferred.
  promisifiedFoo.mockResolvedValue(100);

  const res = await bar();
  // but instead, we exceed the timeout ://
  // that's because somewhere in the underbelly, the promisify wrapper
  // is waiting for the callback to be called
  // and doesn't care about the promise we're returning here.

  expect(res).toEqual(100);
});

it('works if implementing an err-res callback instead', async () => {
  const promisifiedFoo = util.promisify(lib.foo);

  // if we lie to the compiler and implement something that calls an err-res callback instead,
  // everything works. this kinda works, but is a bit confusing because:
  // 1) The compiler strongly disagrees this mock implementation is valid
  // 2) It also looks verry confusing, because now we're back to writing something
  //    similar to the callback-based foo, instead of the custom async variant
  //    (which has a different return type!!)
  (promisifiedFoo as any).mockImplementation((arg: any, cb: (err: Error|null, res: number) => void) => {
    cb(null, 100)
  });

  const res = await bar();
  // but instead, we exceed the timeout ://

  expect(res).toEqual(100);
});
