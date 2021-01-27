require("dotenv").config();
const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.APIKEY }).base(
  process.env.DBID
);
const table = base("My Users");
const view = "Grid view";

exports.getAllUser = (req, res) => {
  table.select({ view: view }).firstPage((err, records) => {
    if (err) {
      console.error(err);
      res.json({
        message: "Gagal mendapatkan data!",
      });
      return;
    }
    var users = records.map((record) => {
      return {
        _id: record.getId(),
        username: record.get("Username"),
        email: record.get("Email"),
        password: record.get("Password"),
        created: record._rawJson.createdTime,
      };
    });
    res.json(users);
  });
};

exports.getOneUser = (req, res) => {
  table.find(req.params.userid, (err, record) => {
    if (err) {
      console.error(err);
      res.json({
        message: "Gagal mendapatkan data!",
      });
      return;
    }
    let user = {
      _id: record.getId(),
      username: record.get("Username"),
      email: record.get("Email"),
      password: record.get("Password"),
      created: record._rawJson.createdTime,
    };
    res.json(user);
  });
};

exports.createUser = (req, res) => {
  table.create(
    [
      {
        fields: {
          Username: req.body.username,
          Email: req.body.email,
          Password: req.body.password,
        },
      },
    ],
    (err, records) => {
      if (err) {
        console.error(err);
        res.json({
          message: "Gagal menambahakan data!",
        });
        return;
      }
      var user = records.map((record) => {
        return {
          message: "Success",
          _id: record.getId(),
          username: record.get("Username"),
          email: record.get("Email"),
          password: record.get("Password"),
          created: record._rawJson.createdTime,
        };
      });
      res.json(user);
    }
  );
};

exports.updateUser = (req, res) => {
  table.update(
    [
      {
        id: req.params.userid,
        fields: {
          Username: req.body.username,
          Email: req.body.email,
          Password: req.body.password,
        },
      },
    ],
    (err, records) => {
      if (err) {
        console.error(err);
        res.json({
          message: "Gagal memperbarui data!",
        });
        return;
      }
      var user = records.map((record) => {
        return {
          message: "Success",
          _id: record.getId(),
          username: record.get("Username"),
          email: record.get("Email"),
          password: record.get("Password"),
          created: record._rawJson.createdTime,
        };
      });
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  table.destroy([req.params.userid], (err, records) => {
    if (err) {
      console.error(err);
      res.json({
        message: "Gagal menghapus data!",
      });
      return;
    }
    res.json({ message: "Succes" });
  });
};
