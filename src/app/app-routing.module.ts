import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { C404Component } from './pages/c404/c404.component';
import { FindComponent } from './pages/find/find.component';

const routes: Routes = [
  { path: '', component: FindComponent },
  { path: 'book-marks', component: BookmarksComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: C404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
