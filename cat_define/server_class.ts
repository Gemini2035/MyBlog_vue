import { returnStringFunction } from './type_define';

class JsonRequest {
    request: Readonly<string>;
    content: Readonly<string>;
    parse: returnStringFunction = () => {
        return `?${this.request}=${this.content}`;
    }
    constructor (req: string, cont: string) {
        this.request = req;
        this.content = cont;
    }
}

export {
    JsonRequest
}