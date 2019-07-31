import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-tasks',
  animations: [
    trigger('animFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterContentInit {
  list: any[];
  keys: any[];
  dataB;
  loader = true;
  showList;
  showEmptyLabel;
  constructor(db: AngularFireDatabase) {
    this.dataB = db;
    this.dataB.list('/items')
      .valueChanges()
      .subscribe(items => {
        if (items.length) {
          this.list = items;
          this.showEmptyLabel = false;
        } else {
          this.list = null;
          this.showEmptyLabel = true;
          this.showList = false;
        }
        this.loader = false;
        this.showList = true;
      });

    this.dataB.list('/items')
      .snapshotChanges()
      .subscribe(kode => {
        this.keys = kode;
      });
  }

  ngOnInit() { }

  ngAfterContentInit() {
    console.log('Tasks list ready:)');
    console.log(this.dataB.list('/items'));
  }

  showFullTitle(target: HTMLDivElement) {
    target.style.cssText = `
     overflow-y: visible;
     height: auto;
    `;
  }

  updateDone(data: string, check: HTMLInputElement) {
    setTimeout(() => {
      this.dataB.list('/items').update(data, {
        done: check.checked
      });
    }, 300);
  }

  removeItems(data: string) {
    this.dataB.list('/items').remove(data);
    console.log(this.list);
  }

}
