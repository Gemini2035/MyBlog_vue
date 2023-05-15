import { returnStringFunction } from './type_define';

class JsonRequest {
    request: Readonly<string>;
    content: Readonly<string | number>;
    parse: returnStringFunction = () => {
        return `?${this.request}=${this.content}`;
    }
    constructor (req: string, cont: string | number) {
        this.request = req;
        this.content = cont;
    }
}

export {
    JsonRequest
}