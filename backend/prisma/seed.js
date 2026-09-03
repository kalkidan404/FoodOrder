
require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
  adapter
});

async function main() {
  console.log("🌱 Starting seed...");

  // ==========================================
  // PASSWORD
  // ==========================================

  const hashedPassword = await bcrypt.hash("password123", 10);


  // ==========================================
  // USERS
  // ==========================================

  const user1 = await prisma.user.upsert({
    where: {
      email: "nova@example.com"
    },
    update: {},
    create: {
      name: "Nova",
      email: "nova@example.com",
      password: hashedPassword,
      role: "USER"
    }
  });

  const user2 = await prisma.user.upsert({
    where: {
      email: "test@example.com"
    },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "USER"
    }
  });

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@example.com"
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN"
    }
  });


  // ==========================================
  // RESTAURANTS
  // ==========================================

  const burgerHouse = await prisma.restaurant.create({
    data: {
      name: "Burger House",
      description: "Fresh burgers, fries and delicious fast food."
    }
  });

  const pastaCorner = await prisma.restaurant.create({
    data: {
      name: "Pasta Corner",
      description: "Italian-style pasta and comforting meals."
    }
  });

  const ethiopianBites = await prisma.restaurant.create({
    data: {
      name: "Ethiopian Bites",
      description: "Traditional Ethiopian food and modern favorites."
    }
  });


  // ==========================================
  // FOODS
  // ==========================================

  const burger = await prisma.food.create({
    data: {
      name: "Classic Burger",
      description: "Beef burger with lettuce, tomato and cheese.",
      Image: "https://example.com/classic-burger.jpg",
      price: 450,
      restaurantId: burgerHouse.id
    }
  });

  const cheeseburger = await prisma.food.create({
    data: {
      name: "Cheeseburger",
      description: "Juicy beef burger with melted cheese.",
      Image: "https://example.com/cheeseburger.jpg",
      price: 550,
      restaurantId: burgerHouse.id
    }
  });

  const fries = await prisma.food.create({
    data: {
      name: "French Fries",
      description: "Crispy golden french fries.",
      Image: "https://example.com/fries.jpg",
      price: 180,
      restaurantId: burgerHouse.id
    }
  });

  const carbonara = await prisma.food.create({
    data: {
      name: "Chicken Carbonara",
      description: "Creamy pasta with chicken and parmesan.",
      Image: "https://example.com/carbonara.jpg",
      price: 650,
      restaurantId: pastaCorner.id
    }
  });

  const spaghetti = await prisma.food.create({
    data: {
      name: "Spaghetti Bolognese",
      description: "Spaghetti with rich tomato and beef sauce.",
      Image: "https://example.com/spaghetti.jpg",
      price: 600,
      restaurantId: pastaCorner.id
    }
  });

  const lasagna = await prisma.food.create({
    data: {
      name: "Beef Lasagna",
      description: "Layered pasta with beef, tomato sauce and cheese.",
      Image: "https://example.com/lasagna.jpg",
      price: 700,
      restaurantId: pastaCorner.id
    }
  });

  const tibs = await prisma.food.create({
    data: {
      name: "Special Tibs",
      description: "Tender beef sautéed with onions, peppers and spices.",
      Image: "https://example.com/tibs.jpg",
      price: 750,
      restaurantId: ethiopianBites.id
    }
  });

  const shiro = await prisma.food.create({
    data: {
      name: "Shiro",
      description: "Traditional Ethiopian chickpea stew served with injera.",
      Image: "https://example.com/shiro.jpg",
      price: 400,
      restaurantId: ethiopianBites.id
    }
  });

  const kitfo = await prisma.food.create({
    data: {
      name: "Kitfo",
      description: "Seasoned minced beef served with traditional sides.",
      Image: "https://example.com/kitfo.jpg",
      price: 850,
      restaurantId: ethiopianBites.id
    }
  });


  // ==========================================
  // CART
  // ==========================================

  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      foodId: burger.id,
      quantity: 2
    }
  });

  await prisma.cartItem.create({
    data: {
      userId: user1.id,
      foodId: fries.id,
      quantity: 1
    }
  });


  // ==========================================
  // ORDER
  // ==========================================

  const orderItems = [
    {
      foodId: burger.id,
      name: burger.name,
      price: burger.price,
      quantity: 2
    },
    {
      foodId: fries.id,
      name: fries.name,
      price: fries.price,
      quantity: 1
    }
  ];

  const total =
    burger.price * 2 +
    fries.price;

  const order = await prisma.order.create({
    data: {
      userId: user2.id,
      items: JSON.stringify(orderItems),
      total: total,
      status: "pending"
    }
  });


  // ==========================================
  // PAYMENT
  // ==========================================

  const payment = await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: order.total,
      currency: "ETB",
      status: "pending",
      transactionRef: `seed-order-${order.id}`
    }
  });


  // ==========================================
  // DONE
  // ==========================================

  console.log("✅ Seed completed!");

  console.log(`
Users:
  ${user1.email}
  ${user2.email}
  ${admin.email}

Password:
  password123

Restaurants:
  ${burgerHouse.name}
  ${pastaCorner.name}
  ${ethiopianBites.name}

Foods:
  9

Cart items:
  2

Order:
  #${order.id}

Payment:
  #${payment.id}
  `);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
