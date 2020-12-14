import { TestBed } from '@angular/core/testing';

import { FileUploadServiceService } from './file-upload.service';

describe('FileUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileUploadServiceService = TestBed.get(FileUploadServiceService);
    expect(service).toBeTruthy();
  });
});
