import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brigadista',
  templateUrl: './brigadista.page.html',
  styleUrls: ['./brigadista.page.scss'],
})
export class BrigadistaPage implements OnInit {

  usuario: any;
  uid: string;

  constructor( public authService: AuthenticateService, public router: Router ) {
    this.usuario = this.router.getCurrentNavigation().extras.state.user;

  }

  ngOnInit() {

  }

}
