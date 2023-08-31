import { assert } from "chai";
import { InteractionType } from "discord.js";

import { MockInteraction } from "../../src/mocks/MockInteraction";

suite("this is an example", () => {
  /**
   * Instantiation.
   */
  test("should instantiate", () => {
    const interaction = new MockInteraction(InteractionType.ApplicationCommand);
    assert.exists(interaction);
    assert.instanceOf(interaction, MockInteraction);
  });

  /**
   * Properties.
   */

  /**
   * Methods.
   */
  test("should be able to check if button", () => {
    const interaction = new MockInteraction(InteractionType.MessageComponent);
    assert.isTrue(interaction.isButton());
  });

  test("should be able to check if not button", () => {
    const interaction = new MockInteraction(InteractionType.ApplicationCommand);
    assert.isFalse(interaction.isButton());
  });

  test("should be able to check if slash command", () => {
    const interaction = new MockInteraction(InteractionType.ApplicationCommand);
    assert.isTrue(interaction.isChatInputCommand());
  });

  test("should be able to check if not slash command", () => {
    const interaction = new MockInteraction(InteractionType.MessageComponent);
    assert.isFalse(interaction.isChatInputCommand());
  });

  test("should be able to check if modal submit", () => {
    const interaction = new MockInteraction(InteractionType.ModalSubmit);
    assert.isTrue(interaction.isModalSubmit());
  });

  test("should be able to check if not modal submit", () => {
    const interaction = new MockInteraction(InteractionType.MessageComponent);
    assert.isFalse(interaction.isModalSubmit());
  });

  test("should be able to check if context menu", () => {
    const interaction = new MockInteraction(InteractionType.ApplicationCommand);
    assert.isTrue(interaction.isContextMenu());
  });

  test("should be able to check if not context menu", () => {
    const interaction = new MockInteraction(InteractionType.MessageComponent);
    assert.isFalse(interaction.isContextMenu());
  });

  test("should be able to check if autocomplete update", () => {
    const interaction = new MockInteraction(
      InteractionType.ApplicationCommandAutocomplete
    );
    assert.isTrue(interaction.isAutocomplete());
  });

  test("should be able to check if not autocomplete update", () => {
    const interaction = new MockInteraction(InteractionType.MessageComponent);
    assert.isFalse(interaction.isAutocomplete());
  });
});
