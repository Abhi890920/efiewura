import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController,  NavController, ActionSheetController,  NavParams } from '@ionic/angular';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  modalTitle: string;
  modelId: number;

  constructor(
    toastController: ToastController,
    public navCtrl:NavController, 
    private actionSheet: ActionSheetController,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }

  navPage(page){
    this.navCtrl.navigateForward(page);
    this.closeModal()
  }
  navDetails(id){
    this.navCtrl.navigateForward('details',{queryParams:{id:id}})
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

}
