import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input('type') Type_ID : number;
  url:string;

  constructor() { }

  ngOnInit() {
    if(this.Type_ID==1)
    {
      //this.url="http://brickitwise.com/landing-page"
      var url = "http://brickitwise.com/landing-page";
var element = document.getElementById('url_id');
element.setAttribute("href",url)
    }
  }

}
