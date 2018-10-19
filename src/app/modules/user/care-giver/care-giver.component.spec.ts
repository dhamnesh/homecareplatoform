import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGiverComponent } from './care-giver.component';

describe('CareGiverComponent', () => {
  let component: CareGiverComponent;
  let fixture: ComponentFixture<CareGiverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareGiverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareGiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
