import { Message } from "./Message";

export class WikiMessage implements Message {
    title: string;
    subtitle: string;
    summary: string;
    url: URL;

    constructor(title: string, subtitle: string, summary: string, url: URL) {
        this.title = title;
        this.subtitle = subtitle;
        this.summary = summary;
        this.url = url;
    }

    toMarkdown() {
        return `
## ${this.title}
#### ${this.subtitle}
${this.summary}

[Gå til artikkelen](${this.url})
`;
    }

}