import { Component } from '@angular/core';
import { DataproviderService } from '../services/dataprovider.service';
import { SignalRService } from '../services/signal-r.service';
import { ChartModel } from '../interfaces/chartmodel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  private dataItems$: Observable<ChartModel[]>;


  constructor(public dataproviderService: DataproviderService, signalRService: SignalRService) {
    // this.dataItems = [{ label: 'hejsa' }, { label: 'hejsa2' }];
    // this.dataItems = signalRService.data;


    // this.dataItems$ = signalRService.getData1();

    // this.dataItems currentValue = signalRService.registerScheduledDataListener().pipe(share());

    // const dataObservable = signalRService.getData();
    // dataObservable.subscribe((updatedData: ChartModel[]) => {
    //   console.log(updatedData);
    //   this.dataItems = updatedData;
    // });
  }



  startDataRetrieval() {
    this.dataproviderService.startDataProvider('clientIdentifier');
  }
}
