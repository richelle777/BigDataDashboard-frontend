import { Injectable } from '@angular/core';
import {Observable, shareReplay} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: { [url: string]: Observable<any> } = {};

  constructor(private http: HttpClient) {}

  getData(apiUrl: string): Observable<any> {
    if (!this.cache[apiUrl]) {
      this.cache[apiUrl] = this.http.get(apiUrl).pipe(
        shareReplay(1) // Utilise shareReplay pour partager la réponse entre les observateurs
      );
    }

    return this.cache[apiUrl];
  }
}
