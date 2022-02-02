import { NoteInterface } from "src/models/note.model";
import { Tag } from "src/store/note.reducer";

export default class Storage {
    constructor(
        public key: string = "noteStore"
    ){}

    getNoteList(): Array<NoteInterface> {
        const storageData = this.getJsonData(localStorage[this.key]);
        return Array.isArray(storageData.notes) ? storageData.notes : [];
    }

    getTags(): Array<Tag> {
        const storageData = this.getJsonData(localStorage[this.key]);
        return Array.isArray(storageData.tags) ? storageData.tags : [];
    }

    getJsonData(jsonData: string): {notes: NoteInterface[], tags: Tag[]} {
        try {
            return JSON.parse(jsonData);
        } catch(erorr) {
            return {
                notes: [],
                tags: []
            };
        }
    }

    saveData(notes: NoteInterface[], tags: Tag[] = []): void {
        const storageData = this.getJsonData(localStorage[this.key]);
        storageData.notes = [...notes];
        if(tags.length) {
            storageData.tags = [...tags];
        }
        localStorage[this.key] = JSON.stringify(storageData);
    }
}