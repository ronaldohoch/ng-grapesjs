import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-field-number',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss'
})
export class NumberComponent {
  @Input() prop: any;
  @Input() labelCls!: Function;
  @ViewChild('componentInput') componentInputRef!: ElementRef;

  handleChange($event: any) {
    const value = ($event.target as HTMLInputElement).value;
    this.prop.upValue(value);
  }
  private mouseHoldInterval: any;

  handleMouseDown() {
    this.handlePlusEvent();
    this.mouseHoldInterval = setInterval(() => {
      this.handlePlusEvent();
    }, 100);
  }
  handleMouseUp() {
    clearInterval(this.mouseHoldInterval);
  }
  handlePlusEvent() {
    const value = this.componentInputRef.nativeElement.value;
    console.log('value',typeof value,value,isNaN(value));
    if(value=='auto'){
      this.prop.upValue(1);
    }else{
      if(isNaN(value)){
        return
      }
      this.prop.upValue((value*1)+1);
    }
  }
}
