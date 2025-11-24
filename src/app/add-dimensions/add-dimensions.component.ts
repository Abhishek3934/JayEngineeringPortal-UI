import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDimensionService } from '../services/product-dimension.service';
import { ProductDimension } from '../models/product-dimension.model';

@Component({
  selector: 'app-add-dimension',
  templateUrl: './add-dimensions.component.html',
  styleUrls: ['./add-dimensions.component.css']
})
export class AddDimensionComponent implements OnInit {




  dimension: ProductDimension = {
    productId: 0,
    srNo: 0,
    dimensionType: '',
    specifiedDimension: '',
    tolerance: ''
  };

  constructor(
    private service: ProductDimensionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get productId from query params
    this.route.queryParams.subscribe(params => {
      this.dimension.productId = params['productId'] || 0;
      console.log("Product ID received:", this.dimension.productId);
    });
  }

  saveDimension() {
    // ✅ Front-end validation: only srNo and dimensionType are required
    if (!this.dimension.srNo || !this.dimension.dimensionType.trim()) {
      alert("⚠️ Please fill Sr No and Dimension Type before saving.");
      return; // Stop execution if validation fails
    }

    console.log("Sending payload:", this.dimension);

    this.service.saveDimension(this.dimension).subscribe({
      next: (res: any) => {
        // ✅ Ask user if they want to add more dimensions
        const addMore = confirm("✅ Dimension saved!\nDo you want to add another dimension?");

        if (addMore) {
          // Clear only dimension fields, keep productId
          this.dimension.srNo = 0;
          this.dimension.dimensionType = '';
          this.dimension.specifiedDimension = '';
          this.dimension.tolerance = '';
        } else {
          alert("✅ All dimensions added!");
          this.router.navigate(['/products']); // Redirect back to product list/dashboard
        }
      },
      error: (err: any) => {
        console.error("❌ Error saving dimension:", err);
        alert("❌ Error saving dimension! Check console.");
      }
    });
  }

}
