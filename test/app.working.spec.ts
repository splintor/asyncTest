import * as nock from 'nock';
import {doSomething, makeAnotherRequest, state} from '../src/app';
import * as eventually from 'wix-eventually';

describe("My async app (with eventually)", () => {
  afterEach(() => nock.cleanAll());

  it('should do something', async () => {
    const myRequestScope = nock('http://localhost').get('/myRequest').reply(200, 'hello');
    doSomething();

    expect(state.somethiongWasDone).toBe(true);

    await eventually(() => {
      expect(myRequestScope.isDone()).toBe(true);
    })
  });

  it('should do some other thing', async () => {
    nock('http://localhost').get('/myOtherRequest').reply(200, 'hello');
    await makeAnotherRequest();
  });
});