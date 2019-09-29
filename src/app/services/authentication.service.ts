import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticateService {

    constructor( public db: AngularFirestore ) {}

    registerUser(value, userName, ocupacion){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => {
                        const uid = res.user.uid;
                        this.db.collection('users').doc(uid).set({
                            uid: uid,
                            nombre: userName,
                            ocupacion: ocupacion

                        });
                        resolve(res);
                    },
                    err => reject(err));
                });
    }

    loginUser(value){
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err));
        });
    }

    logoutUser(){
        return new Promise((resolve, reject) => {
            if(firebase.auth().currentUser){
                firebase.auth().signOut()
                    .then(() => {
                        console.log("Log Out");
                        resolve();
                    }).catch((error) => {
                    reject();
                });
            }
        })
    }

    userDetails() {
        return firebase.auth().currentUser;
    }

    getUserInfo(uid: any): Observable<any[]> {
        return this.db.collection('users', ref => ref.where("uid", "==", uid)).valueChanges();
    }

    sendPosition(lat, lng){
        return new Promise<any>((resolve, reject) => {
            let uid = this.userDetails().uid;
            this.db.collection('users').doc(uid).update({
                lat: lat,
                lng: lng
            });
        });
    }

    getAllUsers(): Observable<any[]> {
        return this.db.collection('users').valueChanges();
    }
}
