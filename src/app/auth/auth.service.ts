import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
//import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import { environment } from 'src/environments/environment.prod';

import { Locations } from '../landing-page/locations';
import { Categories } from '../landing-page/categories';
import { Leads } from '../main/lead';
import { Works } from '../main/work';
import { TenderItems } from '../main/tender/tenderItems';
import { KeyDeliverables } from '../main/components/keydeliverables/keyDeliverables';
import { TermsConditions } from '../main/components/termsandconditions/termsConditions';






@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers:Headers=new Headers;
  options:any;
  
  private API_URL= environment.API_URL;


  constructor(
    private http: HttpClient
  ) { }

  biws_generateOTP()
  {
    return this.http.get(this.API_URL+'/biws_generateOTP').pipe(map(response=>response[0]));
  }
  
  biws_SignUp(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_SignUp',data,this.options);
  }
  biws_sendOTP(otp, name)
  {
    var data = {param1:otp,param2 :name};
    return this.http.post(this.API_URL+'/biws_sendOTP',data,this.options);
  }
  biws_verifyOTP(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_verifyOTP',data,this.options);
  }
  biws_SignIn(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_SignIn',data,this.options);
  }
  
  getLocations()
  {
    
    return this.http.get<Locations[]>(this.API_URL+'/getLocations').pipe(map(response=>response["0"])); 
  }
  getCategory()
  {
    return this.http.get<Categories[]>(this.API_URL+'/biws_getCategory').pipe(map(response=>response["0"])); 
  }
  biws_addLead(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_addLead',data,this.options);
  }
  biws_AllLeadsByCust(id)
  {
    return this.http.get<Leads[]>(this.API_URL+'/biws_AllLeadsByCust/'+id).pipe(map(response=>response["0"]));
  }
  biws_getCustID(username)
  {
    return this.http.get(this.API_URL+'/biws_getCustID/'+username).pipe(map(response=>response["0"]));
  }
  biws_assocSignIn(values)
  {
    var data=JSON.stringify(values);
    return this.http.post(this.API_URL+'/biws_assocSignIn',data,this.options);
  }
  biws_getOneLead(id)
     {
      return this.http.get(this.API_URL+'/biws_getOneLead/'+id).pipe(map(response=>response["0"]));
     }
     biws_addWork(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_addWork",info,this.options);
     }
     biws_AssocWorks(aid)
     {
      return this.http.get<Works[]>(this.API_URL+'/biws_AssocWorks/'+aid).pipe(map(response=>response["0"]));
     }
     getSelectedTenderAssocs(id)
     {
      return this.http.get<Works[]>(this.API_URL+'/biws_getSelectedTenderAssocs/'+id).pipe(map(response=>response["0"]));
     }
     getSelectedTenderItems(id)
     {
      return this.http.get<TenderItems[]>(this.API_URL+'/biws_getSelectedTenderItems/'+id).pipe(map(response=>response["0"]));
     }
     getWorkKeys(id)
     {
      return this.http.get<KeyDeliverables[]>(this.API_URL+'/biws_getKeyDeliverables/'+id).pipe(map(response=>response["0"]));
     }
     getWorkTerms(id)
     {
      return this.http.get<TermsConditions[]>(this.API_URL+'/biws_getTerms/'+id).pipe(map(response=>response["0"])); 
     }
     sendLetterOfIntrest(id)
     {
      var data = {param1:id};
      return this.http.post(this.API_URL+'/sendLetterOfIntrest',data,this.options);
     }
     updateReqSiteVisit(aid, wid)
     {
var data={param1 : aid, param2 : wid};
return this.http.post(this.API_URL+'/biws_updateReqSiteVisit',data,this.options);
     }
     confirmAssoc(tid)
     {
       var data={param1: tid};
      return this.http.post(this.API_URL+'/biws_confirmAssoc',data,this.options);
     }
     rejectAssoc(tid)
     {
      var data={param1: tid};
      return this.http.post(this.API_URL+'/biws_rejectAssoc',data,this.options);
     }
     chkPaymentDone(id)
     {
      return this.http.get(this.API_URL+'/biws_chkPaymentDone/'+id).pipe(map(response=>response["0"])); 
    }
    biws_getAssocTender(aid, wid)
    {
      
      return this.http.get<Works[]>(this.API_URL+'/biws_getAssocTender/'+aid+'/'+wid).pipe(map(response=>response["0"]));
    }
biws_saveTenderRate(values)
{
  var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_saveRate",info,this.options);
}
getItemDetails(id)
{
  return this.http.get<TenderItems[]>(this.API_URL+'/biws_getItemDetails/'+id).pipe(map(response=>response["0"]));
}
chkWorkDaysExists(id)
{
  return this.http.get(this.API_URL+'/chkWorkDaysExists/'+id).pipe(map(response=>response["0"]));

}
save_workDays(values)
{
  var info=JSON.stringify(values);
      return this.http.post(this.API_URL+'/biws_saveWorkDays',info,this.options);
}
biws_pushBackToPMA(tid)
{
  var data={param1: tid};
  return this.http.post(this.API_URL+'/biws_pushBackToPMA',data,this.options);
}
biws_getWorkTenderDetails(id)
{
  return this.http.get<Leads[]>(this.API_URL+'/biws_getWorkTenderDetails/'+id).pipe(map(response=>response["0"]));
}
  
  errorHandler(error : HttpErrorResponse)
  {
    return Observable.throw(error.message || "Server Error");
    
  }
  
}
