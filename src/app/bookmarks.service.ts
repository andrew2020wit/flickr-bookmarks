import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const bookmarksLocalStorKey = 'bookmarks';

export interface IBookmark {
  url: string;
  title: string;
  id: string;
  tags: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  photos$ = new BehaviorSubject<IBookmark[]>([]);
  bookmarksObj: any = {};
  bookmarksArr: IBookmark[] = [];
  constructor() {
    const x = JSON.parse(localStorage.getItem(bookmarksLocalStorKey));
    if (x) {
      this.bookmarksObj = x;
      this.change();
    }
  }

  setPhoto(bookmark: IBookmark) {
    // console.log('setPhoto', bookmark);
    this.bookmarksObj[bookmark.id] = bookmark;
    this.change();
  }

  delBookmarks(id: string) {
    delete this.bookmarksObj[id];
    this.change();
  }

  change() {
    this.bookmarksArr = [];
    for (let key in this.bookmarksObj) {
      this.bookmarksArr.push(this.bookmarksObj[key]);
    }
    this.photos$.next(this.bookmarksArr);
    localStorage.setItem(
      bookmarksLocalStorKey,
      JSON.stringify(this.bookmarksObj)
    );
  }
}
