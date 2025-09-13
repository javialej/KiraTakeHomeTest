import {DomainEntity} from '../../../domain/src/model/domain.entity';

export const entitiesMock: DomainEntity[] = [
  {
    PK: 'feature',
    SK: 'feature#test@example.com',
    email: 'test@example.com',
    name: 'name1',
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];
