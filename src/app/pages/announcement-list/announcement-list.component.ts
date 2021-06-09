import { Component, OnInit } from '@angular/core';
import { IAnnouncement } from 'src/app/shared/interfaces/announcement.interface';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.scss']
})
export class AnnouncementListComponent implements OnInit {
  modal: boolean = false;
  top: string = '-370px'
  announcements: Array<IAnnouncement> = [];
  title: string = '';
  desc: string = '';
  arrId: Array<number> = [];
  edit: boolean = false;
  delete: boolean = false;
  check:boolean = true;
  date:Date;
  id:string = '';
  searchName: string = '';
  cancel:boolean = false;
  constructor(private aService: AnnouncementService) { }

  ngOnInit(): void {
    this.getAllAnnaouncements();
  }

  openAddModal() {
    this.modal = true;
    this.top = '170px';
  }

  closeAddModal() {
    this.modal = false;
    this.top = '-370px';
    this.reset();
  }

  cancelSearch(){    
    if(this.searchName.length>0){
      this.cancel = true;
    }
    else{
      this.cancel = false;
    }
  }

  reset(){
    this.title = '';
    this.desc = '';
    this.searchName = '';
    this.arrId = [];
    this.edit = false;
    this.delete = false;
    let el: NodeListOf<HTMLElement> = document.querySelectorAll(`.check`);
    let arr = Array.prototype.slice.call(el);
    arr.forEach((item) => {
      item.checked = false;
    })
    
  }

  addAnnouncement() {
    let obj: IAnnouncement = {
      title: this.title,
      description: this.desc,
      date: new Date()
    }
    this.aService.create(obj);
    this.closeAddModal();
  }

  getAllAnnaouncements() {
    this.aService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.announcements = data;
    });
  }

  checking(index: number, e: any) {
    if (e.target.checked) {
      this.arrId.push(index);
      if (this.arrId.length != 0) {
        if (this.arrId.length == 1) {
          this.edit = true;
        }
        else{
          this.edit = false;
        }
        this.delete = true;
      }
    }
    else {
      this.arrId = this.arrId.filter((i) => i!=index);
      if (this.arrId.length != 0) {
        if (this.arrId.length == 1) {
          this.edit = true;
        }
        else{
          this.edit = false;
        }
        this.delete = true;
      }
      else {
        this.edit = false;
        this.delete = false;
      }
    }
  }

  editAnnouncement(){
    this.check = false;
    this.openAddModal();
    this.title = this.announcements[this.arrId[0]].title;
    this.desc = this.announcements[this.arrId[0]].description;
    this.date = this.announcements[this.arrId[0]].date;
    this.id = this.announcements[this.arrId[0]].id;
  }

  saveAnnouncement(){
    let obj: IAnnouncement = {
      title: this.title,
      description: this.desc,
      date: this.date
    }
    this.aService.update(this.id, obj);
    this.closeAddModal();
    this.reset();
    this.check = true;
  }

  deleteAnnouncement(){
    for(let i=0; i< this.arrId.length; i++){      
      this.aService.delete(this.announcements[this.arrId[i]].id);
    }
    this.reset();
  }
}
