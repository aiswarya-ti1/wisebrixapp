import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { WbtableDataSource } from './wbtable-datasource';

@Component({
  selector: 'app-wbtable',
  templateUrl: './wbtable.component.html',
  styleUrls: ['./wbtable.component.css']
})
export class WbtableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: WbtableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngAfterViewInit() {
    this.dataSource = new WbtableDataSource(this.paginator, this.sort);
  }
}
