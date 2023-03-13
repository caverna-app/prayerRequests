import { Component } from '@angular/core';
import { prayerRequest } from 'src/app/interface/prayerRequest';
import { PrayerRequestsService } from 'src/app/service/prayer-requests.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  inputValue: string = "";
  textareaValue: string = "";

  constructor(private prayerRequestService: PrayerRequestsService) {}

  clear() {    
    this.inputValue = "";
    this.textareaValue = "";    
  }

  save() {
    const params: prayerRequest = { name: this.inputValue, prayer: this.textareaValue };

    if (this.textareaValue)    
      this.prayerRequestService.save(params).then(data => {
        alert("Pedido de oração cadastrado com sucesso!");
        this.clear();
      });
    
  }
}
