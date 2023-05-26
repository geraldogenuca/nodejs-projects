
const Users = require("../models/UsersModel");

module.exports = {
  async all(req, res) {
    try {
      const users = await Users.findAll();

      const response = {
        quantity_users: users.length,
        products: users.map((usr) => {
          return {
            id_user: usr.id,
            name_user: usr.name_user,
            email: usr.email,
            password: usr.password,
            request: {
              type: "GET method.",
              description: "Return all users.",
              url: "http://localhost:4000/api/users/" + usr.id,
            },
          };
        }),
      };
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async create(req, res) {
    try {
      const users = await Users.create(req.body);

      const response = {
        message: "User created successfully!!!",
        createdUser: {
          id_user: users.id,
          name_user: req.body.name,
          email: req.body.email,
          password: req.body.password,
          request: {
            type: "CREATE method.",
            description: "Created as users.",
            url: "http://localhost:4000/api/users/" + req.body.id,
          },
        },
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async one(req, res) {
    try {
      const id = req.params.id;

      const users = await Users.findOne({ where: { id } });
      if (!users) {
        return res.status(400).json("User not found");
      }

      const response = {
        message: "Details User selection!!!",
        userSelection: {
          id_user: users.id,
          name_user: req.body.name_user,
          email: req.body.email,
          password: req.body.password,
          request: {
            type: "GET method.",
            description: "Return specify users.",
            url: "http://localhost:4000/api/users/" + req.body.id,
          },
        },
      };
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
  async update(req, res) {
    try {
      const { name_user, email, password } = req.body;
      const id = req.params.id;
      const users = await Users.findOne({ where: { id } });

      if (!users) {
        return res.status(400).json("User not found");
      }
      users.name_user = name_user;
      users.email = email;
      users.password = password;

      await users.save();

      const response = {
        message: "Updated User selection!!!",
        userSelection: {
          id_user: users.id,
          name_user: req.body.name_user,
          email: req.body.email,
          password: req.body.password,
          request: {
            type: "PATCH method.",
            description: "Updated User selection!!!",
            url: "http://localhost:4000/api/users/" + users.id,
          },
        },
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  async delete(req, res) {
    try {
      const id = req.params.id;
      const email = req.body.email

      const users = await Users.destroy({ where: { id } });
      if (!users) {
        return res.status(400).json("User not found");
      }

      const response = {
        message: `User deleted successfully!!!`,
        userDeleted: {
            id: id,
            email: req.body.email,
        },
        request: {
            type: "DELETE method.",
            description: "Deleted User selection!!!",
            url: "Deleted: " + "http://localhost:4000/api/users/" + id,
        },
      } 

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
};
