# Matrix-wiki-bot

TypeScript Matrix bot that searches Wikipedia and sends a random daily article.

#### Running locally

Configure by editing `.env`: 
``` 
MX_SERVER_URL=https://matrix.org
MX_ACCESS_TOKEN=secret_token_here
```

Run with: 

```
npm install
npm run dev
```

#### Usage
- Invite the bot to a room
- Send `!wiki random`



#### TODO
- [X] Initialize and connect matrix-bot-sdk
- [X] Fetch random article
- [x] Markdown message formatting
- [ ] Send daily article
- [ ] Package and deploy with Nix
- [ ] Search articles with `!wiki search <query>` 

Made by following [the official matrix-bot-sdk guide](https://matrix.org/docs/guides/usage-of-matrix-bot-sdk).