import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { 
    Firestore, 
    collection, 
    doc, docData, 
    addDoc, updateDoc, 
    collectionData, 
    where, query, 
    limitToLast, 
    orderBy, 
    docSnapshots, 
    limit} from '@angular/fire/firestore';
import { Category, Subcategory } from '../model/category';
import { User } from '../model/user';
import { Package } from '../model/package';
import { Item } from '../model/item';
import { Chat, ChatHistory } from '../model/chat';
import { Notification } from '../model/notification';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: Firestore, 
    public http: HttpClient
    ) {}

  //Get categories 
  getCategories(): Observable<Category[]>{
    const categoryCollection = collection(this.firestore, 'categories');
    //const queryList = query(tripCollection, where('driverId', '==', uid));
    return collectionData(categoryCollection, {idField: 'id'}) as Observable<Category[]>;
  }

  //Get subcategories 
  getSubCategories(id): Observable<Subcategory[]>{
    const categoryCollection = collection(this.firestore, 'sub-categories');
    const queryList = query(categoryCollection, where('category', '==', id));
    return collectionData(queryList, {idField: 'id'}) as Observable<Subcategory[]>;
  }

  getSubCategoriesList(): Observable<Subcategory[]>{
    const categoryCollection = collection(this.firestore, 'sub-categories');
    //const queryList = query(categoryCollection, where('category', '==', id));
    return collectionData(categoryCollection, {idField: 'id'}) as Observable<Subcategory[]>;
  }

  //Get subcategories 
  getPackages(): Observable<Package[]>{
    const categoryCollection = collection(this.firestore, 'Packages');
    const queryList = query(categoryCollection, where('status', '==', true));
    return collectionData(queryList, {idField: 'id'}) as Observable<Package[]>;
  }

  getmyItems(id): Observable<Item[]>{
    const categoryCollection = collection(this.firestore, 'items');
    const queryList = query(categoryCollection, where('userId', '==', id));
    return collectionData(queryList, {idField: 'id'}) as Observable<Item[]>;
  }

  getNote(): Observable<Notification[]>{
    const categoryCollection = collection(this.firestore, 'notifications');
    return collectionData(categoryCollection, {idField: 'id'}) as Observable<Notification[]>;
  }

  getItems(id): Observable<Item[]>{
    const categoryCollection = collection(this.firestore, 'items');
    const queryList = query(categoryCollection, where('subcategory', '==', id), where('allow', '==', true));
    return collectionData(queryList, {idField: 'id'}) as Observable<Item[]>;
  }

  getItemsFilter(catid, id): Observable<Item[]>{
    const categoryCollection = collection(this.firestore, 'items');
    const queryList = query(categoryCollection, where('category', '==', catid), where('subcategory', '==', id), where('allow', '==', true));
    return collectionData(queryList, {idField: 'id'}) as Observable<Item[]>;
  }

  getUsers(): Observable<User[]>{
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, {idField: 'id'}) as Observable<User[]>;
  }

  getAllItems(): Observable<Item[]>{
    const userCollection = collection(this.firestore, 'items');
    return collectionData(userCollection, {idField: 'id'}) as Observable<Item[]>;
  }


  //Get user by Id
  getUserById(id: string): Observable<User> {
    const document = doc(this.firestore, `users/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as User
      })
    );
  }

  getChats(chatId): Observable<Chat[]>{
    //query(citiesRef, orderBy("name"), limit(3));
    const chatsCollection = collection(this.firestore, 'chatroom', chatId, chatId);
    const queryList = query(chatsCollection, orderBy('timestamp'));
    return collectionData(queryList, {idField: 'id'})
    .pipe(
      map(chats => chats as Chat[])
    );
  }

  getChatsHistory(userId): Observable<ChatHistory[]>{
    //query(citiesRef, orderBy("name"), limit(3));
    const chatsCollection = collection(this.firestore, 'users', userId, 'chatlist');
    const queryList = query(chatsCollection, orderBy('timestamp'));
    return collectionData(queryList, {idField: 'id'})
    .pipe(
      map(chats => chats as ChatHistory[])
    );
  } 

  getNewItemList(): Observable<Item[]> {
    const postCollection = collection(this.firestore, 'items');
    const queryList = query(postCollection, orderBy("adDate"), limit(20));
    return collectionData(queryList, {idField: 'id'}) as Observable<Item[]>;
    
  }

 
  getChatById(id: string, chatId): Observable<ChatHistory> {
    const document = doc(this.firestore, `users/${id}`, 'chatlist', chatId);
    return docSnapshots(document)
    .pipe(
      map(doc => {
         const id = doc.id;
        const data = doc.data();
        return { id, ...data } as ChatHistory;
      })
    );
  }

  getItemById(id: string): Observable<Item> {
    const document = doc(this.firestore, `items/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Item
      })
    );
  }


}
