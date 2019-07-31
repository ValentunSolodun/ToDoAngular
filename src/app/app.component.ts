import { Component, AfterContentInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
 ngAfterContentInit() {
  $(document).ready(function() {
    $('.tabs').tabs();
  });
 }
}
