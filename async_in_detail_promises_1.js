
function Promise_(func) {
    var callback = null;
    this.then = function (cb) {
        callback = cb;
    };

    function resolve(value) {

        // force callback to be called in the next
        // iteration of the event loop, giving
        // callback a chance to be set by then()
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
        console.log('async job completed with value : '+ value);
    }, 2000);
}

dosomething().then(dowithDelay);

