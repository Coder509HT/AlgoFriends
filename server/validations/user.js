const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;
  let missingField = false;
  let message = "";

  if (!username) {
    missingField = true;
    message = "Username is required";
  }

  if (!email) {
    missingField = true;
    message = "Email is required";
  }

  if (!password) {
    missingField = true;
    message = "Password is required";
  }

  if (missingField) {
    res.status(404);
    throw new Error(message);
  } else {
    next();
  }
};

module.exports = validateUser;
