import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomePage {
currentIndex:any;
@ViewChild('slides', {static: false}) slides: IonSlides;
  constructor(public navCtrl:NavController) {}

  	onSlideChanged() {
  		this.slides.getActiveIndex().then(index => {
			if (index>2) {
		      this.currentIndex=2;
		    }
		    else{
		       this.currentIndex = index;
		    }
		});
	}
	skip(){
  		this.slides.slideTo(2, 500);
	}
	next() {
    	this.slides.slideNext();
  	}
	navPage(page){
		this.navCtrl.navigateForward(page)
	}

}
