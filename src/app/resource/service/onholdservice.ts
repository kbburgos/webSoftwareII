import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { OnHold } from '../interface/onhold';

@Injectable()

export class OnHoldService{
	constructor(private http: HttpClient) {}

	getOnHold() {
        return this.http.get<any>('assets/data/onHold.json')
        .toPromise()
        .then(res => <OnHold[]>res.data)
        .then(data => { return data; });
    }
}