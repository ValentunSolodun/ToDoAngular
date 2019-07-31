import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ManipulateDataService {

  dataB: AngularFireDatabase;
  isDateEmpty: boolean;

  fnTest() {
    this.dataB.list('/items')
    .valueChanges()
    .subscribe(items => {
      if (items.length) {
        return true;
      } else {
        return false;
      }
    });
  }

}
