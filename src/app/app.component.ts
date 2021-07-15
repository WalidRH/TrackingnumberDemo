import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  tracking_number: string = null;

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (!!this.tracking_number) {
      let encodeString = '';
      this.tracking_number.split('').forEach(character => {
        encodeString += this.encodeTrackingNumberChar(character);
      });

      encodeString = encodeURI(encodeString);
      console.log('Encode String : ', encodeString);

      this.requestTrackingSearch(encodeString);
    }
  }

  encodeTrackingNumberChar(character: string): string {
    const asciival = character.charCodeAt(0);
    const tempval = asciival - 54;
    console.log('char : ', tempval);
    let res: number;
    if (tempval < 0) res = 126 + tempval;
    else res = tempval;

    return String.fromCharCode(res);
  }

  requestTrackingSearch(encodedTrackingNumber: string) {
    let bodyRequest = new URLSearchParams();
    bodyRequest.set('trackingId', encodedTrackingNumber);
    bodyRequest.set('carrier', 'Auto-Detect');
    bodyRequest.set('language', 'en');
    bodyRequest.set('country', 'Russian Federation');
    bodyRequest.set('platform', 'web-desktop');
    bodyRequest.set('wd', 'false');
    bodyRequest.set('c', 'false');
    bodyRequest.set('p', '3');
    bodyRequest.set('l', '1');

    bodyRequest.set(
      'se',
      '2048x1209,MacIntel,Gecko,Mozilla,Netscape,Google Inc.,4g,Intel Inc.,Intel(R) UHD Graphics 630,undefined,103,4096,2418'
    );

    this.http.post('http://localhost:4200/api', bodyRequest).subscribe(
      response => {
        console.log('RESPONSE DATA : ', response);
      },
      error => {
        console.log('ERROR DATA : ', error);
      }
    );
  }
}
