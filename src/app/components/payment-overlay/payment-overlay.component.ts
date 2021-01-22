import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, NgZone, ViewChild, Output, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/customer/auth.service';
import { GlobalConstants } from 'src/app/customer/cust-main/globalConstants';
import { WindowRefService } from 'src/app/window-ref.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SingleInputDialogComponent } from '../single-input-dialog/single-input-dialog.component';







declare var Razorpay: any; 


@Component({
  selector: 'app-payment-overlay',
  templateUrl: './payment-overlay.component.html',
  styleUrls: ['./payment-overlay.component.scss'],
  providers: [WindowRefService]
})
export class PaymentOverlayComponent {
 
  Work_ID : number;
  amount : number=100;
  order_id : string;
  hiddenForm : FormGroup;
  user_id : number;
  pay_id : number;
  CustName : string;
  Contact:string;
  email : string;
  Contact_ID:number;
  dialogRef_Email :MatDialogRef<SingleInputDialogComponent>;
  
  
    
  constructor(private winRef: WindowRefService, private authService:AuthService, public dialog:MatDialog,
    private g:GlobalConstants,public snackBar: MatSnackBar, private router:Router,private zone: NgZone,
    //private tender: TenderComponent,
    private storage:LocalStorageService,
    public dialogRef: MatDialogRef<PaymentOverlayComponent>){
    this.hiddenForm = new FormGroup(
      {
        o_id: new FormControl(),
        p_id : new FormControl(),
        sign : new FormControl(),
        h_id : new FormControl(),
        w_id: new FormControl(),
       
  
       
      });
  }
  ngOnInit()
  {
this.user_id=this.storage.retrieve('UserID');
console.log(this.user_id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getUserDetails()
  {
    this.authService.getUserDetails(this.user_id).subscribe(result=>{console.log(result);
      this.CustName=result[0]['Cust_FirstName'];
      this.Contact=result[0]['Contact_phone'];
      this.email=result[0]['Contact_email'];
      this.Contact_ID=result[0]['Contact_ID'];
    })
  }
  closeDialog()
  {
   this.dialogRef.close();
   
  }

  initPay() {
    //console.log(data);
    if(this.email=='')
    {
      this.dialogRef_Email = this.dialog.open(SingleInputDialogComponent, {
     
        data      : {
        
        title :'Enter Email',
        msg : 'Please enter your Email ID to proceed',
      type :3,
      contact:this.Contact_ID
      
          
        }
    });
  
    this.dialogRef_Email.afterClosed()
    .subscribe(response=> {console.log(response.data);
         
        if ( response.data =='true' )
        {
           
          this.authService.initializePayment(this.g.Work_ID, this.amount, this.user_id).subscribe(result=>{console.log(result);
            this.order_id=result['orderId'];
            this.pay_id=result['payId'];
            console.log('Order ID'+this.order_id);
            console.log('Pay ID'+this.pay_id);
            this.payWithRazor(this.order_id, this.pay_id);
          })
        }
        if( response.data =='false' )
        {
          this.openSnackBar('Please enter your EmailID to continue!!','Retry');
        }
    });
  }
    
    
    // call api to create order_id
    
  }
 
  payWithRazor(val, pid) {
    const options: any = {
      key: 'rzp_test_58HZBwOLc2Uj8v',
      amount: 10000, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Wisebrix', // company name or product name
      description: '',  // product description
      image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fw%2Blogo&psig=AOvVaw2PQotf9OqPioLgb_IYfa0g&ust=1602744493974000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjshtW-s-wCFQAAAAAdAAAAABAD', // company logo or product image
      order_id: this.order_id,
       // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a'
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    };
    
    options.handler = ((response, error) => {
      //debugger;
      options.response = response;
      console.log(response['razorpay_order_id']);
      console.log(options);
      console.log('Pay ID'+pid);
      this.hiddenForm.controls['h_id'].setValue(pid);
      this.hiddenForm.controls['w_id'].setValue(this.g.Work_ID);
      this.hiddenForm.controls['o_id'].setValue(response['razorpay_order_id']);
      this.hiddenForm.controls['p_id'].setValue(response['razorpay_payment_id']);

      this.hiddenForm.controls['sign'].setValue(response['razorpay_signature']);

      // call your backend api to verify payment signature & capture transaction
      this.authService.confirmSignature(this.hiddenForm.value).subscribe(result=>{console.log(result);
        if(result['Success']==true)
        {
         
         // alert('Payment Completed Successfully!!!');
         this.dialogRef.close();
         this.closeDialog();
          this.openSnackBar('Payment Completed Successfully!!!','OK');
         // this.g.paymentStatus=1;
          this.dialogRef.close();
         // this.tender.chkPaymentDone(this.g.Work_ID);
         /*this.zone.run(() => {
          this.g.index=1;
          this.router.navigate(['home']);
      });*/
          
          
        }
        else{
          //alert('Something Went Wrong!!!');
          this.openSnackBar('Something Went Wrong!!!','RETRY');
        }
      })
    });
    
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
      this.openSnackBar('Transaction cancelled..','RETRY');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
 
}
