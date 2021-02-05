import { Component, OnInit } from '@angular/core';
import { ToastController, NavController, ActionSheetController, ModalController  } from '@ionic/angular';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(public toastController: ToastController,public navCtrl:NavController, private actionSheet: ActionSheetController, public modalController: ModalController) { }


  ngOnInit() {
  }
  navPage(page){
    this.navCtrl.navigateForward(page)
  }

}
