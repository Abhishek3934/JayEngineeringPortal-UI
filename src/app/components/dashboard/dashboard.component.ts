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

  constructor(
    public auth: AuthService,
    private router: Router,
    private productService: ProductService,
    private reportService: ReportService
  ) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
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
