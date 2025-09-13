import {Injectable} from '@nestjs/common';
import {Meter, Counter, Histogram, metrics} from '@opentelemetry/api';

@Injectable()
export class MetricsService {
  private readonly meter: Meter;
  private readonly transfersTotal: Counter;
  private readonly transferAmount: Histogram;
  private readonly transferLatency: Histogram;

  constructor() {
    this.meter = metrics.getMeter(process.env.SERVICE_NAME ?? 'payments-api');

    this.transfersTotal = this.meter.createCounter('transfers_total', {
      description: 'Total number of transfers processed',
    });

    this.transferAmount = this.meter.createHistogram('transfer_amount', {
      description: 'Distribution of transfer amounts',
      unit: 'usd', // Assuming USD for consistency
    });

    this.transferLatency = this.meter.createHistogram('transfer_latency_ms', {
      description: 'Latency of the transfer process in milliseconds',
      unit: 'ms',
    });
  }

  incrementTransfersTotal(vendor: string, status: 'success' | 'failure') {
    this.transfersTotal.add(1, {vendor, status});
  }

  recordTransferAmount(amount: number, vendor: string) {
    this.transferAmount.record(amount, {vendor});
  }

  recordTransferLatency(latency: number, vendor: string) {
    this.transferLatency.record(latency, {vendor});
  }
}
