import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/customer/auth.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private router:Router, public authService : AuthService,
    public snackBar:MatSnackBar) {

    this.firstFormGroup = new FormGroup(
      {
        type : new FormControl(),
        plan :  new FormControl(),
        start : new FormControl(),
        area : new FormControl(),
        floor : new FormControl(),
  
       
      });
      this.secondFormGroup = new FormGroup(
        {
          custName :new FormControl(),
          email :new FormControl(),
          contact :new FormControl(),
          loc :new FormControl(),
    
         
        });
  }

  ngOnInit() {
    this.firstFormGroup.controls['type'].setValue(1);
    this.firstFormGroup = this._formBuilder.group({
     
      type : ['1', Validators.required],
      plan :['', Validators.required],
      start : ['', Validators.required],
      area : ['', Validators.required],
      floor : ['', Validators.required],
      
      
    });
    this.secondFormGroup = this._formBuilder.group({
    
      custName :['', Validators.required],
      email :[''],
      contact :['', Validators.required],
      loc :['', Validators.required],

    });
  }

back()
{
  
  this.router.navigate(['/landing-page']);
}

//Api to add lead from New Home category
getQuote(first_values:any, second_values:any)
{
  console.log("first"+first_values);
  //first_values.push(second_values);
  console.log("after"+second_values);
  var all_values={first_values, second_values};
  console.log(all_values);
  this.authService.biws_addLead(all_values).subscribe(result=>{console.log(result);
    if(result['Success']==true)
    {
      this.router.navigate(['otp/'+second_values['contact']]);
    }
    if(result['Success']==false)
    {
      alert('Something went wrong');
    }
  }),(error=>{console.log(error);
    this.openSnackBar(error.error.error,'OK');})
}
openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 2000,
  });
}

}
