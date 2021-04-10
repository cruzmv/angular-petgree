import { Inject, Injectable, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CatPropertie, Cats } from '../models/cats';
import { Contact } from '../models/contact';


export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}


@Injectable({
  providedIn: 'root'
})
export class FirebaseDbServiceService {

  private basePath = '/uploads';  
  storageRef: any;

  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              @Inject(AngularFireDatabase) private db: AngularFireDatabase ) { }


  pushFileToStorage(fileUpload: FileUpload) {  //: Observable<any>
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    this.storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.storageRef.getDownloadURL().subscribe((downloadURL:any) => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask; //.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  /*
  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  */




  // Contacts
  listContact(): Observable<any> {
    return this.firestore.collection<Contact[]>('contacts').valueChanges({ idField: 'uid' });
  }

  getContact(uid: string): Observable<any> {
    return this.firestore.collection<Contact>('contacts').doc(uid).valueChanges({ idField: 'uid' });
  };

  updateContact(contact: Contact) {
    if (contact.uid)
      return this.firestore.collection<Contact>('contacts').doc(contact.uid).update(contact);

    contact.uid = this.firestore.createId();
    return this.firestore.collection<Contact>('contacts').doc(contact.uid).set(contact);
  }

  deleteContact(uid: string) {
    const res = this.firestore.collection<Contact>('contacts').doc(uid).delete();
    return res;
  }
  // \ Contacts


  // Cats
  listCats(): Observable<any> {
    return this.firestore.collection('cats').valueChanges({ idField: 'uid' });
  }

  getCat(uid: string): Observable<any> {
    return this.firestore.collection('cats').doc(uid).valueChanges({ idField: 'uid' });
  }

  updateCat(cat: Cats) {
    if (cat.uid)
      return this.firestore.collection('cats').doc(cat.uid).update(cat);

    const uid = this.firestore.createId();
    return this.firestore.collection('cats').doc(uid).set(cat);
  }

  deleteCat(uid: string) {
    return this.firestore.collection('cats').doc(uid).delete();
  }
  // \ Cats

  // Cats properties

  listCatPropertie(collection: string): Observable<any> {
    return this.firestore.collection(collection).valueChanges({ idField: 'uid' });
  }

  saveCatPropertie(prop: CatPropertie, collection: string) {
    if (prop.uid)
      return this.firestore.collection(collection).doc(prop.uid).update(prop);

    const uid = this.firestore.createId();
    return this.firestore.collection(collection).doc(uid).set(prop);
  }

  deleteCatPropertie(uid: string, collection: string) {
    return this.firestore.collection(collection).doc(uid).delete();
  }

  // \ Cats properties

}
