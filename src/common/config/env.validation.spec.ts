import {validate} from './env.validation';

describe('EnvironmentVariables', () => {
  const originalEnv = process.env;

  describe('validate', () => {
    afterAll(() => {
      process.env = {...originalEnv};
    });

    describe('when validate has require values', () => {
      let paramsEnvironmentVariables;

      const requiredParms = {
        PORT: 3000,
        DB_HOST: 'dummy',
        DB_NAME: 'dummy',
        DB_PASSWORD: 'dummy',
        DB_PORT: 5432,
        DB_USERNAME: 'dummy',
        SERVICE_NAME: 'dummy',
      };

      it('should be success', () => {
        paramsEnvironmentVariables = validate(requiredParms);

        expect(paramsEnvironmentVariables).toEqual(requiredParms);
      });
    });
  });
});
