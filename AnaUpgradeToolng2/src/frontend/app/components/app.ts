import {Component, View} from 'angular2/core';

@Component({
  selector: 'AnaUpgradeToolng2'
})

@View({
  templateUrl: 'app/components/app.html'
})

export class AppComponent{
  private caption: string = "Hello from ng2.";
}
