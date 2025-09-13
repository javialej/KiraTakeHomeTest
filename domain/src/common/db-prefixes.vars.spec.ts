
import { DOMAIN_PREFIX, USER_PREFIX } from './db-prefixes.vars';

describe('DB Prefixes', () => {
  it('should have the correct prefixes', () => {
    expect(DOMAIN_PREFIX).toEqual('DOMAIN#');
    expect(USER_PREFIX).toEqual('USER#');
  });
});
