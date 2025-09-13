
import { ENTITY_DONT_HAVE_RECORDS } from './payments.vars';

describe('Payments Vars', () => {
  it('should have the correct error messages', () => {
    expect(ENTITY_DONT_HAVE_RECORDS).toEqual('Entity dont have records');
  });
});
