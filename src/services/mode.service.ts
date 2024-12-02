import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class ModeService {
    public mode: BehaviorSubject<string> = new BehaviorSubject<string>('light');


    updateMode(value: string) {
        switch (value) {
            case ('light'): {
                this.mode.next(value);
            }
                break;
            case ('dark'): {
                this.mode.next(value);
            }
                break;
            default: {
                this.mode.next('light');
            }
        }
    }
}