
export interface Contact{
    uid: string;
    name: string;
    cattery?: string;
    cattery_register?: string;
    birth_date?: firebase.default.firestore.Timestamp;
    contact?: string;
    city?: string;
}