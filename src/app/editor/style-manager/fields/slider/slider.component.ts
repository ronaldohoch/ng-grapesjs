import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import { MatSliderModule } from '@angular/material/slider';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-field-slider',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule, MatLabel
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;

  handleChange($event: any) {
    const value = ($event.target as HTMLInputElement).value;
    this.prop.upValue(value);
  }
  // [displayWith]="sliderDisplayWith"
  // TODO: cada slider pode ter uma função displayWith diferente, exemplo: opacidade deve mostrar 65 ao invés de 0.65
  sliderDisplayWith(value: number): string {
    console.log(value)
    return `${value}`;
  }
}
