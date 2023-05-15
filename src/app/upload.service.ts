import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }

  store(data: any): Observable<any> {
    console.log('data',data);
    
    const formData: FormData = new FormData();
    formData.append('photo',data);

    console.log(formData);
    
    return this.http.post('http://localhost:3001/upload', formData);
  }

}
