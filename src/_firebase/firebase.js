import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyCsVmQ0R8nX7QTZFJxgZNemFT4urDBW7J0',
    authDomain: 'e-commerce-ozu.firebaseapp.com',
    databaseURL: 'https://e-commerce-ozu-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'e-commerce-ozu',
    storageBucket: 'e-commerce-ozu.appspot.com',
    messagingSenderId: '115048619599',
    appId: '1:115048619599:web:609b04692351d188f7943a',
    measurementId: 'G-JTW10KDD0C',
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
        Notification.requestPermission();
    }

    order_db = (buyerID, orderID) => this.db.ref().child(`/notifications/${buyerID}/${orderID}`);

    user_db = (userPK) => this.db.ref().child(`/notifications/${userPK}`);
}

export default Firebase;
