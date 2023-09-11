import util from 'util';
import { foo } from './lib';

const promisifiedFoo = util.promisify(foo);

export async function bar() {
  // type promisifiedFo and res correctly inferred
  const res = await promisifiedFoo('hello');
  return res;
}
