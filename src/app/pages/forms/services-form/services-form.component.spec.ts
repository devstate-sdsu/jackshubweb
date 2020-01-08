import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ServicesFormComponent } from './services-form.component';
import { configureTestSuite } from 'ng-bullet';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatIconModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageSelectComponent } from '../components/image-select/image-select.component';
import { DebugElement } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { By } from '@angular/platform-browser';
import { mockService, mockImageFile, HomeStubComponent, ServicesServiceStub } from 'src/app/models/testing.model.spec';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HoursSelectComponent } from '../components/hours-select/hours-select.component';

describe('ServicesFormComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ServicesFormComponent,
        ImageSelectComponent,
        HoursSelectComponent,
        HomeStubComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{ path: '', component: HomeStubComponent }])
      ],
      providers: [
        {
          provide: ServicesService,
          useValue: ServicesServiceStub
        }
      ]
    });
  });

  let fixture: ComponentFixture<ServicesFormComponent>;
  let component: ServicesFormComponent;

  let servicesService: ServicesService;
  let router: Router;

  let navigateSpy: jasmine.Spy;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesFormComponent);
    component = fixture.componentInstance;

    servicesService = TestBed.get(ServicesService);
    router = TestBed.get(Router);

    navigateSpy = spyOn(router, 'navigate');
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

  describe('when form submitted', () => {
    let addServiceSpy: jasmine.Spy;

    let submitSpy: jasmine.Spy;
    let submitButton: DebugElement;

    let serviceForm: DebugElement;
    let ngForm: NgForm;

    beforeEach(async(() => {
      addServiceSpy = spyOn(servicesService, 'addService').and.callThrough();
      submitButton = fixture.debugElement.query(By.css('button[type=submit]'));

      serviceForm = fixture.debugElement.query(By.css('form'));
      ngForm = serviceForm.injector.get(NgForm);

      component.service = mockService;
      component.selectedImage = mockImageFile;
      component.submit({ valid: true } as any);

      submitSpy = spyOn(component, 'submit').and.callThrough();
    }));

    it('should call submit when ngSubmit event emits', () => {
      serviceForm.triggerEventHandler('ngSubmit', null);
      expect(submitSpy).toHaveBeenCalledWith(ngForm);
    });

    it('should call submit when submit button clicked', () => {
      submitButton.nativeElement.click();
      expect(submitSpy).toHaveBeenCalledWith(ngForm);
    });

    it('should call addService', () => {
      expect(addServiceSpy).toHaveBeenCalledWith(mockService, mockImageFile);
    });

    it('it should navigate to home page after service added', () => {
      expect(addServiceSpy).toHaveBeenCalledBefore(navigateSpy);
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  });
});
