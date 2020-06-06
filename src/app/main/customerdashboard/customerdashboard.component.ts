import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LocalStorageService } from 'ngx-webstorage';
import { GlobalConstants } from '../globalConstants';
import { Leads } from '../lead';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent {
  dataSource;
 displayedColumns =['descr','status','loc'];
 Cust_ID : number;
 CustName : string;
 lead :Leads[];
 
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Enquiries', cols: 1, rows: 1 , id :1},
          { title: 'Card 2', cols: 1, rows: 1 , id :2},
          { title: 'Card 3', cols: 1, rows: 1 , id :3},
          { title: 'Card 4', cols: 1, rows: 1 , id :4}
        ];
      }

      return [
        { title: 'Enquiries', cols: 2, rows: 1 , id :1},
        { title: 'Card 2', cols: 1, rows: 1 , id :2},
        { title: 'Card 3', cols: 1, rows: 2 , id :3},
        { title: 'Card 4', cols: 1, rows: 1 , id :4}
      ];
    })
  );

  
  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,private storage:LocalStorageService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants) {}
    ngOnInit() {
     this.Cust_ID=this.storage.retrieve('CustID');
     this.CustName=this.storage.retrieve('CustName');
      this.getAllLeads();
      this.getWorkTenderDetails();
      console.log('First Tab');
      this.g.Work_ID=0;
      
      console.log('Work_ID' +this.g.Work_ID);
      
   
    }
    getAllLeads()
    {
      this.authService.biws_AllLeadsByCust(this.Cust_ID).subscribe(result=>{console.log(result);
        this.dataSource=result;
        

      })
    }
    getWorkTenderDetails()
    {
      this.authService.biws_getWorkTenderDetails(this.Cust_ID).subscribe(result=>{console.log(result);
        this.lead=result;
      })
    
    }
    viewTender(wid)
    {
     this.g.Work_ID=wid;   
     //this.Work_ID=wid;
     //this.siteFlagEvent.emit(this.g.Work_ID);
     //console.log('Work_ID'+this.g.Work_ID)
          
    }
  }
    
