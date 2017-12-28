
/**
 * This code demonestrate the basics of Promise 
 * 
 * The key concepts are then() and resolve()
 * 
 * then() takes the function that client wants to invoke asynchronously
 * and resolve is the Promise utility to get the value of the client's function.
 * 
 */

function Promise_(func) {
    console.log(`executing Promise_ at ${new Date().getMilliseconds()}`);
    var callback = null;
    this.then = function (cb) {
        console.log(`executing then() at ${new Date().getMilliseconds()}`);
        callback = cb;
    };

    function resolve(value) {

        // force callback to be called in the next
        // iteration of the event loop, giving
        // callback a chance to be set by then()

        // if we remove this setTimeOut function
        // the callback invokation will fail with
        // TypeError: callback is not a function

        // it is beacuse the resolve is getting invoked before then set the value of
        // callback.
        console.log(`executing resolve() at ${new Date().getMilliseconds()}`);
        setTimeout(function() {
            callback(value);
        }, 1);
    }

    func(resolve);
}

function dosomething() {
    return new Promise_(function (resolve) {
        var value = 42;
        resolve(value);
    });
}

var dowithDelay = function doWithDelay(value) {
    setTimeout(function () {
        console.log(`async job completed with value ${value}`);
    }, 2000);
}

dosomething().then(dowithDelay);

