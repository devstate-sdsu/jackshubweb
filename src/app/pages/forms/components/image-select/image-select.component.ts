import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['../../form-styles.css', './image-select.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ImageSelectComponent, multi: true }
  ]
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

  registerOnChange(fn: any): void {
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
