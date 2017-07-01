import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Block, BlockResponse, CoinSupply } from '../../components/pages/block-chain-table/block';

@Injectable()
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8001/';

  constructor(private http: Http) { }

  fetchNumberOfBlocks(): Observable<number> {
    return this.get('blockchain/metadata')
      .map(res => res.head.seq);
  }

  getBlocks(startNumber: number, endNumber: number): Observable<Block[]> {
    const stringConvert = 'start=' + startNumber + '&end=' + endNumber;

    return this.get('blocks?' + stringConvert)
      .map((res: BlockResponse) => res.blocks);
  }

  getCoinSupply(): Observable<CoinSupply> {
    return this.get('coinSupply');
  }

  private get(url) {
    return this.http.get(this.baseUrl + 'api/' + url)
      .map(res => res.json())
      .catch((error:any) => {
        console.log(error);
        return Observable.throw(error || 'Server error');
      });
  }
}