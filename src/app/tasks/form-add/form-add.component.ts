import { Component, OnInit, AfterContentInit} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { AngularFireDatabase } from 'angularfire2/database';

declare var $: any;

@Component({
  selector: 'app-form-add',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-7%)', opacity: 0 }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-7%)', opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit, AfterContentInit {
  toogleAddVar = false;

  add_item_title: string;
  add_item_desc: string;
  add_item_pr = '―';
  add_item_date;
  isEmptyTest;
  buttonRemoveToggle: boolean;

  constructor(private db: AngularFireDatabase) {
    this.db.list('/items')
      .valueChanges()
      .subscribe(items => {
        if (items.length) {
          this.buttonRemoveToggle = false;
        } else {
          this.buttonRemoveToggle = true;
        }
      });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

  addItems(): void {
    const dt = new Date();
    const setCurrentDare = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} | ${dt.getHours()}:${dt.getMinutes()}`;
    this.db.list('/items').push({
      title: this.add_item_title,
      desc: this.add_item_desc,
      date: setCurrentDare,
      to_date: this.add_item_date || `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`,
      priority: this.add_item_pr,
      done: false
    });
    this.buttonRemoveToggle = true;
  }

  toogleAddItems(): void {
    setTimeout(() => {
      $('select').formSelect();
    }, 10);
    this.toogleAddVar = !this.toogleAddVar;
    this.add_item_title = this.add_item_desc = '';
  }

  selectPriority(event: any): void {
    this.add_item_pr = event.target.value;
  }
  removeItems(): void {
    this.db.list('/items').remove(null);
    this.buttonRemoveToggle = false;
  }
}
