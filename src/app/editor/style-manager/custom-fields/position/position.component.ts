import { Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [
    MatButtonToggleModule,
  ],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent {
  @Input() prop:any;

  handleChange($event:any){
    this.prop.upValue($event.value);
  }
}
