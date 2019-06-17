import { Component } from '@angular/core';
import { DataproviderService } from '../services/dataprovider.service';
import { SignalRService } from '../services/signal-r.service';
import { ChartModel } from '../interfaces/chartmodel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private dataItems$: ChartModel[];

  constructor(public dataproviderService: DataproviderService, signalRService: SignalRService) {
    signalRService.scheduledDataItem$.subscribe(item => this.dataItems$ = item);
  }

  startDataRetrieval() {
    this.dataproviderService.startDataProvider('clientIdentifier');
  }
}
