import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiDragoesService {

  constructor(private http: HttpClient) { }

  listDragoes() {
    return this.http.get(`${environment.dragonUrl}`)
  }

  addDragao(dragao: any) {
    return this.http.post(`${environment.dragonUrl}`, dragao)
  }

  editDragao(dragao: any) {
    return this.http.put(`${environment.dragonUrl}/${dragao.id}`, dragao)
  }

  deleteDragao(dragaoId: any) {
    return this.http.delete(`${environment.dragonUrl}/${dragaoId}`)
  }

  getDragao(dragaoId: any) {
    return this.http.get(`${environment.dragonUrl}/${dragaoId}`)
  }
}
