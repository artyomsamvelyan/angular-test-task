import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, NoteInterface } from 'src/models/note.model';
import * as fromSelector from '../../../../store/note.selector';
import * as fromActions from '../../../../store/note.actions';
import { NoteState } from 'src/store/note.reducer';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  selectedNote: NoteInterface = new Note();
  showDescriptionInput: boolean = false;

  constructor(
    private $store: Store<NoteState>,
  ) { }

  ngOnInit(): void {
    this.$store.select(fromSelector.getSelectedNote).subscribe(
      (selectedNote) => {
        const descElement = document.querySelector<HTMLElement>('#description-text')
        if(descElement instanceof HTMLElement) {
          descElement.innerHTML = selectedNote?.formatedDescription || "";
        }
        this.showDescriptionInput = false
        return this.selectedNote = selectedNote || this.selectedNote
      }
    );
  }

  updateNote(event: any) {
    const key = event.target.name || event.target.getAttribute('name')
    let value = event.target.value || event.target.innerHTML
    let formatedDescription = this.selectedNote.formatedDescription
    if(key === 'description') {
      formatedDescription = value.replaceAll(/(#[A-z0-9]+)/g, `<span style="color: white;background: #2067ef;padding: 3px 8px;border-radius: 8px;">$1</span>`)
      this.showDescriptionInput = false
    }
    const updatedNote: NoteInterface = {
      ...this.selectedNote,
      [key]: value,
      formatedDescription: formatedDescription
    }
    this.$store.dispatch(fromActions.UpdateNote({note: updatedNote}))
  }

  toggleDescription() {
    this.showDescriptionInput = !this.showDescriptionInput
  }

}
