import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { AlertController, IonGrid } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:User=new User();
  constructor(private router:Router, private authSvc: AuthService, private alertCtrl: AlertController,
    private authservice:AuthService) { }

  ngOnInit() {
  }
  async onLogin(){
    const user = await this.authSvc.onLogin(this.user);
    if(user){
      console.log("successfully logged user");
      this.router.navigateByUrl('/tabs');
    }else{
      const alert = await this.alertCtrl.create({
        header:"Datos incorrectos",
        message:"Los datos son incorrectos",
        buttons:[
          {
            text:"salir",
          }
        ]
      });
      await alert.present();
    }
  }
  onLoginGoogle():void{
    this.authservice.loginGoogleUser().then((res)=>{this.onLoginRedirect();}).catch(err=>console.log('err',err.message));
  } 

  onLoginGit():void{
    this.authservice.loginGitUser().then((res)=>{this.onLoginRedirect();}).catch(err=>console.log('err',err.message));
  }

  onLoginRedirect():void{
    this.router.navigate(['/tabs']);
  }
}
