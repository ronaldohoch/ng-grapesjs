import { Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-float',
  standalone: true,
  imports: [
    MatButtonToggleModule,
  ],
  templateUrl: './float.component.html',
  styleUrl: './float.component.scss'
})
export class FloatComponent {
  @Input() prop: any;

  handleChange($event:any){
    this.prop.upValue($event.value);
  }
}
