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

// eslint-disable-next-line no-return-await
const askUserPermission = async () => await Notification.requestPermission();

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
        // Notification.requestPermission();
        askUserPermission();
    }

    order_db = (buyerID, orderID) => this.db.ref().child(`/notifications/${buyerID}/${orderID}`);

    campaign_db = (campaignID) => this.db.ref().child(`/campaigns/${campaignID}`);

    campaign_db_for_users = () => this.db.ref().child('/campaigns/');

    user_db = (userPK) => this.db.ref().child(`/notifications/${userPK}`);
}

export default Firebase;
