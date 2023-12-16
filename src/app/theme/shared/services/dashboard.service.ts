import { Injectable } from '@angular/core';
import { BaseUrl } from '../classe/base-url';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: BaseUrl = new BaseUrl();

  constructor(private _http :HttpClient) { }

  public getAllTotal(){
    return this._http.get<any>(this.baseUrl.url+"all-total/")
  }

  public getRecentTransactions(){
    return this._http.get(this.baseUrl.url+"recent-transactions/")
  }

  public getAccountByTier(){
    return this._http.get(this.baseUrl.url+"accounts-by-tier/")
  }

  public getCustomersByDate(){
    return this._http.get(this.baseUrl.url+"customers-by-age/")
  }

  public groupByCode(){
    return this._http.get(this.baseUrl.url+"group_by_code/")
  }

}