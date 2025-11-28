import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/products/delete/${id}`);
  }



  private apiUrl = environment.apiUrl + '/api/products';

  constructor(private http: HttpClient) { }

  addProduct(product: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/add-product`, // use correct endpoint
      {
        projectNo: product.projectNo,
        partName: product.partName,
        drawingNo: product.drawingNo,
        customer: product.customer,
        material: product.material,
        orderQty: product.orderQty,
        otherDetails: product.otherDetails
      }
    ); // remove responseType: 'text'
  }

  searchProduct(drawingNo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?drawingNo=${drawingNo}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }


}
