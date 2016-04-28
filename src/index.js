// dpendencies
import fs from 'fs';
import play from 'simplayer-promise';
import Promise from 'bluebird';
import VoiceText from 'voicetext';

// @class TextReaderSimplayer
export default class TextReaderSimplayer {
  static get notExistApiKey() {
    return process.env.API_KEY === '' || process.env.API_KEY == null;
  }

  static get API_KEY() {
    if (TextReaderSimplayer.notExistApiKey) {
      throw new Error('You must execute `$ export API_KEY=XXXXXXXXXXXXX`');
    }
    return process.env.API_KEY;
  }

  static get createFileName() {
    let tempDirectory = '/tmp/';
    if (process.platform === 'win32') {
      tempDirectory = 'c:\\Temp\\';
    }
    return `${tempDirectory}${Math.random().toString(36).slice(-8)}.wav`;
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
      volume: 100,
      pitch: 100,
      speed: 100,
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
    const fileName = TextReaderSimplayer.createFileName;
    return new Promise((resolve) => {
      this.voice
      .speaker(this.voice.SPEAKER.HIKARI)
      .volume(this.opts.volume)
      .speed(this.opts.speed)
      .pitch(this.opts.pitch)
      .speak(token.value, (fetchError, buf) => {
        if (fetchError) throw fetchError;
        fs.writeFile(fileName, buf, 'binary', (writeError) => {
          if (writeError) throw writeError;
          play(fileName).then(() => {
            fs.unlink(fileName, () => resolve());
          });
        });
      });
    });
  }
}

