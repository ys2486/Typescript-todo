//Project Type
export enum ProjectStatus {
  Active,
  finished,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public manday: number,
    public status: ProjectStatus
  ) {}
}
