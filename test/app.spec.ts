import * as nock from 'nock';
import {doSomething, makeAnotherRequest, state} from '../src/app';

describe("My async app", () => {
  afterEach(() => nock.cleanAll());

  it('should do something', () => {
    nock('http://localhost').get('/myRequest').reply(200, 'hello');
    doSomething();

    expect(state.somethiongWasDone).toBe(true);
  });

  it('should do some other thing', async () => {
    nock('http://localhost').get('/myOtherRequest').reply(200, 'hello');
    await makeAnotherRequest();
  });
});