// dependencies
import assert from 'assert';

// target
import ItakoTextReaderSimplayer from '../src/index';

// specs
describe('ItakoTextReaderSimplayer', () => {
  it('', done => {
    let itako = new ItakoTextReaderSimplayer('text');
    itako.read({
      type: 'text'
    }).then(() => {
      done();
    });
  });
});
