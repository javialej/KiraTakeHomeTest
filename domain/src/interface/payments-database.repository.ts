import {DomainEntity} from '../model/payments.entity';

export interface IDomainDataBaseRepository {
  /**
   *
   * Returns info array filtered by email
   * @param {string} PKDomain - DOMAIN#${email}
   * @returns a `array of users` object containing the data.
   */
  getFeatureBy(PKDomain: string): Promise<DomainEntity[]>;
}
