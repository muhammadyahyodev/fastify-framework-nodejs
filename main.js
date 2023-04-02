const fastify = require("fastify")();

// mosliklarni saqlash uchun jadval
let fruits = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Cherry" },
];

// mosliklarni ko'rish
fastify.get("/fruits", (req, res) => {
  res.send(fruits);
});

// moslik qo'shish
fastify.post("/fruits", (req, res) => {
  const fruit = req.body;
  fruits.push(fruit);
  res.send(fruit);
});

// moslikni yangilash
fastify.put("/fruits/:id", (req, res) => {
  const id = req.params.id;
  const updatedFruit = req.body;
  fruits = fruits.map((fruit) => {
    if (fruit.id === Number(id)) {
      return { id, ...updatedFruit };
    } else {
      return fruit;
    }
  });
  res.send(updatedFruit);
});

// moslikni o'chirish
fastify.delete("/fruits/:id", (req, res) => {
  const id = req.params.id;
  fruits = fruits.filter((fruit) => fruit.id !== Number(id));
  res.send({ message: `Fruit ${id} has been deleted` });
});

// serverni ishga tushirish
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
