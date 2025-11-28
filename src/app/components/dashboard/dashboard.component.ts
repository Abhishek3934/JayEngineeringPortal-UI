import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  searchText = '';
  productFound: any = null;
  errorMsg = '';
  recentProducts: any[] = [];




  constructor(
    public auth: AuthService,
    private router: Router,
    private productService: ProductService,
    private reportService: ReportService
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.loadRecentProducts();    // ⬅ Add this line
  }

  clearSearch() {
    this.searchText = '';
    this.productFound = null;
    this.errorMsg = '';

    // Reload recent products
    this.loadRecentProducts();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  loadRecentProducts() {
    this.productService.getAllProducts().subscribe({
      next: res => {
        // take last 6 entries and reverse them so latest comes first
        this.recentProducts = res.slice(-6).reverse();
      },
      error: err => console.error('Error loading products', err)
    });
  }




  searchProduct() {
    this.errorMsg = '';
    this.productFound = null;

    if (!this.searchText?.trim()) {
      this.errorMsg = 'Please enter part name or drawing number';
      return;
    }

    this.productService.searchProduct(this.searchText.trim()).subscribe({
      next: res => this.productFound = res,
      error: () => {
        this.productFound = null;
        this.errorMsg = '❌ Product not found';
      }
    });
  }

  deleteProduct(id: number) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert("Product deleted successfully!");
        this.loadRecentProducts(); // refresh table
      },
      error: () => {
        alert("Failed to delete product.");
      }
    });
  }


  downloadPdf() {
    if (!this.productFound) return;
    this.reportService.downloadPdf(this.productFound.id).subscribe(blob => {
      this.downloadFile(blob, `report_${this.productFound.drawingNo}.pdf`);
    });
  }




  printReport() {
    if (!this.productFound) return;

    this.reportService.downloadPdf(this.productFound.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);

      const pdfWindow = window.open(url, '_blank');
      if (!pdfWindow) {
        alert('Popup blocked! Please allow popups to print the report.');
        return;
      }

      pdfWindow.onload = () => {
        pdfWindow.focus();
        pdfWindow.print(); // This prints the PDF
      };
    });
  }


  downloadExcel() {
    if (!this.productFound) return;

    this.reportService.downloadExcel(this.productFound.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${this.productFound.drawingNo}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }





  private downloadFile(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}


