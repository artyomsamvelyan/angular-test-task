import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { NoteListComponent } from './content/components/note-list/note-list.component';
import { NoteCardComponent } from './content/components/note-card/note-card.component';
import { EffectsModule } from '@ngrx/effects';
import * as fromStore from '../store/note.reducer';
import { StoreModule } from '@ngrx/store';
import { SortPipe } from 'src/pipes/sort.pipe';
import { NoteEffects } from 'src/store/note.effects';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    NoteListComponent,
    NoteCardComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({'notes': fromStore.reducer}),
    EffectsModule.forRoot([NoteEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
