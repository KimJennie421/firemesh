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
export class DashboardPage implements OnInit, AfterContentInit {


    @ViewChild('mapElement', {
        static: true
    }) mapElement: ElementRef;

    latitude;
    longitude;
    map;
    userEmail: string;
    marker;

    users: any[];

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

        this.authService.getAllUsers().subscribe(users => {
            this.users = users;
            console.log(this.users);

            let marker, i;
            for( i = 0; i < users.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(users[i].lat, users[i].lng),
                    map: this.map
               });
            }
        });

    }

    ngAfterContentInit() {
        this.showLocation();

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

    verOtroUsuario(uid){
        let user: any;
        this.authService.getUserInfo(uid).subscribe(usuarios => {
            console.log(usuarios[0]);
            user = usuarios[0];
            this.router.navigate(['/brigadista'], {state: {user: user}} );
        });
    }

    showLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            this.authService.sendPosition(this.latitude, this.longitude);

            let uid = this.authService.userDetails();
            let user: any;

            this.authService.getUserInfo(uid.uid).subscribe(usuarios => {
                console.log(usuarios[0]);
                user = usuarios[0];

                this.map = new google.maps.Map(
                    this.mapElement.nativeElement,
                    {
                    center: {lat: parseFloat(user.lat), lng: parseFloat(user.lng)},
                    zoom: 15
                });

                this.marker = new google.maps.Marker({
                    position: {lat: parseFloat(user.lat), lng: parseFloat(user.lng)},
                    map: this.map,
                    title: 'Got you!'
                });

            });

        });
    }


}
