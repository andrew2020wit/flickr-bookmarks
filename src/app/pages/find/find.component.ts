import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FlickrPhoto, FlickrService } from 'src/app/flickr.service';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
})
export class FindComponent implements OnInit, OnDestroy, AfterViewInit {
  sample = '';
  page = 1;

  photos: FlickrPhoto[] = [];

  filterInput: Element;
  filterInputKeyUp: Observable<Event>;

  constructor(private flickrService: FlickrService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.filterInput = document.querySelector('#filterInput');
    this.filterInputKeyUp = fromEvent(
      this.filterInput,
      'keyup'
    ) as Observable<Event>;

    this.filterInputKeyUp
      .pipe(debounceTime(1000))
      .subscribe(() => this.filterReLoad());
  }
  filterReLoad() {
    this.flickrService
      .getPhotos({ sample: this.sample, page: 1 })
      .subscribe((x) => {
        console.log(x);
        this.photos = x;
      });
  }

  ngOnDestroy() {}
}
