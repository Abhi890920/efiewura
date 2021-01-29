import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpService } from '../../../HttpService/http.service';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.page.html',
  styleUrls: ['./signin-signup.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SigninSignupPage implements OnInit {
segment_value='signin';
header_title='Signin';
user_type='2';
email:any;
password:any;
user_name:any;
profile_name:any;
contact:any;
showspinner=false;
firebaseId:any;
  constructor(public httpService:HttpService,public toastController: ToastController,public navCtrl:NavController,private push: Push) { }

  ngOnInit() {
    this.setUpPushNotification()
  }
  connectMethod(type){
    this.user_type=type
  }
  navPop(){
    this.navCtrl.pop()
  }
  segmentChange(value){
  	this.segment_value=value
  	this.header_title=(value=='signin')?'Signin':'Signup'
  }
  signinFun(){
    this.showspinner=true
    let data={
      "user_name":this.email,
      "user_password":this.password,
      "user_type":this.user_type
    }
    if(this.user_type=='3') {
      data['registration_id']=this.firebaseId
    }
    var url=(this.user_type=='2')?'app_login':'app_customer_login'
    this.httpService.postData(JSON.stringify(data),url).subscribe((result)=>{
      if(result['success']==1) {
        if(this.user_type=='2') {
          localStorage.setItem('user_type',this.user_type)
          localStorage.setItem('agent_id',result['response'].agent_id)
          localStorage.setItem('agent_name',result['response'].agent_name)
          localStorage.setItem('agent_phone',result['response'].agent_phone)
          localStorage.setItem('agent_email',result['response'].agent_email)
          localStorage.setItem('agent_image',result['response'].agent_image)
          this.showspinner=false
          this.navCtrl.navigateRoot('list')
        }
        else{
          localStorage.setItem('user_type',this.user_type)
          localStorage.setItem('customer_id',result['response'].customer_id)
          localStorage.setItem('customer_name',result['response'].customer_name)
          localStorage.setItem('customer_phone',result['response'].customer_phone)
          localStorage.setItem('customer_email',result['response'].customer_email)
          localStorage.setItem('customer_image',result['response'].customer_image)
          this.showspinner=false
          this.navCtrl.navigateRoot('list')
        }
        
      }
      else{
        this.showspinner=false
        this.presentToast(result['error'])
      }
    })
  }
  signupFun(){
    this.showspinner=true
    let data={
      "category_type":this.user_type,
      "user_type":this.user_type,
      "profile_name":this.profile_name,
      "user_name":this.user_name,
      "user_password":this.password,
      "user_email":this.email,
      "user_phone":this.contact
    }
    this.httpService.postData(JSON.stringify(data),'app_register').subscribe((result)=>{
      if(result['success']==1) {
        this.showspinner=false
        this.presentToast(result['response'])
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
      duration: 2000,
      position:'top'
    });
    toast.present();
  }
  setUpPushNotification(){
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
    });
    const options: PushOptions = {
      android: {
        senderID:'887275935218',
        //icon:'icon',
        sound:true,
        vibrate:true,
        forceShow:true
      }
    }

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => {
      this.firebaseId=registration.registrationId
      console.log('Device registered', registration)
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

}
