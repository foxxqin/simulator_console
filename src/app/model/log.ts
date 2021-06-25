export class Log {
    userId: string;
    id: string;
    category: string;
    subCategory: string;
    action: string;
    createdAt: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
