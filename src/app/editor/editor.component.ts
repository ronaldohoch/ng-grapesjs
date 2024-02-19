import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
//material design
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
//editor's const
import { blockManager, styleManager } from './editorConfig';
//pipes
import { SanitizePipe } from '../shared/pipes/sanitize.pipe';
import { PipeObjectKeysPipe } from '../shared/pipes/pipe-object-keys.pipe'
//services
import { UtilsService } from './services/utils.service';
//thirds
import { grapesjs, Editor, Block } from 'grapesjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [
    CommonModule,
    SanitizePipe,
    PipeObjectKeysPipe,
    MatRippleModule,
    MatExpansionModule,
    DragDropModule
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
  @ViewChild('blocksWrapper') blocksWrapper!: ElementRef;
  constructor(
    private utilSvc: UtilsService
  ) {

  }
  editor!: Editor;
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
      blockManager
    })

    this.editor.on('load', () => {
      console.log('editor loaded')
    })

    this.editor.on('block:custom', (props) => {
      this.editorCustomBlocks = props.blocks;
      this.editorCustomBlocksCategorys = this.utilSvc.groupByCategory(props.blocks);
      console.log(this.utilSvc.groupByCategory(props.blocks));
      this.editorCustomBlocksOnDragStart = function (block: any) {
        props.dragStart(block);
      };
      this.editorCustomBlocksOnDragStop = function (block: any) {
        props.dragStop(block);
      };
      props.container.append(this.blocksWrapper.nativeElement);
    });

    this.editor.on('style:custom', props => {
      console.log('props',props);
      // props.container (HTMLElement)
      //    The default element where you can append your
      //    custom UI in order to render it in the default position.

      // Here you would put the logic to render/update your UI by relying on Style Manager API
  });
  }


}
