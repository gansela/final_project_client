import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private model: Subject<string>
  constructor() { 
    this.model = new Subject<string>();
  }

  changeModel(data) {
    this.model.next(data)
  }

  getModel(): Observable<string> {
    return this.model
  }
}
