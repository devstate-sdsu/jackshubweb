import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageSelectComponent } from './image-select.component';
import { configureTestSuite } from 'ng-bullet';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { mockImageFile } from 'src/app/models/testing.model.spec';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ImageSelectComponent', () => {
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageSelectComponent
      ],
      imports: [
        MatButtonModule,
        MatIconModule
      ]
    });
  });

  let fixture: ComponentFixture<ImageSelectComponent>;
  let component: ImageSelectComponent;

  let imageInput: DebugElement;
  let imageButton: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    imageInput = fixture.debugElement.query(By.css('input'));
    imageButton = fixture.debugElement.query(By.directive(MatButton));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only allow image file types', () => {
    expect(imageInput.nativeElement.accept).toContain('image');
  });

  it('multiple should allow multiple files', () => {
    component.multiple = true;
    fixture.detectChanges();
    expect(imageInput.nativeElement.multiple).toBe(true);
  });

  it('disabled should disable the button', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(imageButton.nativeElement.disabled).toBe(true);
  });

  describe('writeValue', () => {
    let onChangeSpy: jasmine.Spy;

    beforeEach(() => {
      onChangeSpy = spyOn(component, 'onChange');
      component.writeValue(mockImageFile);
    });

    it('should set selectedImage', () => {
      expect(component.selectedImage).toEqual(mockImageFile);
    });

    it('should call onChange with selectedImage', () => {
      expect(onChangeSpy).toHaveBeenCalledWith(component.selectedImage);
    });
  });

  describe('registerOnChange and registerOnTouched', () => {
    const mockFn = () => {};

    beforeEach(() => {
      component.registerOnChange(mockFn);
      component.registerOnTouched(mockFn);
    });

    it('should set onChange to passed in fn', () => {
      expect(component.onChange).toEqual(mockFn);
    });

    it('should set onChange to passed in fn', () => {
      expect(component.onTouched).toEqual(mockFn);
    });
  });

  describe('setDisabledState', () => {
    beforeEach(() => {
      component.setDisabledState(true);
    });

    it('should set disabled', () => {
      expect(component.disabled).toBe(true);
    });
  });

  describe('when image selected', () => {
    const mockImageChangeEvent = {
      target: {
        files: [mockImageFile]
      }
    };

    let writeValueSpy: jasmine.Spy;
    let imageChangeSpy: jasmine.Spy;

    beforeEach(() => {
      writeValueSpy = spyOn(component, 'writeValue');

      component.imageChange(mockImageChangeEvent);
      fixture.detectChanges();

      imageChangeSpy = spyOn(component, 'imageChange').and.callThrough();
    });

    it('should call imageChange when change event emits', () => {
      imageInput.triggerEventHandler('change', mockImageChangeEvent);
      expect(imageChangeSpy).toHaveBeenCalledWith(mockImageChangeEvent);
    });

    it('should call writeValue with event file', () => {
      expect(writeValueSpy).toHaveBeenCalledWith(mockImageChangeEvent.target.files[0]);
    });
  });
});
