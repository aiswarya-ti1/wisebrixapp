import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent  {

  title = 'ngSlick';
  scrHeight:any;
  scrWidth:any;
  slidestoShow:any;


  slides = ['1a', '2a', '3a', '4a', '5b', '6c', '7c', '8c','9c'];
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
   this.scrHeight = window.innerHeight;
   this.scrWidth = window.innerWidth;
   console.log(this.scrHeight, this.scrWidth);
   if(this.scrWidth>=900){
    this.slidestoShow=9;
    console.log('slide to show'+this.slidestoShow);
    console.log('slides no'+this.slidestoShow);
    this.slideConfig.slidesToShow==this.slidestoShow;
    }
    if(this.scrWidth>=600 && this.scrWidth<900){
    this.slidestoShow=6;
    console.log('screen width'+this.scrWidth);
    console.log('slides no'+this.slidestoShow);
    this.slideConfig.slidesToShow==this.slidestoShow;
    }
    if(this.scrWidth<600){
      this.slidestoShow=3;
      console.log('screen width'+this.scrWidth);
      console.log('slides no'+this.slidestoShow);
      this.slideConfig.slidesToShow=this.slidestoShow;
      }
      
    
  }

  slideConfig = {
    "slidesToShow": 9,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
    /*'responsive': [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 9,
          slidesToScroll:1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
          slidesToScroll:1,
          "nextArrow": "<div class='nav-btn next-slide'></div>",
          "prevArrow": "<div class='nav-btn prev-slide'></div>",
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll:1,
          "nextArrow": "<div class='nav-btn next-slide'></div>",
          "prevArrow": "<div class='nav-btn prev-slide'></div>",
        }
      }
    ]*/

  };

 /* addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }*/

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

constructor(){
  this.getScreenSize();

}




}
