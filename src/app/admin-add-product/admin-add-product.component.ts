import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html'
})
export class AdminAddProductComponent {

  product: {
    projectNo: string;
    partName: string;
    drawingNo: string;
    customer: string;
    material: string;
    orderQty: number | null;
    otherDetails: string;
  } = {
    projectNo: '',
    partName: '',
    drawingNo: '',
    customer: '',
    material: '',
    orderQty: null,
    otherDetails: ''
  };

  successMsg = '';
  errorMsg = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
    this.productService.addProduct(this.product).subscribe({
      next: (res: any) => {
        // res should have { productId, product, message }
        if (res && res.productId) {
          this.successMsg = '✅ Product added successfully!';
          this.errorMsg = '';

          alert('✅ Product added! Now add dimensions.');

          // Redirect to Add Dimension page with productId
          this.router.navigate(['/add-dimensions'], {
            queryParams: { productId: res.productId }
          });

          // Reset form
          this.product = {
            projectNo: '',
            partName: '',
            drawingNo: '',
            customer: '',
            material: '',
            orderQty: null,
            otherDetails: ''
          };
        } else {
          this.errorMsg = '❌ Failed to get product ID';
          this.successMsg = '';
        }
      },
      error: (err) => {
        this.errorMsg = '❌ Failed to add product';
        this.successMsg = '';
        console.error(err);
      }
    });
  }
}
