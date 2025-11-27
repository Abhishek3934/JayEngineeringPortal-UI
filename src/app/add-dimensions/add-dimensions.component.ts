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

  // ngOnInit(): void {
  //   // Get productId from query params
  //   this.route.queryParams.subscribe(params => {
  //     this.dimension.productId = params['productId'] || 0;
  //     console.log("Product ID received:", this.dimension.productId);
  //   });
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dimension.productId = Number(params['productId']) || 0;
      console.log("Product ID received:", this.dimension.productId);
    });
  }


  saveDimension() {
    if (!this.dimension.dimensionType || this.dimension.dimensionType.trim() === '') {
      alert("⚠️ Please fill Dimension Type before saving.");
      return;
    }

    const payload = {
      product_id: this.dimension.productId,
      sr_no: this.dimension.srNo,
      dimension_type: this.dimension.dimensionType, // <-- already a string
      specified_dimension: this.dimension.specifiedDimension,
      tolerance: this.dimension.tolerance
    };

    console.log("Sending payload:", payload);

    this.service.saveDimension(payload).subscribe({
      next: (res: any) => {
        const addMore = confirm("✅ Dimension saved!\nDo you want to add another dimension?");
        if (addMore) {
          this.dimension.srNo = 0;
          this.dimension.dimensionType = ''; // reset selection
          this.dimension.specifiedDimension = '';
          this.dimension.tolerance = '';
        } else {
          alert("✅ All dimensions added!");
          this.router.navigate(['/products']);
        }
      },
      error: (err: any) => {
        console.error("❌ Error saving dimension:", err);
        alert("❌ Error saving dimension! Check console.");
      }
    });
  }

  // Ensure custom entered tags are stored as strings
addCustomDimension = (name: string) => {
  return name; // returns the string itself
};



}


