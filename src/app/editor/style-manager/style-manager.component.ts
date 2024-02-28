import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material
import { MatExpansionModule } from '@angular/material/expansion';
//component
import { PropertyFieldsComponent } from './fields/property-fields/property-fields.component';
//Thirds
import { Editor, Property, Sector } from 'grapesjs';

@Component({
  selector: 'app-style-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    PropertyFieldsComponent
  ],
  templateUrl: './style-manager.component.html',
  styleUrl: './style-manager.component.scss'
})
export class StyleManagerComponent {
  @Input() Sectors!: Sector[];
  @Input() editor!:Editor;
}
