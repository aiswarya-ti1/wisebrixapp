import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
  ) { 
    
  }

  getToken()
  {
    return localStorage.getItem('Token');
  }
  biws_createToken(user:any)
  {
    var userData="username="+user.username+"&password="+user.password+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_CreateToken',userData,{headers:reqHeader});
  }
  biws_createTokenCust(user:any)
  {
    var userData="username="+user.username+"&password="+user.password+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_createTokenCust',userData,{headers:reqHeader});
  }
  biws_SignIn(user:any)
  {
    var userData="username="+user.username+"&password="+user.password+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_SignIn',userData,{headers:reqHeader});
    
  }
  biws_generateOTP(phNo)
  {
    //var api_key='674b98a0-e5f6-11ea-9fa5-0200cd936042';
    return this.http.get(this.API_URL+'/biws_generateOTP').pipe(map(response=>response[0]));
    //return this.http.get('https://2factor.in/API/V1/674b98a0-e5f6-11ea-9fa5-0200cd936042/SMS/'+phNo+'/AUTOGEN/cust_temp');
  }
  verify_OTP(otpID, otpNo)
  {
    return this.http.get('https://2factor.in/API/V1/674b98a0-e5f6-11ea-9fa5-0200cd936042/SMS/VERIFY/'+otpID+'/'+otpNo);
  }
  
  biws_SignUp(user:any)
  {
    var userData="username="+user.userName+"&password="+user.pwd+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_SignUp',userData,{headers:reqHeader});
  }
  biws_updateAssociate(associd)
  {
    var data={param1:associd};
    return this.http.post(this.API_URL+'/biws_updateAssociate',data,this.options);
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
  
  biws_AssocSignUp(user:any)
  {
    var userData="username="+user.userName+"&password="+user.pwd+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_AssocSignUp',userData,{headers:reqHeader});
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
    return this.http.get<Leads[]>(this.API_URL+'/biws_AllLeadsByCust/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
  }
  biws_getCustID(username)
  {
    return this.http.get(this.API_URL+'/biws_getCustID/'+username+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
  }
  biws_getAssocID(username)
  {
    return this.http.get(this.API_URL+'/biws_getAssocID/'+username).pipe(map(response=>response["0"]));
  }
  biws_assocSignIn(user:any)
  {
    var userData="username="+user.username+"&password="+user.password+ "&grant_type=password";
    var reqHeader=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    //console.log('UserData'+userData);
    return this.http.post(this.API_URL+'/biws_assocSignIn',userData,{headers:reqHeader});
  }
  biws_getOneLead(id)
     {
      return this.http.get(this.API_URL+'/biws_getOneLead/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
     }
     biws_addWork(values)
     {
      var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_addWork",info,this.options);
     }
     biws_AssocWorks(aid)
     {
      return this.http.get<Works[]>(this.API_URL+'/biws_AssocWorks/'+aid+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
     }
     getSelectedTenderAssocs(id)
     {
      return this.http.get<Works[]>(this.API_URL+'/biws_getSelectedTenderAssocs/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
     }
     getSelectedTenderItems(id)
     {
      return this.http.get<TenderItems[]>(this.API_URL+'/biws_getSelectedTenderItems/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
     }
     getWorkKeys(id)
     {
      return this.http.get<KeyDeliverables[]>(this.API_URL+'/biws_getKeyDeliverables/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
     }
     getWorkTerms(id)
     {
      return this.http.get<TermsConditions[]>(this.API_URL+'/biws_getTerms/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"])); 
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
     rejectAssoc(tid, reason)
     {
       
      var data={param1: tid, param2 :reason} ;
      return this.http.post(this.API_URL+'/biws_rejectAssoc',data,this.options);
     }
     chkPaymentDone(id)
     {
      return this.http.get(this.API_URL+'/biws_chkPaymentDone/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"])); 
    }
    biws_getAssocTender(aid, wid)
    {
      
      return this.http.get<Works[]>(this.API_URL+'/biws_getAssocTender/'+aid+'/'+wid+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
    }
biws_saveTenderRate(values)
{
  var info=JSON.stringify(values);
      return this.http.post(this.API_URL+"/biws_saveRate",info,this.options);
}
getItemDetails(id)
{
  return this.http.get<TenderItems[]>(this.API_URL+'/biws_getItemDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
chkWorkDaysExists(id)
{
  return this.http.get(this.API_URL+'/chkWorkDaysExists/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));

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
  return this.http.get<Leads[]>(this.API_URL+'/biws_getWorkTenderDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
getWorkOrderDetails(id)
{
  return this.http.get(this.API_URL+'/biws_getWorkOrderDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
getCustDetails(id)
{
  return this.http.get(this.API_URL+'/biws_getCustDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));

}
getAssocDetails(id)
{
  return this.http.get(this.API_URL+'/biws_getAssocDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
getFinalTenderDetails(id)
{
  return this.http.get(this.API_URL+'/biws_getFinalTenderDetails/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
getWorkSchedule(id)
{
  return this.http.get(this.API_URL+'/biws_getWorkSchedule/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
getPaySchedule(id)
{
  return this.http.get(this.API_URL+'/biws_getPaySchedule/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
biws_addAssociate(values)
{
  var info=JSON.stringify(values);
  return this.http.post(this.API_URL+'/biws_addAssociate',info,this.options);
}
getTenderTotal(id)
{
  return this.http.get(this.API_URL+'/biws_getTenderTotal/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
chkQtyExists(id)
{
  return this.http.get(this.API_URL+'/biws_chkQtyExists/'+id+'?Token='+localStorage.getItem('token')).pipe(map(response=>response["0"]));
}
biws_saveAssoc(values)
{
  var info=JSON.stringify(values);
      return this.http.post(this.API_URL+'/biws_saveAssoc',info,this.options);
}
initializePayment(wid, amt, uid)
{
  var data={amount: amt,workid: wid, userid : uid} ;
      return this.http.post(this.API_URL+'/initializePayment',data,this.options);
}
confirmSignature(values)
{
  var data=JSON.stringify(values);
      return this.http.post(this.API_URL+'/completePayment',data,this.options);
}
  errorHandler(error : HttpErrorResponse)
  {
    return Observable.throw(error.message || "Server Error");
    
  }
  
}
