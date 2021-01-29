import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpService } from '../../../HttpService/http.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProfilePage implements OnInit {
userData={user_id:'',lang_code:'',miles:'',helper_status:''}
userDetails={name:'',user_name:'',email:'',phone:'',image:''};
PhoneCode:any;
phone_code:any;
client_id:any;
code:any;
state:any;
country_code:any;
image:any;
user_type:any='2';
showspinner=false
  constructor(public httpService:HttpService,public toastController: ToastController,public navCtrl:NavController) { }

  	ngOnInit() {
  		this.getProfileData('','normal')
  	}
  	navPop(){
  		this.navCtrl.pop()
  	}
  	navPage(page){
  		this.navCtrl.navigateForward(page)
  	}
  	getProfileData(event,type){
      this.showspinner=true
	  	let data={
	  		"user_id":(this.user_type=='2')?localStorage.getItem('agent_id'):localStorage.getItem('customer_id')
	  	}
	  	var url=this.user_type=='2'?'app_agent_profiledata':'app_customer_profiledata'
	  	this.httpService.postData(JSON.stringify(data),url).subscribe((result)=>{
	      if(result['success']==1) {
	      	this.userDetails.name=result['response'].name
	      	this.userDetails.user_name=result['response'].username
	      	this.userDetails.email=result['response'].email
	      	this.userDetails.phone=result['response'].phone
          this.showspinner=false
          if(type=='pull') {
            event.target.complete();
          }
	        //console.log(result)
	      }
	      else{
          this.showspinner=false
	        this.presentToast(result['error'])
	      }
	  	})
  	}
  	updateProfile(){
      this.showspinner=true
  		let data=
  		{
  			"category_type":this.user_type,
  			"user_type":this.user_type,
  			"profile_name":this.userDetails.name,
  			"user_name":this.userDetails.user_name,
  			"user_password":"",
  			"user_email":this.userDetails.email,
  			"user_phone":this.userDetails.phone,
  			"user_id":(this.user_type=='2')?localStorage.getItem('agent_id'):localStorage.getItem('customer_id')
  		}
  		//var url=this.user_type=='1'?'app_agent_profiledata':'app_customer_profiledata'
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
    logout(){
      localStorage.clear();
      this.navCtrl.navigateRoot('home')
    }
  	async presentToast(msg) {
	    const toast = await this.toastController.create({
	      message: msg,
	      duration: 2000
	    });
	    toast.present();
  	}

}
