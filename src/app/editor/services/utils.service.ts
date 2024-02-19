import { Injectable } from '@angular/core';
//thirds
import { Editor, Block } from 'grapesjs';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  groupByCategory(data: Block[]): { [key: string]: any[] } {
    const groupedData: { [key: string]: any[] } = {};

    data.forEach(item => {
      const categoryLabel: string = item.getCategoryLabel()

      if (!groupedData[categoryLabel]) {
        groupedData[categoryLabel] = [];
      }

      groupedData[categoryLabel].push(item);
    });

    return groupedData;
  }
}
