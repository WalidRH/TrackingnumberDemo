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

    const headers = {
      Host: ' parcelsapp.com',
      Connection: ' keep-alive',
      'Content-Length': ' 304',
      Pragma: ' no-cache',
      'Cache-Control': ' no-cache',
      'sec-ch-ua': ' "Opera";v="77", "Chromium";v="91", ";Not A Brand";v="99"',
      Accept: ' application/json, text/javascript, */*; q=0.01',
      'X-CSRF-Token':
        ' rYE1JBdIannmMzWhx1H8b7YrIoMEkOcs17H4ot9KoXEb7NVgcy+Ny557gk7pcENaLSWMt2eUM6nEiH8bb2OAsg==',
      'X-Requested-With': ' XMLHttpRequest',
      'sec-ch-ua-mobile': ' ?0',
      'User-Agent':
        ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 OPR/77.0.4054.172',
      'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
      Origin: ' https://parcelsapp.com',
      'Sec-Fetch-Site': ' same-origin',
      'Sec-Fetch-Mode': ' cors',
      'Sec-Fetch-Dest': ' empty',
      Referer: ' https://parcelsapp.com/en/tracking/',
      'Accept-Encoding': ' gzip, deflate, br',
      'Accept-Language': ' en-US,en;q=0.9',
      'Access-Control-Allow-Origin': '*'
    };
    this.http
      .post('https://parcelsapp.com/api/v2/parcels', bodyRequest, { headers })
      .subscribe(
        response => {
          console.log('RESPONSE DATA : ', response);
        },
        error => {
          console.log('ERROR DATA : ', error);
        }
      );
  }
}
