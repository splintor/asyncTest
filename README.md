## asyncTest

### The problem
This repository is meant to demonstrate what happens when you have a test the makes an XHR request,
but doesn't wait for it to return.

Setting `nock` request in this case doesn't help because we call `nock.cleanAll()` after each test,
so when the following test runs, the request from the previous test found no nock setting and it is being rejected,
and the following test is marked as failed.

This worked OK and didn't fail up until jest version 20.0.4, so if you run jest (and wallaby) with the code as it is now,
 tests will pass but you will see this errors:
 > ts-jest[versions] (WARN) Version 20.0.4 of jest installed has not been tested with ts-jest. If you're experiencing issues, consider using a supported version (>=22.0.0 <24.0.0). Please do not report issues in ts-jest if you are using unsupported versions.
 > (node:25759) UnhandledPromiseRejectionWarning: Error: Network Error
 > (node:25759) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 2)
 > (node:25759) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


However, if you install jest's latest version (version 23.6.0 at the time of this writing):
```
npm install jest@latest
```
 
 The second test in [app.spec.ts](test/app.spec.ts) will start failing with `Error: Nock: No match for request`.
 
 ### References
 
 This seems to be a known problem, as there is currently no way to tell jest (or wallaby)
 to ignore promises rejection that occurs after the test ends - see
 [issue 5311](https://github.com/facebook/jest/issues/5311) and
 [issue 5620](https://github.com/facebook/jest/issues/5620).
 
 ### Workaround
 
 One possible workaround can be found in `app.working.spec.ts`, which is using [wix-eventually](https://www.npmjs.com/package/wix-eventually).
 With this, we can make the test wait until the nocked request is done, and only then exit the test, so the following test will not be marked as failed.
 
 See [app.working.spec.ts](test/app.working.spec.ts) for a sample implementation.
