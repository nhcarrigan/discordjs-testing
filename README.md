# Discord.js Testing Lib

This is just a basic tool for mocking Discord.js classes for testing purposes.

## Usage

Here's a basic example from one of our projects:

```ts
import { assert } from "chai";
import { ApplicationCommandOptionType, ChannelType } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
  MockWebhook,
} from "discordjs-testing";

import { help } from "../../src/commands/help";

const guild = new MockGuild({
  name: "Test Guild",
});
const bot = new MockUser({
  username: "Test Bot",
  avatar: "test",
  discriminator: 1234,
  bot: true,
  system: false,
});
const user = new MockUser({
  username: "Test User",
  avatar: "test",
  discriminator: 1234,
  bot: false,
  system: false,
});
const member = new MockMember({
  guild,
  user,
});
const channel = new MockChannel({
  name: "test-channel",
  guild,
  type: ChannelType.GuildText,
});
const debugHook = new MockWebhook({
  channel,
  user: bot,
});

suite("Help command", () => {
  test("should respond correctly", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "help",
      guild,
      bot,
      user,
      member,
      channel,
      options: [
        {
          name: "question",
          value: "How do I get Naomi to do work for me?",
          type: ApplicationCommandOptionType.String,
        },
      ],
    });
    await help.run({ ...bot, env: { debugHook } } as never, command.typeCast());
    assert.equal(command.replies.length, 1);
    assert.strictEqual(
      command.replies[0]?.content,
      "Greetings! I am Melody Iuvo, Naomi's personal assistant. My role here is to provide access to information you might need when finding your way around our community. Use my `/faq` command if you have a question!\n\nI want to ensure you have fun while you are here, so I also manage a few other facets of our group."
    );
  });
});
```

Note that while we use Mocha/Chai, this package should work with your favourite testing framework.

For the full API documentation, please see our [documentation site](https://djs-testing.nhcarrigan.com).

## Feedback and Bugs

If you have feedback or a bug report, please feel free to open a GitHub issue!

## Contributing

If you would like to contribute to the project, you may create a Pull Request containing your proposed changes and we will review it as soon as we are able! Please review our [contributing guidelines](CONTRIBUTING.md) first.

## Code of Conduct

Before interacting with our community, please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This software is licensed under our [global software license](https://docs.nhcarrigan.com/#/license).

Copyright held by Naomi Carrigan.

## Contact

We may be contacted through our [Chat Server](http://chat.nhcarrigan.com) or via email at `contact@nhcarrigan.com`.
