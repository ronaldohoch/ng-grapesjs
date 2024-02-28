import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//material design
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

//editor's const
import { blockManager, styleManager, canvasCss } from './editorConfig';
//pipes
import { SanitizePipe } from '../shared/pipes/sanitize.pipe';
import { PipeObjectKeysPipe } from '../shared/pipes/pipe-object-keys.pipe'
//services
import { UtilsService } from './services/utils.service';
//thirds
import { grapesjs, Editor, Block, Sector, Property, PropertySelect, PropertyProps } from 'grapesjs';
//standalone components
import { StyleManagerComponent } from './style-manager/style-manager.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    SanitizePipe,
    PipeObjectKeysPipe,
    StyleManagerComponent,
    MatRippleModule, MatExpansionModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatRadioModule, MatSliderModule,
  ],
  providers: [
    SanitizePipe,
    PipeObjectKeysPipe,
    UtilsService
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit {
  editor!: Editor;
  @ViewChild('blocksWrapper') blocksWrapper!: ElementRef;
  constructor(
    private utilSvc: UtilsService,
    private renderer: Renderer2
    // private cdr: ChangeDetectorRef,
  ) {

  }

  editorCustomBlocks!: Array<Block>;
  editorCustomBlocksCategorys!: { [key: string]: any[] };
  editorCustomBlocksOnDragStart!: Function;
  editorCustomBlocksOnDragStop!: Function;
  ngOnInit(): void {

    this.editor = grapesjs.init({
      // Indicate where to init the editor. You can also pass an HTMLElement
      container: '#gjs',
      // Get the content for the canvas directly from the element
      // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
      fromElement: true,
      // Size of the editor
      height: '100%',
      width: 'auto',
      // Disable the storage manager for the moment
      storageManager: false,
      // Avoid any default panel
      // panels: { defaults: [] },
      styleManager,
      // panels,
      blockManager,
      canvasCss
    })
    //@ts-ignore
    window.editor = this.editor;

    this.editor.on('load', () => {
      this.editorLoad();
    })

    this.editor.on('block:custom', (props) => {
      this.editorBlockCustom(props);
    });

    this.editor.on('style:custom', props => {
      this.editorStyleCustom(props);
    });

    // Use this event to append your UI in the default container provided by GrapesJS.
    // You can skip this event if you don't rely on the core panels and decide to
    // place the UI in some other place.
    this.editor.on('layer:custom', (props) => {
      // props.container (HTMLElement) - The default element where you can append your UI
    });

    // Triggered when the root layer is changed.
    this.editor.on('layer:root', (root) => {
      // Update the root of your UI
    });

    // Triggered when a component is updated, this allows you to update specific layers.
    this.editor.on('layer:component', (component) => {
      // Update the specific layer of your UI
    });
  }

  editorLoad() {
    this.editor.StyleManager.addSector("Fundo", {
      name: "Novo Fundo",
      open: false,
      properties: [{
        name: 'Background color',
        property: 'container-background-color',
        type: 'color',
      }, {
        property: 'background-image',
        type: 'file',
        functionName:'url'
      }]
    });
  }

  editorBlockCustom(props: any): void {
    this.editorCustomBlocks = props.blocks;
    this.editorCustomBlocksCategorys = this.utilSvc.groupByCategory(props.blocks);
    console.log(this.utilSvc.groupByCategory(props.blocks));
    this.editorCustomBlocksOnDragStart = function (block: any) {
      props.dragStart(block);
    };
    this.editorCustomBlocksOnDragStop = function (block: any) {
      props.dragStop(block);
    };
    this.renderer.appendChild(props.container,this.blocksWrapper.nativeElement)
    // props.container.append(this.blocksWrapper.nativeElement);
  }

  editorCustomStyleManagerSectors!: Sector[];
  @ViewChild('styleManagerWrapper') styleManagerWrapper!: ElementRef;
  editorStyleCustom(props: any): void {
    this.editorCustomStyleManagerSectors = this.editor.StyleManager.getSectors({ visible: true });
    props.container.append(this.styleManagerWrapper.nativeElement);
    // this.cdr.detectChanges();

    // props.container (HTMLElement)
    //    The default element where you can append your
    //    custom UI in order to render it in the default position.

    // Here you would put the logic to render/update your UI by relying on Style Manager API
  }
}
