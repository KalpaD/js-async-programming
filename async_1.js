

const https = require('https');
const request = require('request-promise');


function exec() {

    console.log('Hello');

    setTimeout(() => {
        console.log('Goodbye!');
    }, 2000);

    console.log('Hello again!');
}


function asyncWithSetTimeOut_1() {

    for (var i= 0; i <= 3; i++){
        setTimeout(() => {
            console.log(i + ' second(s) elapsed');
        }, i * 1000);
    }
}

// ES6 sytanx
function asyncWithSetTimeOut_withLet() {
    // let create another varible scope.
    for (let i= 0; i <= 3; i++){
        setTimeout(() => {
            console.log(i + ' second(s) elapsed');
        }, i * 1000);
    }
}


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


function getUsingRequest() {
    var option =  {
        uri: 'https://httpbin.org/ip',
        json: true
    };

    return request(option)
    .then( (res) => {
        console.log('Recived response succesfully.');
        return res.origin;
    })
    .catch( (err) => {
        console.log('Recived an error.');
        return err.message;
    });
}


async function callAsync() {
    console.log(`start callAsync() at ${new Date()}`);
    let result_1 = await getUsingRequest();
    let result_2 = await getUsingRequest();
    let result_3 = await getUsingRequest();
    var result = [];
    result.push(result_1);
    result.push(result_2);
    result.push(result_3);
    console.log(result);
    console.log(`result recived at    ${new Date()}`);
}

//exec();
//asyncWithSetTimeOut_1();
//asyncWithSetTimeOut_withLet();
//callHttpBin();
//makeRequest();

//getUsingRequest();
callAsync();