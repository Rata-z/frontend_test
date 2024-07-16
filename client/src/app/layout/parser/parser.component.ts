import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DataType } from '../../data.service';

@Component({
  selector: 'app-parser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parser.component.html',
  styleUrl: './parser.component.scss',
})
export class ParserComponent implements OnInit {
  jsonSubscription!: Subscription;
  visibleData: DataType[];
  constructor(private _dataObject: DataService) {
    this.visibleData = [];
  }

  ngOnInit() {
    this.jsonSubscription = this._dataObject.currentData$.subscribe(
      (data) => (this.visibleData = data)
    );
  }
  ngOnDestroy(): void {
    this.jsonSubscription.unsubscribe();
  }
}
