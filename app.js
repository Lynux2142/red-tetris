const express = require('express');
const app = express();
const port = 5000;

app.get('/api/customers', (req, res) => {
	const customers = [
		{id: 1, firstname: 'John', lastname: 'Doe'},
		{id: 2, firstname: 'Steve', lastname: 'Smith'},
		{id: 3, firstname: 'Mary', lastname: 'Swanson'},
	];
	res.json(customers);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
