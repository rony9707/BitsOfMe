import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

    // Mock getCurrentTime to return a fixed timestamp
    spyOn(service, 'getCurrentTime').and.returnValue('2024-12-10T10:00:00Z');
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should print current time', () => {
    expect(service.getCurrentTime()).toBe(`2024-12-10T10:00:00Z`)
  });


  it('should print log', () => {
    spyOn(console, 'log');
    service.log('Test log message', 'log');
    expect(console.log).toHaveBeenCalledWith(
      '[2024-12-10T10:00:00Z] [LOG]: Test log message'
    );
  });
  
});
