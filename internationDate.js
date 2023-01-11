const options = {
    day: 'numeric',
	month: 'long',
	year: 'numeric',
	hour: 'numeric',
    minute: 'numeric'
};
const INDate = new Intl.DateTimeFormat('en-US', options).format(new Date());
console.log(INDate);
console.log(INDate.split(" "));