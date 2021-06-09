import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementDetailsComponent } from './pages/announcement-details/announcement-details.component';
import { AnnouncementListComponent } from './pages/announcement-list/announcement-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'announcement-list' },
  { path: 'announcement-list', component: AnnouncementListComponent },
  { path: 'announcement-details/:title', component: AnnouncementDetailsComponent },
  { path: '**', component: AnnouncementListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
