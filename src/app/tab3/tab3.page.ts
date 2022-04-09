import { Estudiante } from './../models/estudiante';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../services/estudiante.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  student:Estudiante;
  constructor(private service: EstudianteService,
    private actroute: ActivatedRoute, 
    private router:Router, 
    private toast: ToastController) {
      this.actroute.queryParams.subscribe(
        params=>{
          if(params && params.special){
            this.student=JSON.parse(params.special) as Estudiante;
            console.log(this.student)
          }
        }
      );
    }
  ngOnInit() {
    
  }
  delete(id:string){
    this.service.deleteStudent(id);
    this.presentToast();
    this.router.navigate(['/']);
  }

  async presentToast(){
    const t = await this.toast.create({
      message:'Estudiante eliminado',
      duration: 2000
    });
    t.present();
  }

}
