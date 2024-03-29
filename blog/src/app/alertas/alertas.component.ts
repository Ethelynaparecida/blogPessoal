import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  @Input() message: String
  @Input() tipo: string

  constructor(
  public modal: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  onClose(){
    this.modal.hide()
  }

}
