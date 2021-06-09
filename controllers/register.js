const handleRegister = (bcrypt, db) => (req, res) => {
  const { id, name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json("Incorrect form submission");
  }

  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        email: email,
        password: hash,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .returning("*")
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(404).json("Unable to register"));
};

module.exports = {
  handleRegister,
};
