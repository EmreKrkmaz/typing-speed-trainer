import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WordApiService {
  private readonly baseUrl = 'https://random-word-api.herokuapp.com/word';

  constructor(private readonly http: HttpClient) {}

  getWords(languageCode: string, count: number): Observable<string[]> {
    let params = new HttpParams().set('number', String(count));
    if (languageCode) {
      params = params.set('lang', languageCode);
    }

    return this.http.get<string[]>(this.baseUrl, { params }).pipe(
      map((words) => {
        if (!Array.isArray(words) || words.some((word) => typeof word !== 'string')) {
          throw new Error('Word API response is not a string array.');
        }
        return words;
      })
    );
  }
}
