import InterfaceResourceApp from '@/assets/repository/interface_resource';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default class FirebaseApp extends InterfaceResourceApp {
  constructor() {
    super();
    this.data = null;
    this.documentPath = 'xxxxxxxxxx';
    this.initializeData = {
      apiKey: 'xxxxxxxxxxxxxx',
      authDomain: 'xxxxx.firebaseapp.com',
      databaseURL: 'https://xxxxx.firebaseio.com',
      projectId: 'xxxxx',
      storageBucket: 'xxxxx.appspot.com',
      messagingSenderId: 'xxxxx',
    };
    firebase.initializeApp(this.initializeData);
  }

  login({ username = '', password = '' } = {}) {
    return new Promise((response, reject) => {
      firebase.auth().signInWithEmailAndPassword(username, password)
        .then(() => {
          response();
        })
        .catch(() => {
          reject();
        });
    });
  }

  logout() {
    return firebase.auth().signOut();
  }

  getDocument() {
    return new Promise((response, reject) => {
      firebase.firestore().doc(this.documentPath).get()
        .then((data) => {
          this.data = data.data().data.map((o, i) => ({ ...JSON.parse(o), entryid: i }));
          response(this.data);
        })
        .catch(() => {
          reject(new Error(null));
        });
    });
  }

  async registDocument({ data }) {
    this.data[data.entryid] = data;
    return firebase.firestore()
      .doc(this.documentPath)
      .set({ data: this.data.map((o) => JSON.stringify(o)) });
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  authenticate(login, notLogin) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        login();
      } else {
        notLogin();
      }
    });
  }
}
