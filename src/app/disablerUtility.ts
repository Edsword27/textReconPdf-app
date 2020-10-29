import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DisablerUtility {
    public OnDisable = new Subject<boolean>();

    public emitDisabler() : void {
        this.OnDisable.next(true);
    }
}