import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ActionReducer, INIT, UPDATE } from "@ngrx/store";
import Storage from 'src/core/helpers/localstorage';
import { Note, NoteInterface } from 'src/models/note.model';
import * as NoteActions from './note.actions';

export const notesFeatureKey = 'notes';

export interface Tag {
  text: string;
  active: boolean;
}

export interface NoteState extends EntityState<NoteInterface> {
  noteList: NoteInterface[];
  filteredNoteList: NoteInterface[];
  lastId: number;
  selectedNote: NoteInterface | undefined;
  tags: Tag[];
  selectedTag: Tag | undefined;
}

export const adapter: EntityAdapter<NoteInterface> = createEntityAdapter<NoteInterface>();
const storage = new Storage(notesFeatureKey)

export const initialState: NoteState = adapter.getInitialState({
  noteList: [],
  filteredNoteList: [],
  lastId: 0,
  selectedNote: new Note(),
  tags: [],
  selectedTag: undefined
});

export const reducer = createReducer(
  initialState,
  on(NoteActions.InitState,
    (state) => {
      const noteList = storage.getNoteList();
      const tags = storage.getTags();
      const lastId = noteList[noteList.length - 1]?.id || 0;

      return adapter.setAll([], {
        ...state,
        noteList: [...noteList],
        filteredNoteList: [...noteList],
        lastId,
        tags: [...tags],
      })
    }
  ),
  on(NoteActions.AddNote,
    (state, action) => {
      const newNoteList = [...state.noteList, {...action.note, id: state.lastId + 1}];
      storage.saveData(newNoteList);
      return adapter.setAll([], {
        ...state,
        noteList: newNoteList,
        filteredNoteList: [...state.noteList, {...action.note, id: state.lastId + 1}],
        selectedNote: {...action.note, id: state.lastId + 1},
        lastId: state.lastId + 1
      })
    }
  ),
  on(NoteActions.RemoveNote,
    (state, action) => {
      const newNoteList = [...state.noteList]
      newNoteList.forEach((item, index) => {
        if(item.id === action.id) {
          newNoteList.splice(index, 1)
        }
      })

      const newTags: Tag[] = []
      newNoteList.forEach((item) => {
        const tagsInDescription = item.description.match(/(#[A-z0-9]+)/g)
          tagsInDescription?.forEach(tag => {
            if(newTags.filter(item => item.text === tag).length === 0) {
              newTags.push({
                text: tag,
                active: false
              })
            }
          })
      })

      storage.saveData(newNoteList, newTags);
      return adapter.setAll([], {
        ...state,
        noteList: newNoteList,
        filteredNoteList: newNoteList,
        tags: newTags
      })
    }
  ),
  on(NoteActions.SelectNote,
    (state, action) => {
      let selectedNote = state.noteList.find(
        note => note.id === action.id
      )
      const regex = new RegExp(`2067ef(\">${state.selectedTag?.text})`, 'g');
      if(selectedNote) {
        selectedNote = {
          ...selectedNote,
          formatedDescription: selectedNote.formatedDescription.replace(regex, '008000$1')
        }
      }

      return adapter.setAll([], {
        ...state,
        selectedNote
      })
    }
  ),
  on(NoteActions.UpdateNote,
    (state, action) => {
      const newNoteList = [...state.noteList]
      let updatedNoteIndex = newNoteList.findIndex(
        note => note.id === action.note.id
      )
      newNoteList[updatedNoteIndex] = action.note
      const newTags = [...state.tags]
      const tagsInDescription = action.note.description.match(/(#[A-z0-9]+)/g)
      tagsInDescription?.forEach(tag => {
        if(newTags.filter(item => item.text === tag).length === 0) {
          newTags.push({
            text: tag,
            active: false
          })
        }
      })

      storage.saveData(newNoteList, newTags);
      return adapter.setAll([], {
        ...state,
        noteList: [...newNoteList],
        filteredNoteList: [...newNoteList],
        selectedNote: action.note,
        tags: newTags
      })
    }
  ),
  on(NoteActions.FilterBySearch,
    (state, action) => {
      const tagText = state.selectedTag ? state.selectedTag.text : '';
      const newNoteList = state.noteList.filter(item =>
        item.title.includes(action.text) && item.description.includes(tagText)
      )
      return adapter.setAll([], {
        ...state,
        filteredNoteList: [...newNoteList],
        selectedNote: new Note()
      })
    }
  ),
  on(NoteActions.FilterByTag,
    (state, action) => {
      const newNoteList = state.noteList.filter(item =>
        item.description.includes(action.tag.text)
      )
      const newTags = [...state.tags];
      newTags.forEach((tag,index) => {
        if(tag.text === action.tag.text){
          newTags[index] = {...tag, active: true}
        }else{
          newTags[index] = {...tag, active: false}
        }
      })
      return adapter.setAll([], {
        ...state,
        filteredNoteList: [...newNoteList],
        tags: [...newTags],
        selectedNote: new Note(),
        selectedTag: action.tag
      })
    }
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectNoteList = (state: NoteState) => state.filteredNoteList;
export const selectSelectedNote = (state: NoteState) => state.selectedNote;
export const selectTags = (state: NoteState) => state.tags;
