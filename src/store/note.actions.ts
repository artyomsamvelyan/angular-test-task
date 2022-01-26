import { createAction, props } from '@ngrx/store';
import { NoteInterface } from 'src/models/note.model';
import { Tag } from './note.reducer';

export const AddNote = createAction(
  '[Action] Add Note',
  props<{ note: NoteInterface }>()
);

export const RemoveNote = createAction(
  '[Action] Remove Note',
  props<{ id: number }>()
);

export const SelectNote = createAction(
  '[Action] Select Note',
  props<{ id: number }>()
);

export const UpdateNote = createAction(
  '[Action] Update Note',
  props<{ note: NoteInterface }>()
);

export const FilterBySearch = createAction(
  '[Action] Filter By Search',
  props<{ text: string }>()
);

export const FilterByTag = createAction(
  '[Action] Filter By Tag',
  props<{ tag: Tag }>()
);
