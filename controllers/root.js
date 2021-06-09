const handleRoot = (req, res, db) => {
  db.select("*")
    .from("users")
    .then((users) => res.json(users));

  db.select("*")
    .from("login")
    .then((data) => res.json(data));
};

module.exports = {
  handleRoot,
};
