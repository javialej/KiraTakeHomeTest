import {metrics} from '@opentelemetry/api';
import {buildMeterName, GeneralUtils, getMeter} from './general.util';

jest.mock('cls-rtracer', () => {
  return {
    id: () => 'mocked-trace-id',
  };
});
jest.mock('@opentelemetry/api', () => ({
  trace: {
    getTracer: jest.fn(),
  },
  metrics: {
    getMeter: jest.fn(),
  },
}));
describe('GeneralUtils', () => {
  const generateUtils = GeneralUtils;

  describe('getTraceId', () => {
    it('should return a traceId', () => {
      const idTracer = 'mocked-trace-id';

      const result = generateUtils.getTraceId;
      expect(result).toEqual(idTracer);
    });
  });
  describe('getMeter', () => {
    it('should return a meter', () => {
      const mockMeter = {};
      (metrics.getMeter as jest.Mock).mockReturnValue(mockMeter);

      const meter = getMeter();

      expect(metrics.getMeter).toHaveBeenCalledWith('default-meter');
      expect(meter).toBe(mockMeter);
    });
  });

  describe('buildMeterName', () => {
    it('should build a meter name with the service name', () => {
      process.env.SERVICE_NAME = 'test-service';
      const name = 'test-meter';

      const meterName = buildMeterName(name);

      expect(meterName).toBe('test-service_test-meter');
    });
  });
});
