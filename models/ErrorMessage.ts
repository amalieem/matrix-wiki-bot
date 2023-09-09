import { Message } from "./Message";

export class ErrorMessage implements Message {
    title = "Feil";
    errorText = "Ooops det skjedde en feil :(";


    toMarkdown() {
        return `
## ${this.title}
#### ${this.errorText}
`;
    }
}