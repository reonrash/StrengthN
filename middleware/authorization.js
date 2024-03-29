const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
	try {
		const jwtToken = req.header("token");
		if (!jwtToken) {
			return res.status(403).json({ msg: "Not authorized" });
		}
		const payload = jwt.verify(JSON.parse(jwtToken), "hello");
		req.user = payload.user;
		next();
	} catch (err) {
		console.log(err.message);
		return res.status(403).json({ msg: "Not authorized" });
	}
};

module.exports = authorization;
