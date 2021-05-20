import { AlertasService } from './../service/alertas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router : Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == ""){
      this.router.navigate(['/entrar'])
    }
    this.findAllTemas()

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('Voce não tem acesso a essa pagina')
      this.router.navigate(['/inicio'])
    }
  }
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado!')
      this.findAllTemas()
      this.tema = new Tema()
    }
    )
  }

}
