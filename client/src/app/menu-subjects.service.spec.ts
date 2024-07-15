import { TestBed } from '@angular/core/testing';

import { MenuSubjectsService } from './menu-subjects.service';

describe('MenuSubjectsService', () => {
  let service: MenuSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
