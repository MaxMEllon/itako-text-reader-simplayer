// dependencies
import assert from 'assert';

// target
import ItakoTextReaderSimplayer from '../src/index';

// specs
describe('ItakoTextReaderSimplayer', () => {
  it('', async () => {
    const itako = new ItakoTextReaderSimplayer('text');
    await itako.read({
      value: 'わこつ',
    });
  });
});
