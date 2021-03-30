import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from 'src/share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { FindComponent } from './pages/find/find.component';
import { AboutComponent } from './pages/about/about.component';
import { C404Component } from './pages/c404/c404.component';

@NgModule({
  declarations: [AppComponent, FindComponent, BookmarksComponent, AboutComponent, C404Component],
  imports: [
    BrowserModule,
    ShareModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
