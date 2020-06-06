import { Component, OnInit } from '@angular/core';
import { KeyDeliverables } from './keyDeliverables';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../../globalConstants';

@Component({
  selector: 'app-keydeliverables',
  templateUrl: './keydeliverables.component.html',
  styleUrls: ['./keydeliverables.component.scss']
})
export class KeydeliverablesComponent implements OnInit {
  
  keys : KeyDeliverables[];
   Work_ID : number;

  constructor(private breakpointObserver: BreakpointObserver,private authService :AuthService,
    private activatedRoute : ActivatedRoute, private g :GlobalConstants) { }

  ngOnInit() {
    this.Work_ID=this.g.Work_ID;
    this.getKeyDeliverables(this.Work_ID);
    
  }
  getKeyDeliverables(id)
  {
    this.authService.getWorkKeys(id).subscribe(result=>{console.log(result);
      this.keys=result;
    })
  }

}
