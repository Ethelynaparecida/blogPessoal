
import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { Postagem } from './../model/Postagem';
import { PostagemService } from './../service/postagem.service';
import { AlertasService } from './../service/alertas.service';
import { environment } from './../../environments/environment.prod';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  nomeTema: string = ''


  user: User = new User()

  idUserLogado = environment.idUser
  fotoUserLogado = environment.foto
  nomeUserLogado = environment.nome

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private alertas: AlertasService,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    this.findAllPostagens()
    this.findAllTemas()
    this.findByIdUser()

  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
      console.log(this.listaPostagens)
    }, err => {
      console.log(this.listaPostagens)
    })
  }

  findByIdUser() {
    this.authService.getByIdUser(environment.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findByNomeTema() {
    console.log(this.nomeTema)
    if (this.nomeTema == '') {
      this.findAllTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

  findByTituloPostagem(){
    if(this.tituloPost == ''){
      this.findAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[])=>{
        this.listaPostagens = resp
      })
    }

  }

  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.user.id = environment.idUser
    this.postagem.usuario = this.user
    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.findAllPostagens()
      this.findByIdUser()
      this.findAllTemas()
      this.postagem = new Postagem()
    })
  }

  

 

}