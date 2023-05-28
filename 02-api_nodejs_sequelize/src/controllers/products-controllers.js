
const Products = require("../models/ProductsModel");

module.exports = {
  async all(req, res) {
    try {
      const products = await Products.findAll();

      const response = {
        quantity_products: products.length,
        products: products.map((prod) => {
          return {
            id_product: prod.id,
            name: prod.name,
            price: prod.price,
            request: {
              type: "GET method.",
              description: "Return all products.",
              url: "http://localhost:4000/api/products/" + prod.id,
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
      console.log(req.file)
      const products = await Products.create(req.body);

      const response = {
        message: "Product created successfully!!!",
        createdProduct: {
          id_product: products.id,
          name: req.body.name,
          price: req.body.price,
          request: {
            type: "Create method.",
            description: "Inserted a product!!!",
            url: "http://localhost:4000/api/products/" + products.id,
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

      const products = await Products.findOne({ where: { id } });
      if (!products) {
        return res.status(400).json("Product not found");
      }

      const response = {
        message: "Details Product selection!!!",
        productSelection: {
          id_product: products.id,
          name: req.body.name,
          price: req.body.price,
          request: {
            type: "GET method.",
            description: "GET Details Product selection!!!",
            url: "http://localhost:4000/api/products/" + products.id,
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
      const { name, price } = req.body;
      const id = req.params.id;
      const products = await Products.findOne({ where: { id } });

      if (!products) {
        return res.status(400).json("Product not found");
      }
      products.name = name;
      products.price = price;

      await products.save();

      const response = {
        message: "Updated Product selection!!!",
        productSelection: {
          id_product: products.id,
          name: req.body.name,
          price: req.body.price,
          request: {
            type: "PATCH method.",
            description: "Updated Product selection!!!",
            url: "http://localhost:4000/api/products/" + products.id,
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
      const name_pro = req.body.name

      const products = await Products.destroy({ where: { id } });
      if (!products) {
        return res.status(400).json("Product not found");
      }

      const response = {
        message: `Product deleted successfully!!!`,
        productDeleted: {
            id: id,
            name: req.body.name,
        },
        request: {
            type: "DELETE method.",
            description: "Deleted Product selection!!!",
            url: "Deleted: " + "http://localhost:4000/api/products/" + id,
        },
      } 

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  },
};
