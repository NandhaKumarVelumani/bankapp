console.log(2 ** 53 - 1); //this is the max possible num that js can 
//store because it stores num based on 64 bit base 2(binary)
//or
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 + 4); //this confuses js see the console the diff bw 1st and 3rd value

//to solve this issue es6 introduces a primitive datatype called BigInt
//ways to create Bigint
//1. using n at the end
console.log(9007199254740995n); //see js previouly cannot print this number using int datatype
//2. using bigInt() constructor
console.log(BigInt(200000000)); //IMPORTANT! if number gets too long it will not work. its just convert int to bigInt

//you cannot perform operations on bigInt with int
// console.log(20n + 20); //typeError: cannot mix int with bigInt

//you cannot perform Math operations on bigInt
// console.log(Math.sqrt(4n));

//you can perform basic math operations on bigInt with bigInt
console.log(20n + 20n); //yields 40n

//bigInt and int are diff datatypes
console.log(20n === 20); //false
console.log(20n == 20); //true

const now = new Date(); //this will set now to the current year date day and time acc to current country standard
console.log(now); 

const customDate = new Date('December 24 2018');
console.log(customDate); //will log  Mon Dec 24 2018 00:00:00 GMT+0530 (India Standard Time)

const wholeDateFormat = new Date(2018, 0, 2, 10, 30);
console.log(wholeDateFormat); //will log  Tue Jan 02 2018 10:30:00 GMT+0530 (India Standard Time);

//Methods on date
//get
console.log(wholeDateFormat.getFullYear());
console.log(wholeDateFormat.getYear()); //dont use this its wierd
console.log(wholeDateFormat.getMonth()); //month in js is 0 based like arrays
console.log(wholeDateFormat.getDate());
console.log(wholeDateFormat.getDay()); //will log day in numbers not words like mon/tue/wed
console.log(wholeDateFormat.getHours());
console.log(wholeDateFormat.getMinutes());
console.log(wholeDateFormat.getTime()); //will print current millisecond since 1970 jan 1(time stamp);

//set
console.log(wholeDateFormat.setFullYear(2019)); //will return the timestamp
console.log(wholeDateFormat); //year 2019 set
//like all above get method the same is available with set method

