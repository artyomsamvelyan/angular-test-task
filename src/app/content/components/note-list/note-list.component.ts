import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromSelector from '../../../../store/note.selector';
import * as fromActions from '../../../../store/note.actions';
import { NoteState, Tag } from 'src/store/note.reducer';
import { NoteInterface } from 'src/models/note.model';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notesList: NoteInterface[] = []
  tags: Tag[] = []

  constructor(
    private $store: Store<NoteState>,
  ) {}

  ngOnInit(): void {
    this.$store.select(fromSelector.getNoteList).subscribe(
      (noteList) => {
        return this.notesList = [...noteList]
      }
    );
    this.$store.select(fromSelector.getTags).subscribe(
      (tags) => {
        return this.tags = [...tags]
      }
    );
  }

  addNote() {
    const newNote = {
      id: 0,
      title: '',
      description: '',
      formatedDescription: '',
      updatedAt: Date.now()
    }
    this.$store.dispatch(fromActions.AddNote({note: newNote}))
  }

  removeNote(id: number) {
    this.$store.dispatch(fromActions.RemoveNote({id}))
  }

  selectNote(id: number) {
    this.$store.dispatch(fromActions.SelectNote({id}))
  }

  searchNote(event: any) {
    this.$store.dispatch(fromActions.FilterBySearch({text: event.target.value}))
  }

  filterNotesByTag(tag: Tag) {
    this.$store.dispatch(fromActions.FilterByTag({tag}))
  }
}
