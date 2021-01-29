import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpService } from '../../../HttpService/http.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DetailsPage implements OnInit {
propertyDetails={property_id:'',
property_category:'',
property_sub_category:'',
property_region:'',
property_city:'',
property_location:'',
property_title:'',
property_details:'',
property_cost_currency:'',
property_cost_value:'',
property_cost:'',
property_area:'',
prorperty_dimensions:'',
property_beds:'',
property_baths:'',
property_posted_by:'',
property_posted_by_contact:''}
property_id:any;
main_image:any;
property_images:any;
showspinner=false
user_type=localStorage.getItem('user_type')
  constructor(public httpService:HttpService,public navCtrl:NavController,public toastController: ToastController,public activatedRoute:ActivatedRoute,private socialSharing: SocialSharing) { }

  	ngOnInit() {
  		this.activatedRoute.queryParams.subscribe((res)=>{
  			if(res.id) {
  				this.property_id=res.id
  				this.getPropertyDetails('','normal')
  			}
  		})
  	}
  	navPop(){
  		this.navCtrl.pop()
  	}
  	getPropertyDetails(event,type){
  		this.showspinner=true
	  	let data={
	      "property_id":this.property_id
	  	}
	  	this.httpService.postData(JSON.stringify(data),'app_propertydata').subscribe((result)=>{
	      if(result['success']==1) {
	      	console.log(result)
	      	this.propertyDetails.property_id=result['response'].property_id
			this.propertyDetails.property_category=result['response'].property_category
			this.propertyDetails.property_sub_category=result['response'].property_sub_category
			this.propertyDetails.property_region=result['response'].property_region
			this.propertyDetails.property_city=result['response'].property_city
			this.propertyDetails.property_location=result['response'].property_location
			this.propertyDetails.property_title=result['response'].property_title
			this.propertyDetails.property_details=result['response'].property_details
			this.propertyDetails.property_cost_currency=result['response'].property_cost_currency
			this.propertyDetails.property_cost_value=result['response'].property_cost_value
			this.propertyDetails.property_cost=result['response'].property_cost
			this.propertyDetails.property_area=result['response'].property_area
			this.propertyDetails.prorperty_dimensions=result['response'].prorperty_dimensions
			this.propertyDetails.property_beds=result['response'].property_beds
			this.propertyDetails.property_baths=result['response'].property_baths
			this.propertyDetails.property_posted_by=result['response'].property_posted_by
			this.propertyDetails.property_posted_by_contact=result['response'].property_posted_by_contact
			this.main_image=result['response'].property_images.img1
			this.property_images=result['response'].property_images
			this.showspinner=false
			if(type=='pull') {
          		event.target.complete();
        	}
			//console.log(this.property_images.img1)
	        //this.propertyList=result['response']
	      }
	      else{
	      	this.showspinner=false
	        this.presentToast(result['error'])
	      }
	  	})
  	}
  	propertyLike(){
  		let data={
  			"user_id":(this.user_type=='2')?localStorage.getItem('agent_id'):localStorage.getItem('customer_id'),
  			"property_id":this.property_id,
  			"type_id":(this.user_type=='2')?1:2
  		}
  		this.httpService.postData(JSON.stringify(data),'app_addpropertylike').subscribe((result)=>{
  			if(result['success']==1) {
  				this.presentToast('Property added to favourites')
  			}
  			else{
  				this.presentToast(result['error'])
  			}
  		})
  	}
  	shareProperty(){
  		var subject=this.propertyDetails.property_title
	    var message=this.propertyDetails.property_details
	    var url=this.main_image
	    const strippedString = message.replace(/(<([^>]+)>)/gi, "");
	    console.log(strippedString)
	    this.socialSharing.share(strippedString,subject,null,url);
  	}
  	async presentToast(msg) {
	    const toast = await this.toastController.create({
	      message: msg,
	      duration: 2000
	    });
	    toast.present();
  	}

}
