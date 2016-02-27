import {Component} from 'angular2/core';
@Component({
  selector: 'AnaUpgradeToolng2',
  template: `<h3>{{caption}}
  <button type="button" class="btn btn-lg btn-primary">Primary</button>
  </h3>`
})
export class AppComponent{
  private caption: string = "Hello from ng2.";
}
