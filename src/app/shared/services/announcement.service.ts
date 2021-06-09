import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IAnnouncement } from '../interfaces/announcement.interface';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private dbPath = '/announcements';
  announcementsRef: AngularFirestoreCollection<IAnnouncement>;
  constructor(private db: AngularFirestore) { 
    this.announcementsRef = this.db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<IAnnouncement> {
    return this.announcementsRef;
  }

  getOne(title: string): any {
    return this.announcementsRef.ref.where('title', '==', title);
  }

  create(announcement: IAnnouncement): Promise<DocumentReference<any>> {
    return this.announcementsRef.add({ ...announcement });
  }

  update(id: string, data: any): Promise<void> {
    return this.announcementsRef.doc(id).update({ ...data });
  }

  delete(id: string): Promise<void> {
    return this.announcementsRef.doc(id).delete();
  }
}
