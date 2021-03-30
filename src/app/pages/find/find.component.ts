import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BookmarksService } from 'src/app/bookmarks.service';
import { FlickrService, IFlickrPhoto } from 'src/app/flickr.service';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit, OnDestroy, AfterViewInit {
  sample = '';
  page = 1;
  allPages = 1;

  tags = {};

  photos: IFlickrPhoto[] = [];

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(
    private flickrService: FlickrService,
    private bookmarksService: BookmarksService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#filterInput');
    this.filterInputKeyUp = fromEvent(
      this.filterInput,
      'keyup'
    ) as Observable<Event>;

    this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.search());
  }

  search() {
    this.page = 1;
    this.getPhotos();
  }

  getPhotos() {
    if (!this.sample) {
      return;
    }
    this.flickrService
      .getPhotos({ sample: this.sample, page: this.page })
      .subscribe(({ flickrPhotos, pages }) => {
        this.allPages = pages;
        this.photos = flickrPhotos;
        flickrPhotos.forEach((ph) => {
          this.tags[ph.id] = '';
        });
      });
  }

  setBookmarks(id) {
    console.log(id, this.tags[id]);
    const id1 = this.photos.findIndex((ph) => {
      return ph.id === id;
    });
    const v = this.photos[id1];
    v.tags = this.tags[id];
    this.bookmarksService.setPhoto(v);
  }

  back() {
    this.page--;
    if (this.page < 1) {
      this.page = 1;
    }
    this.getPhotos();
  }

  forward() {
    this.page++;
    if (this.page > this.allPages) {
      this.page = this.allPages;
    }
    this.getPhotos();
  }

  ngOnDestroy() {}
}
