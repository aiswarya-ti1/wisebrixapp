import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { AuthService } from 'src/app/customer/auth.service';
import { Categories } from '../categories';

  


@Component({
  selector: 'app-renovation',
  templateUrl: './renovation.component.html',
  styleUrls: ['./renovation.component.scss']
})
export class RenovationComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  defaultElevation = 2;
  raisedElevation = 8;
  category :Categories[];
  cat_ID:number;
  cat_name : string;
  filteredOptions: Observable<string[]>;

  
  cardSelected;
 

  name = 'Angular';

  select(cat,stepper: MatStepper) {
    this.cardSelected = cat;
    console.log(this.cardSelected);
    this.cat_ID=this.cardSelected.Enq_Cat_ID;
    this.cat_name=this.cardSelected.Cat_Name;
    this.secondFormGroup.controls['category'].setValue(this.cat_ID);
    stepper.next();
    
  }

  constructor(private _formBuilder: FormBuilder, public authService : AuthService, public router : Router,
    public snackBar:MatSnackBar) {
    
  }
  navigate(){
    console.log("clicked");
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      type : ['2', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      
     
      category :['', Validators.required],
      custName :['', Validators.required],
      email :['', Validators.required],
      contact :['', Validators.required],
      loc :['', Validators.required],

    });
    this.getRenoCategories();
  }
  getRenoCategories()
  {
    this.authService.getCategory().subscribe(result=>{console.log(result);
      this.category=result;
    }),(error=>{console.log(error);
      this.openSnackBar(error.error.error,'OK');})
  }
  back()
  {
    this.router.navigate(['landing-page']);
  }
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
  nextButton()
  {
    console.log('Buuton CLicked');
    alert('select any tile')
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
