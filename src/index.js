// dpendencies
import fs from 'fs';
import play from 'simplayer-promise';
import Promise from 'bluebird';
import VoiceText from 'voicetext';

// @class TextReaderSimplayer
export default class TextReaderSimplayer {
  static get API_KEY() {
    return process.env.API_KEY;
  }

  static get _randomString() {
    return Math.random().toString(36).slice(-8);
  }

  /**
   * @constructor
   * @param {string} type
   * @param {object} [options={}]
   */
  constructor(type = 'text', options = {}) {
    this.name = 'simplayer';
    this.voice = new VoiceText(TextReaderSimplayer.API_KEY);
    this.readType = type;
    this.opts = {
      volume: 1,
      pitch: 1,
      speed: 1,
      ...options,
    };
  }

  /**
   * @method read
   * @param {token} - if toke.type is 'text', read as text;
   * @param {object} [options] - itako specify transformer options(undefined)
   * @returns {object|promise<undefined>} result - if the plugin read the token, it return the Promise
   */
  read(token) {
    const fileName = `${TextReaderSimplayer._randomString}.wav`;
    return new Promise ((resolve) => {
      this.voice
        .speaker(this.voice.SPEAKER.HIKARI)
        .speak('greeting', (err, buf) => {
          if (err) throw err;
          fs.writeFile(fileName, buf, 'binary', (err) => {
            if (err) throw err;
            play(fileName).then((result) => {
              fs.unlink(fileName, () => resolve());
            });
          });
        });
    });
  }
}

