/**
 * This code demonestrate Promises which are 
 * the stateful , and then function return another Promise.
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

    function handle(handler) {
        console.log(`executing handle() state = ${state} at ${new Date().getMilliseconds()}`);
        if (state == 'pending')  {
            deferred = handler;
            return;
        }

        if (!handler.onResolved) {
            handler.resolve(value);
            return;
          }
      
        var ret = handler.onResolved(value);
        handler.resolve(ret);
    }
    
    this.then = function(onResolved) {
        return new Promise_(function(resolve) {
          handle({
            onResolved: onResolved,
            resolve: resolve
          });
        });
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
    return 16;
})
.then(function(value)  {
    console.log(`Got value again : ${value}`);
});



