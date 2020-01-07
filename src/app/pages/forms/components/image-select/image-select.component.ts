import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  styleUrls: ['../../form-styles.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ImageSelectComponent, multi: true }
  ],
  template: `
    <span class="flex-row">
      <input
        #imageFile
        type="file"
        hidden="true"
        (change)="imageChange($event)"
        accept="image/*"
        [multiple]="multiple"/>
      <button mat-mini-fab [disabled]="disabled" type="button" (click)="imageFile.click()" id="imageBtn">
        <mat-icon>add_photo_alternate</mat-icon>
      </button>
      <label for="imageBtn">{{ selectedImage ? selectedImage.name : 'No Image Selected'}}</label>
    </span>`
})
export class ImageSelectComponent implements ControlValueAccessor {
  selectedImage: File;

  @Input() disabled = false;
  @Input() multiple = false; // select multiple files

  onChange = (file: File) => {};
  onTouched = () => {};

  constructor() { }

  writeValue(file: File): void {
    this.selectedImage = file;
    this.onChange(this.selectedImage);
  }

  registerOnChange(fn: (file: File) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  imageChange(event: any) {
    const selectedFiles: File[] = event.target.files;

    if (selectedFiles.length) {
      this.writeValue(selectedFiles[0]);
    }
  }
}
