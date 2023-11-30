import { logger } from '../../src/utils/logger';
import { mocked } from 'jest-mock';

jest.mock('../../src/utils/logger');

const mockedLogger = mocked(logger, { shallow: true });
const mockData = { hello: 'world' };

describe('Logging Service', () => {
    it('should log message to info', () => {
        logger.info('info log', mockData);
  
        expect(mockedLogger.info).toHaveBeenCalledWith('info log', mockData);
    });

    it('should log message to debug', () => {
        logger.debug('debug log', mockData);
  
        expect(mockedLogger.debug).toHaveBeenCalledWith('debug log', mockData);
    });

    it('should log message to warn', () => {
        logger.warn('warn log', mockData);
  
        expect(mockedLogger.warn).toHaveBeenCalledWith('warn log', mockData);
    });

    it('should log message to error', () => {
        logger.error('error log', mockData);
  
        expect(mockedLogger.error).toHaveBeenCalledWith('error log', mockData);
    });
});
