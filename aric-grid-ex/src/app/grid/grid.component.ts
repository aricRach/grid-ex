import { Component, Input } from '@angular/core';
import { DataModel } from '../models/data.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  @Input() boxes: DataModel[] | undefined;
}
