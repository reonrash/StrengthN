
const validInfo = (req, res, next) => {
    const { email, fname, lname, password } = req.body;
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
    function isBlank(str) {
      return (!str || /^\s*$/.test(str));
    }
    //console.log("not working")
    console.log(req.path)
    let path = req.path;
    if (process.env.NODE_ENV == "production") {
      path = path.slice(0,-1);
    }
    console.log(path);
  
    if (path === "/register") {
      console.log("middlewear register");
      if ([email, fname, lname, password].some(isBlank)) {
        return res.status(401).json("Missing Credential(s)");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (path === "/login") {
      if ([email, password].some(isBlank)) {
        return res.status(401).json("Missing Credential(s)");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
};

module.exports = validInfo;