import {PaymentsEntity} from '../model/payments.entity';

export interface IPaymentsRepository {
  save(payment: PaymentsEntity): Promise<PaymentsEntity>;
}
