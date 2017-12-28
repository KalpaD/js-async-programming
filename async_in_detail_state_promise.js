/**
 * This code demonestrate the stateful Promises 
 * 
 * As we learned in 'async_in_detail_simple_promise' Promises should have state
 * otherwise if the Promise try to get resolved before the callback get set
 * there will be errors.
 * 
 */

 function Promise_(fn) {

    var state = 'pending';
    var value;
    var deferred = null;

    function resolve(newValue) {
        console.log(`executing resolve() at ${new Date().getMilliseconds()}`);
        value = newValue;
        state = 'resolved';

        if (deferred) {
            console.log(`executing deferred block at ${new Date().getMilliseconds()}`);
            handle(deferred);
        }
    }

    function handle(onResolved) {
        console.log(`executing handle() state = ${state} at ${new Date().getMilliseconds()}`);
        if (state == 'pending')  {
            deferred = onResolved;
            return;
        }

        onResolved(value);
    }
    
    this.then = function(onResolved) {
        console.log(`executing then() at ${new Date().getMilliseconds()}`);
        handle(onResolved);
    };

    fn(resolve);
 }

function dosomething() {
    return new Promise_(function (resolve) {
        var value = 42;
        resolve(value);
    });
}

var promise = dosomething();

promise.then(function(value)  {
    console.log(`Got value : ${value}`);
});

promise.then(function(value)  {
    console.log(`Got the same value again : ${value}`);
});


