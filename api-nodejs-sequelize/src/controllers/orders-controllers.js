
const Orders = require("../models/OrdersModel");

module.exports = {
  async all(req, res) {
    try {
      const orders = await Orders.findAll();

      const response = {
        quantity_orders: orders.length,
        orders: orders.map((ord) => {
          return {
            id: ord.id,
            id_user: ord.id_user,
            id_product: ord.id_product,
            quantity: ord.quantity,
            request: {
              type: "GET method.",
              description: "Return all orders.",
              url: "http://localhost:4000/api/orders/" + ord.id,
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
      const orders = await Orders.create(req.body);

      const response = {
        message: "Order created successfully!!!",
        createdOrder: {
          id: orders.id,
          id_user: orders.id_user,
          id_product: orders.id_product,
          quantity: orders.quantity,
          request: {
            type: "POST method.",
            description: "Created as orders.",
            url: "http://localhost:4000/api/orders/" + orders.id,
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

      const orders = await Orders.findOne({ where: { id } });
      if (!orders) {
        return res.status(400).json("Order not found");
      }

      const response = {
        message: "Details Order selection!!!",
        orderSelection: {
          id_order: orders.id,
          id_user: orders.id_user,
          id_product: orders.id_product,
          quantity: orders.quantity,
          request: {
            type: "GET method.",
            description: "Return specify order.",
            url: "http://localhost:4000/api/orders/" + orders.id,
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
      const { id_order, id_user, id_product, quantity} = req.body;
      const id = req.params.id;
      const orders = await Orders.findOne({ where: { id } });

      if (!orders) {
        return res.status(400).json("Order not found");
      }
      orders.id = id_order;
      orders.id_user = id_user;
      orders.id_product = id_product;
      orders.quantity = quantity

      await orders.save();

      const response = {
        message: "Updated Order selection!!!",
        orderUpdated: {
          id_order: orders.id,
          id_user: req.body.id_user,
          id_product: req.body.id_product,
          quantity: req.body.quantity,
          request: {
            type: "PATCH method.",
            description: "Updated specify order.",
            url: "http://localhost:4000/api/orders/" + orders.id,
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
      const id_user = req.params.id_user

      const orders = await Orders.destroy({ where: { id } });
      if (!orders) {
        return res.status(400).json("Order not found");
      }

      const response = {
        message: `User deleted successfully!!!`,
        orderDeleted: {
            id_order: id,
            id_user: req.body.id_user,
        },
        request: {
            type: "DELETE method.",
            description: "Deleted Order selection!!!",
            url: "Deleted: " + "http://localhost:4000/api/orders/" + id,
        },
      } 

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
};
