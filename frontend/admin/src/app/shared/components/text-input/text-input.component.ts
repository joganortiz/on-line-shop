import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type Type = 'text' | 'email' | 'password';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true
    }
  ]
})
export class TextInputComponent implements OnInit, ControlValueAccessor  {
  @Input({ required: true }) id!: string;
  @Input({ required: false }) type: Type = "text";
  @Input({ required: false }) cssClass: string = "";
  @Input({ required: false}) title: string = "";
  @Input({ required: false }) placeholder: string = "";
  @Input({ required: false }) errorMsg: string = "";
  @Input({ required: false}) maxLength!: number;
  @Input({ required: false}) paste: boolean = true;
  
  value = "";
  onChangeFn = (_: any) => { };
  onTouchFn = () => { };
  isDisabled!: boolean;

  chancheText($event: any): void {
    if($event.target.value.length > this.maxLength) {
      $event.target.value = $event.target.value.slice(0,-1);
    }

    this.onTouchFn();
    this.onChangeFn($event.target.value);
  }

  onTouchInput():void {
    this.onTouchFn();
  }

  writeValue(value: string): void {
    if (value) {
      this.value= value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn; 
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  
}
