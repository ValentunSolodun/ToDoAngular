import { Component, OnInit, AfterContentInit} from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { AngularFireDatabase } from 'angularfire2/database';
import { ManipulateDataService } from '../../servise/manipulate-data.service';

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
  dataB;

  constructor(private db: AngularFireDatabase, private manipDate: ManipulateDataService) {
    this.dataB = db;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.manipDate.fnTest());
    }, 1000);
  }

  ngAfterContentInit() {}

  addItems() {
    const dt = new Date();
    this.dataB.list('/items').push().set({
      title: this.add_item_title,
      desc: this.add_item_desc,
      date: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} | ${dt.getHours()}:${dt.getMinutes()}`,
      to_date: this.add_item_date,
      priority: this.add_item_pr,
      done: false
    });
  }

  toogleAddItems() {
    setTimeout(() => {
      $('select').formSelect();
    }, 10);
    this.toogleAddVar = !this.toogleAddVar;
    this.add_item_title = this.add_item_desc = '';
  }

  selectPriority(event: any) {
    this.add_item_pr = event.target.value;
  }
  removeItems() {
    this.dataB.list('/items').remove(0);
  }
  validationsForms() {
    console.log('validations actions');
  }

}
