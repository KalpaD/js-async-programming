const https = require('https');
const request = require('request-promise');

/**
 * This function demonestrate the use of setTimeOut method to 
 * demonestrate basics of asynchronous programming in js.
 */
function exec() {

    console.log('Hello');

    // scedule a task to be run in 2000 milliseconds.
    setTimeout(() => {
        console.log('Goodbye!');
    }, 2000);

    console.log('Hello again!');
}

/**
 * A bit more complex exmplae of the exec() function where
 * we use a for loop to sceadule serise of tasks to show the elapsed secods.
 * The results will be 
 *  4 second(s) elapsed
 *  4 second(s) elapsed
 *  4 second(s) elapsed
 *  4 second(s) elapsed
 * 
 * This happens beacuse the when the actual task starts to run the varibale i has alrady updated to final value.
 * You need to undesrtand the varibale scope and execution stack in javascript to unsedersand the theory behind this.
 */
function asyncWithSetTimeOut_1() {

    for (var i= 0; i <= 3; i++){
        setTimeout(() => {
            console.log(i + ' second(s) elapsed');
        }, i * 1000);
    }
}
/**
 * This function show how to fix the problem with the code in asyncWithSetTimeOut_1() using the ES6 sytanx where
 * we use let key word to create a new varibale scope for every task.
 * 
 * The other way to solve this problem is to use the IIFE.
 */
function asyncWithSetTimeOut_withLet() {
    // let create another varible scope.
    for (let i= 0; i <= 3; i++){
        setTimeout(() => {
            console.log(i + ' second(s) elapsed');
        }, i * 1000);
    }
}

/**
 * This function show how to use the node http code library to make a http call
 * and consume the result in a asyncronous way.
 */
async function callHttpBin() {
    
    let result = https.get('https://httpbin.org/ip', (res) => {

        let data = '';
 
        // A chunk of data has been recieved.
        res.on('data', (chunk) => {
            data += chunk;
        });
 
        // The whole response has been received. Print out the result.
        res.on('end', () => {
            console.log(JSON.parse(data).origin);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
    }


const makeRequest = async () => {  
    await callHttpBin();
    console.log('done');
};

/**
 * This function use the 'request-promise' libarary to call and HTTP resource call
 * and that libaray natively return a Promise.
 */
function getUsingRequestPromise() {
    var option =  {
        uri: 'https://httpbin.org/ip',
        json: true
    };

    return request(option)
    .then( (res) => {
        console.log(`Recived response succesfully at ${new Date()}`);
        return res.origin;
    })
    .catch( (err) => {
        console.log('Recived an error.');
        return err.message;
    });
}

/**
 *  This function demonestrate the use of 'async' and 'await' technique in ES6 to
 *  make asyncronous call and aggrerage the results avoiding the callback hell.
 * 
 * The results will be like following
 * 
 *  Start callAsync() at Mon Dec 25 2017 13:55:51 GMT+1100 (AEDT)
 *  Recived response succesfully at Mon Dec 25 2017 13:55:52 GMT+1100 (AEDT)
 *  Recived response succesfully at Mon Dec 25 2017 13:55:54 GMT+1100 (AEDT)
 *  Recived response succesfully at Mon Dec 25 2017 13:55:56 GMT+1100 (AEDT)
 *  [ '60.242.81.98', '60.242.81.98', '60.242.81.98' ]
 *  Final result recived at    Mon Dec 25 2017 13:55:56 GMT+1100 (AEDT)
 * 
 */
async function showAsyncAwait() {
    console.log(`Start callAsync() at ${new Date()}`);
    let result_1 = await getUsingRequestPromise();
    let result_2 = await getUsingRequestPromise();
    let result_3 = await getUsingRequestPromise();
    var result = [];
    result.push(result_1);
    result.push(result_2);
    result.push(result_3);
    console.log(result);
    console.log(`Final result recived at    ${new Date()}`);
}

//exec();
//asyncWithSetTimeOut_1();
//asyncWithSetTimeOut_withLet();
//callHttpBin();
//makeRequest();

//getUsingRequest();
showAsyncAwait();