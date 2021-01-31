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
totalIndex:any;
showspinner = true;
flashPage = true;


ngAfterContentInit() {
	this.showspinner=false
}

@ViewChild('slides', {static: false}) slides: IonSlides;
  constructor(public navCtrl:NavController) {}


	slidesDidLoad() {
		// console.log('slidesdidload');
		//this.slides.startAutoplay();
		this.currentIndex = 0;

		setTimeout(() => {
			this.flashPage = false
		}, 3000);

		
	}

  	onSlideChanged() { 
		this.slides.getActiveIndex().then(index => {
			if (index>3) {
		      this.currentIndex=3;
		    }
		    else{
		       this.currentIndex = index;
		    }
		});
	}


	skip(){
  		this.slides.slideTo(3, 500);
	}
	next() {
    	this.slides.slideNext();
	}
	prev() {
    	this.slides.slidePrev();
  	}
	  
	navPage(page){
		this.navCtrl.navigateForward(page)
	}

}
