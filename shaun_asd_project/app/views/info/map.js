function (doc) {
	if (doc._id.substr(0,4) === "data") {
		emit(doc._id, {
			"fname": doc.fname,
			"lname": doc.lname,
			"email": doc.email,
			"user": doc.user,
			"pass": doc.pass,
			"miles": doc.miles,
			"time": doc.time,
			"city": doc.city,
			"state": doc.state
		});
	}
};