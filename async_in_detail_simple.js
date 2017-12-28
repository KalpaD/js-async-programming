
// call backs

function doSomething(callback) {
    var value = 007;
    callback(value);
}

doSomething( function(value) {
    console.log(`Got a value : ${value}`)
});

// improved version with littel suger

function doSomething_improved() {
    return {
        then : function(callback) {
            var value = 008;
            callback(value);
        }
    }
}





