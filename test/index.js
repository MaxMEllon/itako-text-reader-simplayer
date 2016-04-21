// dependencies
import assert from 'assert';

// target
import ItakoTextReaderSimplayer from '../src/index';

// specs
describe('ItakoTextReaderSimplayer', () => {
  it('', done => {
    const itako = new ItakoTextReaderSimplayer('text');
    itako.read({
      value: 'わこつ',
    }).then(() => {
      done();
    });
  });
});
