'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: 'Nandhakumar Velumani',
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		'2019-11-18T21:31:17.178Z',
		'2019-12-23T07:42:02.383Z',
		'2020-01-28T09:15:04.904Z',
		'2020-04-01T10:17:24.185Z',
		'2021-07-17T14:11:59.604Z',
		'2021-07-18T17:01:17.194Z',
		'2021-07-19T23:36:17.929Z',
		'2021-07-20T10:51:36.790Z',
	],
	currency: 'INR',
	locale: 'en-IN', // de-DE
};

const account2 = {
	owner: 'Sanju Hariharan',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		'2019-11-01T13:15:33.035Z',
		'2019-11-30T09:48:16.867Z',
		'2019-12-25T06:04:23.907Z',
		'2020-01-25T14:18:46.235Z',
		'2020-02-05T16:33:06.386Z',
		'2020-04-10T14:43:26.374Z',
		'2020-06-25T18:49:59.371Z',
		'2020-07-26T12:01:20.894Z',
	],
	currency: 'USD',
	locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const createUserName = accounts => {
	accounts.forEach(acc => {
		acc.userName = acc.owner
			.split(' ')
			.reduce((acc, name) => acc + name[0], '')
			.toLowerCase();
	});

	console.log(accounts);
};
createUserName(accounts);

const calcDayspassed = date =>
	Math.round(Math.abs(new Date() - date) / (1000 * 60 * 60 * 24));

const formatCur = (value, locale, currency) =>
	new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
	}).format(value);

const setLogOutTimer = () => {
	let time = 30;
	const tick = () => {
		let min = Math.trunc(time / 60)
			.toString()
			.padStart(2, 0);
		let sec = (time % 60).toString().padStart(2, 0);

		labelTimer.textContent = `${min} : ${sec}`;

		//cancel the timer if timer reaches 0
		if (time === 0) {
			containerApp.style.opacity = 0;
			labelWelcome.textContent = 'Log in to get started';
			clearInterval(tick);
		}

		time--;
	};

	timer = setInterval(tick, 1000);
	return timer;
};

const displayMovements = (acc, sort = false) => {
	containerMovements.innerHTML = '';

	const movs = sort
		? acc.movements.slice().sort((a, b) => a - b)
		: acc.movements;

	movs.forEach((mov, i) => {
		let Movdate = new Date(acc.movementsDates[i]);

		const daysPassed = calcDayspassed(Movdate);
		console.log(daysPassed);

		let daysAfter3days = `${Movdate.getDate().toString().padStart(2, 0)}/${(
			Movdate.getMonth() + 1
		)
			.toString()
			.padStart(2, 0)}/${Movdate.getFullYear()}`;

		// console.log(daysAfter3days);

		let date = '';
		if (daysPassed === 0) {
			date = 'today';
		} else if (daysPassed === 1) {
			date = 'yesterday';
		} else if (daysPassed === 2) {
			date = '1 days ago';
		} else if (daysPassed === 3) {
			date = '2 days ago';
		} else {
			date = daysAfter3days;
		}

		console.log(date);

		const formatMov = formatCur(mov, acc.locale, acc.currency);

		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${type}">${
			i + 1
		} ${type}</div>
                    <div class="movements__date">${date}</div>
                    <div class="movements__value">${formatMov}</div>
                 </div>`;
		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};

const calcDispBalance = acc => {
	acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
	labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const updateSummary = acc => {
	// console.log(acc);
	acc.deposit = Math.round(
		acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov)
	);
	acc.withdraw = Math.round(
		acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
	);
	// console.log(deposit);
	// console.log(withdraw);
	acc.int = Math.round(
		acc.movements
			.filter(mov => mov > 0)
			.map(depo => (depo * 1.2) / 100)
			.reduce((acc, depo) => {
				// console.log(arr);
				return acc + depo;
			}, 0)
	);

	//update DOM
	labelSumIn.textContent = formatCur(acc.deposit, acc.locale, acc.currency);
	labelSumOut.textContent = formatCur(
		Math.abs(acc.withdraw),
		acc.locale,
		acc.currency
	);
	labelSumInterest.textContent = formatCur(acc.int, acc.locale, acc.currency);
};
const updateUI = function (acc) {
	// console.log(acc);
	//upddate movements
	displayMovements(acc);
	//update balance
	calcDispBalance(acc);
	//update summary
	updateSummary(acc);
};

//EVENT LISTENERS
let currentUser, timer;
btnLogin.addEventListener('click', e => {
	e.preventDefault();

	currentUser = accounts.find(acc => acc.userName === inputLoginUsername.value);
	console.log(currentUser);
	if (currentUser?.pin === Number(inputLoginPin.value)) {
		//WELCOME MESSAGE & UI
		containerApp.style.opacity = 1;

		labelWelcome.textContent = `Welcome to the Bankist, ${
			currentUser.owner.split(' ')[0]
		}`;

		//Date of the account
		const today = new Date();
		// console.log(today);

		//update current balance date
		labelDate.textContent = `${today
			.getDate()
			.toString()
			.padStart(2, 0)}/${today
			.getMonth()
			.toString()
			.padStart(2, 0)}/${today.getFullYear()}`;

		//clear form field
		inputLoginUsername.value = inputLoginPin.value = '';

		if (timer) clearInterval(timer);
    setLogOutTimer()

		updateUI(currentUser);

		//user with every details
		// console.log(currentUser);
	}
});

let sorted = false;
btnSort.addEventListener('click', e => {
	e.preventDefault();

	displayMovements(currentUser, !sorted);
	sorted = !sorted;
});

btnTransfer.addEventListener('click', e => {
	e.preventDefault();

	//reset the timer
	clearInterval(timer);
	setLogOutTimer();

	const recieverAcc = accounts.find(
		acc => acc.userName === inputTransferTo.value
	);
	const transAmt = Number(inputTransferAmount.value);

	if (
		transAmt > 0 &&
		transAmt <= currentUser.balance &&
		recieverAcc !== currentUser &&
		recieverAcc
	) {
		currentUser.movements.push(-transAmt);
		recieverAcc.movements.push(transAmt);
	}

	currentUser.movementsDates.push(new Date().toISOString());
	recieverAcc.movementsDates.push(new Date().toISOString());

	//Update UI
	updateUI(currentUser);

	//clear fields
	inputTransferTo.value = inputTransferAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
	e.preventDefault();

	//index of the current account
	let index = 0;
	if (
		inputCloseUsername.value === currentUser.userName &&
		Number(inputClosePin.value) === currentUser.pin
	) {
		index = accounts.findIndex(acc => currentUser.owner === acc.owner);
		console.log(index);
	}

	//deleting that account from accounts
	accounts.splice(index, 1);
	// console.log(accounts);

	//clearing the field
	inputCloseUsername.value = inputClosePin.value = '';

	//hide UI
	containerApp.style.opacity = 0;
});

btnLoan.addEventListener('click', e => {
	e.preventDefault();

	//reset the timer
	clearInterval(timer);
	setLogOutTimer();

	const loanAmt = Number(inputLoanAmount.value);
	if (currentUser.movements.some(mov => mov > 0 && loanAmt >= 0.1 * mov)) {
		setTimeout(function () {
			//add +tive movement to the current user's movement
			currentUser.movements.push(loanAmt);
			currentUser.movementsDates.push(new Date().toISOString());

			//Update UI
			updateUI(currentUser);

			//clearing the field
			inputLoanAmount.value = '';
		}, 2500);
	}
});
