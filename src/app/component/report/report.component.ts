import { Component } from '@angular/core';
import { prayerRequest } from 'src/app/interface/prayerRequest';
import { PrayerRequestsService } from 'src/app/service/prayer-requests.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  allReports: prayerRequest[] = [];
  shownReports: prayerRequest[] = [];

  initialDate: string = "";
  finalDate: string = "";
  names: string[] = [];
  selectedName: string = "";


  constructor(private prayerRequest: PrayerRequestsService) {
    this.getAll();
  }

  getAll() {
    this.prayerRequest.getAll().then(data => {      
      this.allReports = data?.data?.prayerRequests;
      this.allReports.forEach(x => x.createdAt = new Date(x.createdAt ?? ""));
      this.shownReports = this.allReports;
      this.names = [... new Set(this.allReports.filter(x => x.name).map(x => x.name ?? "")) ];
    });
  }

  formatDateTime(date?: Date) {
    return date ?  `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}` : "-";
  }

  formatPrayer(prayer: string) {
    return prayer.replaceAll("\n", "<br/>");
  }

  isNameSelected(name: string ) {
    return this.selectedName === name;
  }

  filter() {
    if (this.initialDate)
      this.shownReports = this.allReports.filter( x => new Date(x.createdAt ?? Infinity) >= new Date (this.initialDate));

    if (this.finalDate)
      this.shownReports = this.allReports.filter( x => new Date(x.createdAt ?? Infinity) <= new Date(this.finalDate));

    if (this.selectedName)
      this.shownReports = this.allReports.filter( x => x.name === this.selectedName);

  }

  clear() {    
    this.initialDate = "";
    this.finalDate = "";
    this.selectedName = "";
    this.shownReports = this.allReports;    
  }

  printFilters() {
    console.log(`initialDate: ${this.initialDate}`);
    console.log(`finalDate: ${this.finalDate}`);
    console.log(`selectedName: ${this.selectedName}`);
  }

  delete(item: prayerRequest) {
    if (confirm(`Deseja excluir o pedido de oração de '${item.name}' feito em '${this.formatDateTime(item.createdAt)}' `))
      this.prayerRequest.delete(item.id ?? "").then(data => {         
        this.getAll();
        alert(`Pedido de oração deletado com sucesso! De '${item.name}' feito em '${this.formatDateTime(item.createdAt)}'`)
      });
  }

}
