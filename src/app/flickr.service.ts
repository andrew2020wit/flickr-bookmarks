import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { flickrApiKey } from 'src/flickr-api-key';

export interface IFlickrQuery {
  sample: string;
  page: number;
}

export interface IFlickrPhoto {
  url: string;
  title: string;
  id: string;
  tags: string;
}

export interface IFlickrPhotoResponse {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

export interface IFlickrResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: IFlickrPhotoResponse[];
    total: string;
  };
  stat: string;
}

// https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private http: HttpClient) {}

  getPhotos(
    flickrQuery: IFlickrQuery
  ): Observable<{ flickrPhotos: IFlickrPhoto[]; pages: number }> {
    const url =
      'https://www.flickr.com/services/rest/?method=flickr.photos.search';
    const params = `&api_key=${flickrApiKey}&text=${flickrQuery.sample}`;
    const params2 = `&format=json&nojsoncallback=1&per_page=12&page=${flickrQuery.page}`;
    return this.http.get(url + params + params2).pipe(
      map((response: IFlickrResponse) => {
        console.log('FlickrResponse: ', response);
        const flickrPhotos: IFlickrPhoto[] = [];
        response.photos.photo.forEach((ph: IFlickrPhotoResponse) => {
          const photoObj = {
            url: `https://live.staticflickr.com/${ph.server}/${ph.id}_${ph.secret}_z.jpg`,
            title: ph.title,
            id: ph.id,
            tags: '',
          };
          flickrPhotos.push(photoObj);
        });
        return { flickrPhotos, pages: response.photos.pages };
      })
    );
  }
}
