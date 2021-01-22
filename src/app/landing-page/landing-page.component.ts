import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Locations } from './locations';
import { Categories } from './categories';
import { AuthService } from '../customer/auth.service';


//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';



@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  
})
export class LandingPageComponent implements OnInit {


  registerForm: FormGroup;
  location :Locations[];
  category :Categories[];
  type :number=0;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor( private _formBuilder: FormBuilder, private authService :AuthService, private router:Router,
    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    this.registerForm = new FormGroup(
      {
        type: new FormControl(),
        plan: new FormControl(),
        start: new FormControl(),
        area: new FormControl(),
        floor: new FormControl(),
        category: new FormControl(),
        custName: new FormControl(),
        contact: new FormControl(),
        loc: new FormControl(),
        

      })
   }

   public onCardClick(value){
    if(value==1)
    {
      this.router.navigate(['new-home']);
    }
    else if(value==2)
    {
      this.router.navigate(['renovation']);
    }
    
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.registerForm = this._formBuilder.group({
    
      type: ['', Validators.required],
        plan: ['', Validators.required],
        start: ['', Validators.required],
        area: ['', Validators.required],
        floor: ['', Validators.required],
        category: ['', Validators.required],
        custName: ['', Validators.required],
        contact: ['', Validators.required],
        loc: ['', Validators.required],
  });
 this.getLocations();
 this.getRenoCategories();
  }
  onChange(event)
  {
    console.log(event);
    if(event==1)
    {
      this.type=1;
    }
    else if(event==2)
    {
      this.type=2;
    }
  }
  

  getLocations()
{ 
    this.authService.getLocations().subscribe(result=>{
      
      this.location=result;
    });     
}
getRenoCategories()
{
  this.authService.getCategory().subscribe(result=>{console.log(result);
    this.category=result;
  })
}
getFreeSpec(values)
{
  console.log(values);
  this.authService.biws_addLead(values).subscribe(result=>{console.log(result);
    if(result['Success']==true)
    {
      this.router.navigate(['otp/'+values['contact']]);
    }
    if(result['Success']==false)
    {
      alert('Something went wrong');
    }
  })
}
login()
{
  this.router.navigate(['login']);
}
}


