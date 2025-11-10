import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent {
  productFound: any = null;

  constructor(
    public auth: AuthService,
    private router: Router,
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

  downloadPdf() {
    if (!this.productFound) return;
    this.reportService.downloadPdf(this.productFound.id).subscribe(blob => {
      this.downloadFile(blob, `report_${this.productFound.drawingNo}.pdf`);
    });
  }

  downloadExcel() {
    if (!this.productFound) return;
    this.reportService.downloadExcel(this.productFound.id).subscribe(blob => {
      this.downloadFile(blob, `report_${this.productFound.drawingNo}.xlsx`);
    });
  }

  printReport() {
    if (!this.productFound) return;
    this.reportService.printReport(this.productFound.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url;
      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      };
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
