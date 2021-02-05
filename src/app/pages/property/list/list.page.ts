import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastController, NavController, ActionSheetController, ModalController  } from '@ionic/angular';
import { HttpService } from '../../../HttpService/http.service';
import { LoginModalPage } from '../../../modals/login-modal/login-modal.page';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListPage implements OnInit {

  propertyList:any;
  lastID:any;
  showspinner=false

  constructor(public httpService:HttpService,public toastController: ToastController,public navCtrl:NavController, private actionSheet: ActionSheetController, public modalController: ModalController) { }



  ngOnInit() {
    this.getProperty('','normal');
    this.openModal()
  }
  navPage(page){
    this.navCtrl.navigateForward(page)
  }
  navDetails(id){
    this.navCtrl.navigateForward('details',{queryParams:{id:id}})
  }
  getProperty(event,type){
    this.showspinner=true
  	let data={
      "start":"0",
      "length":"17"
  	}
  	this.httpService.postData(JSON.stringify(data),'app_propertiesdata').subscribe((result)=>{
      if(result['success']==1) {
        this.propertyList=result['response']
        this.showspinner=false
        this.lastID=17
        if(type=='pull') {
          event.target.complete();
        }
      }
      else{
        this.showspinner=false
        this.presentToast(result['error'])
      }
  	})
  }
  loadData(event){
    this.showspinner=true
    let data={
      "start":this.lastID,
      "length":"17"
    }
    this.httpService.postData(JSON.stringify(data),'app_propertiesdata').subscribe((result)=>{
      if(result['success']==1) {
        var arr =result['response'];
        this.showspinner=false
        event.target.complete();
        if(arr.length>0) {
          this.propertyList=this.propertyList.concat(arr);
        }
        this.lastID=this.lastID+17
        
      }
      else{
        this.showspinner=false
        this.presentToast(result['error'])
      }
    })
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: LoginModalPage,
      cssClass: 'logRegModal',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      componentProps: { }
    });

    modal.onDidDismiss().then(() => {
     
    });

    return await modal.present();
  }


}
