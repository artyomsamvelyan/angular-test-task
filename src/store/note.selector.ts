import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromStore from './note.reducer';

const notesSelector = createFeatureSelector<fromStore.NoteState>(fromStore.notesFeatureKey);

export const getNoteList = createSelector(notesSelector, fromStore.selectNoteList);
export const getSelectedNote = createSelector(notesSelector, fromStore.selectSelectedNote);
export const getTags = createSelector(notesSelector, fromStore.selectTags);
