setInterval(() => {
	const now = new Date();

	console.log(
		`${now.getHours().toString().padStart(2, 0)}:${now
			.getMinutes()
			.toString()
			.padStart(2,0)}:${now.getSeconds().toString().padStart(2,0)}`
	);
}, 1000);
