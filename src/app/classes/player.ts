export class Player {

    private name: string;
    private id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    get Name(): string {
        return this.name;
    }

    get Id(): number {
        return this.id;
    }

}