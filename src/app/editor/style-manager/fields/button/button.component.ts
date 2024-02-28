import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
//thirds
import { Editor } from 'grapesjs';
//material
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-field-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButton
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() prop:any;
  @Input() labelCls!:Function;
  @Input() editor!: Editor;

  openAssets(prop: any) {
    const { Assets } = this.editor;
    Assets.open({
      select: (asset, complete) => {
        console.log("select", prop, asset, complete);
        prop.upValue(asset.getSrc());
        complete && Assets.close();
      },
      types: ['image'],
      accept: 'image/*',
    })
  }
}
