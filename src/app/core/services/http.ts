

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
})


export class Http {


    constructor(private http: HttpClient) { }


    public get(collection: string): Observable<any> {

        const url = environment.apiBackend.backend + collection;

        return this.http.get<any>(url).pipe(
            tap((data: any) => {

            }),
            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );

    }


    public post<T>(req: unknown, collection: string): Observable<T> {

        const url = environment.apiBackend.backend + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.post<T>(url, req, httpOptions).pipe(
            tap((data: any) => {

            }),
            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );

    }


    public postBlob(req: unknown, collection: string): Observable<Blob> {

        const url = environment.apiBackend.backend + collection;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            responseType: 'blob' as const,
        };

        return this.http.post(url, req, httpOptions).pipe(
            tap((data: Blob) => {

            }),
            catchError(err => {
                throw 'Error in source. Details: ' + err;
            }),
        );

    }


}
