import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private readonly auth: Auth, private readonly firestore: Firestore) {}

  getUser(): User {
    return this.auth.currentUser;
  }

  getUser$(): Observable<User> {
    return of(this.getUser());
  }

  login(email: string, password: string): Promise<UserCredential> {
     return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup(email: string, password: string, displayName: string, phoneNumber: string): Promise<UserCredential> {
    try {
      const newUserCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userProfileDocumentReference = doc(this.firestore, `users/${newUserCredential.user.uid}`);
      localStorage.setItem("uid", newUserCredential.user.uid);
      localStorage.setItem('isLoggedIn','true')
      await setDoc(userProfileDocumentReference, {
        email: email, 
        displayName: displayName,
        photoURL: 'assets/avatar.gif',
        phoneNumber: phoneNumber,
        following: [],
        followers: [],
        wishlist: [],
        block: false,
        type: 'users',
        joined: Date.now(),
        online: true,
        lastSeen: Date.now(),
        typing: false,
        fcm_token: ''
      });
      return newUserCredential;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

}