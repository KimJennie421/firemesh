import {Component, OnInit, ViewChild, AfterContentInit, ElementRef} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthenticateService} from '../services/authentication.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


    @ViewChild('mapElement', {
        static: true
    }) mapElement: ElementRef;

    isTracking: boolean;
    latitude;
    longitude;
    map;
    userEmail: string;
    marker;

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

        navigator.geolocation.getCurrentPosition((position) => {

            this.map = new google.maps.Map(
                this.mapElement.nativeElement,
                {
                center: {lat: position.coords.latitude, lng: position.coords.longitude},
                zoom: 15
            });

            this.marker = new google.maps.Marker({
                position: {lat: this.latitude, lng: this.longitude},
                map: this.map,
                title: 'Got you!'
            });
        });

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
