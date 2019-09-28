import {Component, OnInit} from '@angular/core';
import {NavController, ModalController} from '@ionic/angular';
import {AuthenticateService} from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


    userEmail: string;

    constructor(
        private navCtrl: NavController,
        private authService: AuthenticateService,
        public router: Router
    ) {
    }

    ngOnInit() {

        if (this.authService.userDetails()) {
            this.userEmail = this.authService.userDetails().email;
        } else {
            this.navCtrl.navigateBack('');
        }
    }

    logout() {
        this.authService.logoutUser()
            .then(res => {
                console.log(res);
                this.navCtrl.navigateBack('');
            })
            .catch(error => {
                console.log(error);
            })
    }

    verPerfil() {
        let uid = this.authService.userDetails();
        let user: any;

        this.authService.getUserInfo(uid.uid).subscribe(usuarios => {
            console.log(usuarios[0]);
            user = usuarios[0];
            this.router.navigate(['/brigadista'], {state: {user: user}} );
        });

    }
}
