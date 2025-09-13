
import { PaymentsEntity } from './payments.entity';
import { DatabaseGenericFields } from './database-generic-fields.type';

describe('PaymentsEntity', () => {
  it('should create a payments entity', () => {
    const fields: DatabaseGenericFields = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      PK: 'PK',
      SK: 'SK',
    };
    const entity = new PaymentsEntity('test@test.com', 'test', fields);

    expect(entity.email).toEqual('test@test.com');
    expect(entity.name).toEqual('test');
    expect(entity.createdAt).toBeDefined();
    expect(entity.updatedAt).toBeDefined();
    expect(entity.PK).toEqual('PK');
    expect(entity.SK).toEqual('SK');
  });
});
