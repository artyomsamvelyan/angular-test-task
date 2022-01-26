export interface NoteInterface {
  id: number;
  title: string;
  description: string;
  formatedDescription: string;
  updatedAt: number;
}

export class Note implements NoteInterface {
  constructor(
    public id: number = 0,
    public title: string = '',
    public description: string = '',
    public formatedDescription: string = '',
    public updatedAt: number = new Date().getTime()
  ) {}
}
