import { Estudiante } from './../models/estudiante';
import { Component, OnInit } from '@angular/core';
import {Router,RouterModule} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AuthService} from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms'; 
import { EstudianteService } from '../services/estudiante.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public myForm:FormGroup;
  public student:Estudiante;
  constructor(private studentService:EstudianteService,private fb:FormBuilder,private authSvc:AuthService, private router:Router,private afAuth: AngularFireAuth) {}
  onLogout(){
    console.log('Logout');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login')
  }

  ngOnInit(){
    this.myForm=this.fb.group({
      id:[""],
      name:[""],
      controlnumber:[""],
      curp:[""],
      age:[0],
      active:[false]
    });
  }
  create(){
    this.student={
      id:this.myForm.controls.id.value,
      name:this.myForm.controls.name.value,
      controlnumber:this.myForm.controls.controlnumber.value,
      age:this.myForm.controls.age.value,
      curp:this.myForm.controls.curp.value,
      active:this.myForm.controls.active.value,
    }
    this.studentService.createStudent(this.student);
  }

}
