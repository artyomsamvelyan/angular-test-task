import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Actions, Effect, ofType, OnInitEffects} from '@ngrx/effects';

@Injectable()
export class NoteEffects implements OnInitEffects {
    ngrxOnInitEffects() {
        console.log(444444)
        return { type: '[Action] Init State' };
    }
}