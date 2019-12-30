import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesFormComponent } from './services-form.component';
import { configureTestSuite } from 'ng-bullet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('ServicesFormComponent', () => {
  let fixture: ComponentFixture<ServicesFormComponent>;
  let component: ServicesFormComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesFormComponent],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        FormsModule
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesFormComponent);
    component = fixture.componentInstance;
  });

  describe('when app initialized', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize service model to default value', () => {
      expect(component.service).toEqual(component.defaultValue);
    });
  });
});
