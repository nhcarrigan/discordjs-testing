/**
 * Parameters for the MockUser constructor.
 *
 * @interface UserParameters
 * @property {string} avatar - The avatar of the user.
 * @property {boolean} bot - Whether the user is a bot.
 * @property {boolean} system - Whether the user is a system user.
 * @property {number} discriminator - The discriminator of the user.
 * @property {string} username - The username of the user.
 */
export interface UserParameters {
  avatar: string;
  bot: boolean;
  system: boolean;
  discriminator: number;
  username: string;
}
