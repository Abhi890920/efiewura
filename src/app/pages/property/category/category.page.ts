import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ActionSheetController, ModalController  } from '@ionic/angular';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(public toastController: ToastController,public navCtrl:NavController, private actionSheet: ActionSheetController, public modalController: ModalController) { }


  ngOnInit() {
  }

  navPage(page){
    this.navCtrl.navigateForward(page)
  }

}
