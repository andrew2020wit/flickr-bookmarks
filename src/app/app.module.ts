import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from 'src/share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindComponent } from './pages/find/find.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';

@NgModule({
  declarations: [AppComponent, FindComponent, BookmarksComponent],
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
