import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpService } from '../../../HttpService/http.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddPage implements OnInit {
subcatgory=[]
Category=[]
category_id:any;
subcatgory_id:any;
Periods=[]
period:any;
advanceType=[]
title:any;
beds:any;
baths:any;
area:any;
currency:any;
CurrencyList:any;
rent_advance:any;
rent_advance_type:any;
details:any;
price:any;
RegionList=[]
CityList=[]
region_id:any;
city_id:any;
location:any;
propertyImages=[]
imageNames=[]
showspinner=false
  constructor(public httpService:HttpService,public toastController: ToastController,public navCtrl:NavController) { }

  	ngOnInit() {
  	}
  	ionViewWillEnter(){
  		this.getCurrency()
		this.getCategory()
		this.getRegions()
  	}
  	navPop(){
  		this.navCtrl.pop()
  	}
  	addProperty(){
  		this.showspinner=true
	  	let data={
	  		"agent_id":localStorage.getItem('agent_id'),
	  		"title":this.title,
	  		"details":this.details,
	  		"currency":this.currency,
	  		"price":this.price,
	  		"property_title":this.title,
	  		"category_id":this.category_id,
	  		"subcategory_id":this.subcatgory_id,
	  		"region_id":this.region_id,
	  		"city_id":this.city_id,
	  		"location":this.location,
	  		"beds":this.beds,
	  		"baths":this.baths,
	  		"area":this.area,
	  		"period":this.period,
			"rent_advance":this.rent_advance,
			"rent_advance_type":this.rent_advance_type,
			"images":this.propertyImages
		}
		this.httpService.postData(JSON.stringify(data),'app_addpropertydata').subscribe((result)=>{
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
  	onFileChange(event) {
	    var name=[];
	    var newname:any;
	    var fileData:any;
	    var that=this;
	    if (event.target.files && event.target.files.length > 0) {
	      fileData = event.target.files;
	      //console.log(fileData)
	      for (let i = 0; i < fileData.length; i++) {
	      	this.imageNames.push(fileData[i].name)
	      	let reader = new FileReader(); 
	        reader.readAsDataURL(fileData[i]);
	        reader.onload = () => {
	        console.log(JSON.stringify(reader.result))
	          that.propertyImages.push(reader.result);
	        };
	      }
	      console.log(this.propertyImages)
    	}
  	}
  	getCurrency(){
  		this.httpService.getData('app_currencies').subscribe((result)=>{
	      if(result['success']==1) {
	      	this.CurrencyList=result['response']
	      }
	      else{
	      	this.showspinner=false
	        this.presentToast(result['error'])
	      }
	  	})
  	}
  	getCategory(){
  		this.httpService.getData('app_propertycategories').subscribe((result)=>{
	      if(result['success']==1) {
	      	this.Category=result['response']
	      }
	      else{
	      	this.showspinner=false
	        this.presentToast(result['error'])
	      }
	  	})
  	}
  	getSubCategory(event){
  		console.log(event)
  		this.httpService.getData('app_propertysubcategories/'+event).subscribe((result)=>{
	      if(result['success']==1) {
	      	this.subcatgory=result['response']
	      }
	      else{
	      	this.showspinner=false
	        this.presentToast(result['error'])
	      }
	  	})
  	}
  	getRegions(){
  		this.httpService.getData('app_region').subscribe((result)=>{
	      if(result['success']==1) {
	      	this.advanceType=result.property_advance_types
	      	this.RegionList=result.region
	      	this.CityList=result.region_city
	      	this.Periods=result.property_periods
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

}
