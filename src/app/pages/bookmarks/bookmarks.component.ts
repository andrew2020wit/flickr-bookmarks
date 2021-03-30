import { Component, OnInit } from '@angular/core';
import { BookmarksService, IBookmark } from 'src/app/bookmarks.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  bookmarksArr: IBookmark[] = [];
  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.bookmarksService.photos$.subscribe((x) => {
      this.bookmarksArr = x;
    });
  }

  delBookmarks(id) {
    this.bookmarksService.delBookmarks(id);
  }
}
