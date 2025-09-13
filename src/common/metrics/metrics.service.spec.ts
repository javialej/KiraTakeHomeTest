import {Test, TestingModule} from '@nestjs/testing';
import {MetricsService} from './metrics.service';

jest.mock('@opentelemetry/api', () => ({
  metrics: {
    getMeter: jest.fn(() => ({
      createCounter: jest.fn(() => ({
        add: jest.fn(),
      })),
      createHistogram: jest.fn(() => ({
        record: jest.fn(),
      })),
    })),
  },
}));

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the meter methods', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const spyAdd = jest.spyOn((service as any).transfersTotal, 'add');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    const spyRecord = jest.spyOn((service as any).transferAmount, 'record');
    const spyRecordLatency = jest.spyOn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
      (service as any).transferLatency,
      'record'
    );

    service.incrementTransfersTotal('test', 'success');
    expect(spyAdd).toHaveBeenCalledWith(1, {vendor: 'test', status: 'success'});

    service.recordTransferAmount(100, 'test');
    expect(spyRecord).toHaveBeenCalledWith(100, {vendor: 'test'});

    service.recordTransferLatency(100, 'test');
    expect(spyRecordLatency).toHaveBeenCalledWith(100, {vendor: 'test'});
  });
});
