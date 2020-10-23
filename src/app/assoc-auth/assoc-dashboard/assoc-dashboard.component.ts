import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalConstants } from 'src/app/main/globalConstants';

//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';



@Component({
  selector: 'assoc-dashboard',
  templateUrl: './assoc-dashboard.component.html',
  styleUrls: ['./assoc-dashboard.component.scss']
})
export class AssocDashboardComponent implements OnInit {

 dataSource;
 displayedColumns =['descr','status','loc'];
 Assoc_ID : number;
 AssocName : string;

  constructor( private _formBuilder: FormBuilder, private router:Router, private authService :AuthService,
    private activatedRoute : ActivatedRoute,private storage:LocalStorageService, private g:GlobalConstants

    //@Inject(LOCAL_STORAGE) public local: LocalStorageService, public session: SessionStorageService
    ) {
    
   }

  ngOnInit() {
    
      this.Assoc_ID=this.storage.retrieve('AssocID');
     
      //console.log(this.Assoc_ID);
    
    this.getAssocWorks();
    this.g.Work_ID=0;
 
  }
  getAssocWorks()
  {
   this.authService.biws_AssocWorks(this.Assoc_ID).subscribe(result=>{console.log(result);
    if(result.length==0)
    {
      this.AssocName=" ";
    }
    else{
      this.AssocName=result[0]['Assoc_FirstName']+' '+result[0]['Assoc_MiddleName']+''+result[0]['Assoc_LastName'];
      this.dataSource=result;
    }
    
    })
  }
  viewTender(wid)
  {
    this.g.Work_ID=wid;
    this.g.index=2;

  }
 
}
