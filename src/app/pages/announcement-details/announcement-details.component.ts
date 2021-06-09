import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncement } from 'src/app/shared/interfaces/announcement.interface';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss']
})
export class AnnouncementDetailsComponent implements OnInit {
  view = null;
  announcements: Array<IAnnouncement> = [];
  arrSimilar = [];         

  constructor(private aService: AnnouncementService, private activatedRoute: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    this.getAllAnnaouncements();
    this.getAnnouncement();
  }

  private getAnnouncement(): void {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    this.aService.getOne(title).onSnapshot(
      document => {
        document.forEach(ann => {
          const announcement = {
            id: ann.id,
            ...ann.data() as IAnnouncement
          };
          this.view = announcement;
        });
      }
    );
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
      this.getSimilar();
    });
  }

  getSimilar(){ 
    this.announcements.forEach(item => {      
      let titleWords = item.title.split(' ');
      let descriptionWords = item.description.split(' ');
      titleWords = titleWords.concat(descriptionWords);
      for(let i = 0; i < titleWords.length; i++){
        if(item.title.indexOf(titleWords[i]) != -1 || item.description.indexOf(titleWords[i]) != -1){
          if(!this.arrSimilar.includes(item)){
            this.arrSimilar.push(item);
          }
        }
      }
    })    
    this.arrSimilar = this.arrSimilar.filter(item => item.title != this.view.title);    
    this.arrSimilar = this.arrSimilar.slice(0,3);
  }
}
