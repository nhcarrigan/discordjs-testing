import {
  APIApplicationCommandAttachmentOption,
  APIApplicationCommandBooleanOption,
  APIApplicationCommandChannelOption,
  APIApplicationCommandIntegerOption,
  APIApplicationCommandMentionableOption,
  APIApplicationCommandNumberOption,
  APIApplicationCommandRoleOption,
  APIApplicationCommandStringOption,
  APIApplicationCommandSubcommandGroupOption,
  APIApplicationCommandSubcommandOption,
  APIApplicationCommandUserOption,
  ApplicationCommandOptionType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

/**
 * Helper class for parsing command data.
 */
export class CommandDataHelper {
  private readonly _command: RESTPostAPIChatInputApplicationCommandsJSONBody;
  private readonly _subcommandGroups: APIApplicationCommandSubcommandGroupOption[];
  private readonly _subcommands: APIApplicationCommandSubcommandOption[];
  private readonly _data: { name: string; description: string };
  /**
   * @param {RESTPostAPIChatInputApplicationCommandsJSONBody} command The command data to parse.
   * @public
   */
  constructor(command: RESTPostAPIChatInputApplicationCommandsJSONBody) {
    this._command = command;
    this._subcommandGroups = this.parseSubcommandGroups();
    this._subcommands = this.parseSubcommands();
    this._data = {
      name: this._command.name,
      description: this._command.description,
    };
  }

  /**
   * Parses the subcommand groups from the command data options.
   *
   * @returns {APIApplicationCommandSubcommandGroupOption[]} The subcommand groups.
   * @private
   */
  private parseSubcommandGroups(): APIApplicationCommandSubcommandGroupOption[] {
    return (
      (this._command.options?.filter(
        (opt) => opt.type === ApplicationCommandOptionType.SubcommandGroup
      ) as APIApplicationCommandSubcommandGroupOption[]) || []
    );
  }

  /**
   * Parses the subcommands from the command data options.
   *
   * @returns {APIApplicationCommandSubcommandOption[]} The subcommands.
   * @private
   */
  private parseSubcommands(): APIApplicationCommandSubcommandOption[] {
    if (this._subcommandGroups.length) {
      return this._subcommandGroups
        .flatMap(
          (group) =>
            group.options?.filter(
              (opt) => opt.type === ApplicationCommandOptionType.Subcommand
            ) as APIApplicationCommandSubcommandOption[]
        )
        .filter(
          (command, index, self) =>
            command && self.findIndex((c) => c.name === command.name) === index
        );
    }
    return (
      (this._command.options?.filter(
        (opt) => opt.type === ApplicationCommandOptionType.Subcommand
      ) as APIApplicationCommandSubcommandOption[]) || []
    );
  }

  /**
   * @type {APIApplicationCommandSubcommandGroupOption[]}
   * @public
   * @readonly
   */
  public get subcommandGroups(): APIApplicationCommandSubcommandGroupOption[] {
    return this._subcommandGroups;
  }
  /**
   * @type {APIApplicationCommandSubcommandOption[]}
   * @public
   * @readonly
   */
  public get subcommands(): APIApplicationCommandSubcommandOption[] {
    return this._subcommands;
  }
  /**
   * @type {{ name: string; description: string }}
   * @public
   * @readonly
   */
  public get data(): { name: string; description: string } {
    return this._data;
  }
  /**
   * Gets a specific subcommand group by name.
   *
   * @param {string} name The name of the subcommand group to get.
   * @returns {APIApplicationCommandSubcommandGroupOption | undefined} The subcommand group.
   * @public
   */
  public getSpecificGroup(
    name: string
  ): APIApplicationCommandSubcommandGroupOption | undefined {
    return this._subcommandGroups.find((group) => group.name === name);
  }
  /**
   * Gets a specific subcommand by name.
   *
   * @param {string} name The name of the subcommand to get.
   * @returns {APIApplicationCommandSubcommandOption | undefined} The subcommand.
   * @public
   */
  public getSpecificSubcommand(
    name: string
  ): APIApplicationCommandSubcommandOption | undefined {
    return this._subcommands.find((cmd) => cmd.name === name);
  }
  /**
   * Gets all subcommands for a specific group.
   *
   * @param {string} group The name of the group.
   * @returns {APIApplicationCommandSubcommandOption[]} The subcommands.
   * @public
   */
  public getSubcommandsForGroup(
    group: string
  ): APIApplicationCommandSubcommandOption[] {
    const target = this._subcommandGroups.find((g) => g.name === group);
    if (!target) {
      return [];
    }
    return (
      (target.options?.filter(
        (opt) => opt.type === ApplicationCommandOptionType.Subcommand
      ) as APIApplicationCommandSubcommandOption[]) || []
    );
  }

  /**
   * Gets an option from a command.
   *
   * @template T The type of the option - defined in Discord.js.
   * @param {number} optionIndex The index of the option.
   * @returns {T | null} The option.
   */
  public getCommandOption<
    T extends
      | APIApplicationCommandStringOption
      | APIApplicationCommandIntegerOption
      | APIApplicationCommandBooleanOption
      | APIApplicationCommandUserOption
      | APIApplicationCommandChannelOption
      | APIApplicationCommandRoleOption
      | APIApplicationCommandMentionableOption
      | APIApplicationCommandNumberOption
      | APIApplicationCommandAttachmentOption
  >(optionIndex: number): T | null {
    const target = this._command;
    if (!target?.options?.[optionIndex]) {
      return null;
    }

    return target.options[optionIndex] as T;
  }

  /**
   * Gets an option from a subcommand.
   *
   * @template T The type of the option - defined in Discord.js.
   * @param {string} subcommand The name of the subcommand.
   * @param {number} optionIndex The index of the option.
   * @returns {T | null} The option.
   */
  public getSubcommandOption<
    T extends
      | APIApplicationCommandStringOption
      | APIApplicationCommandIntegerOption
      | APIApplicationCommandBooleanOption
      | APIApplicationCommandUserOption
      | APIApplicationCommandChannelOption
      | APIApplicationCommandRoleOption
      | APIApplicationCommandMentionableOption
      | APIApplicationCommandNumberOption
      | APIApplicationCommandAttachmentOption
  >(subcommand: string, optionIndex: number): T | null {
    const target = this._subcommands.find((cmd) => cmd.name === subcommand);
    if (!target?.options?.[optionIndex]) {
      return null;
    }
    return target.options[optionIndex] as T;
  }
}
