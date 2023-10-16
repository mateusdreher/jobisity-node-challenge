db.createUser({
	user: 'jobsity',
	pwd: 'Passw0rd',
	roles: [
	  {
		role: 'readWrite',
		db: 'user',
	  },
	],
  });