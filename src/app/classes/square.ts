export class Square {

    private id: number;
    public sign: string;
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.sign = '';

    }

    get Id(): number {
        return this.id;
    }
}
