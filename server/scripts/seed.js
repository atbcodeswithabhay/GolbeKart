const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const CATEGORIES = [
  'Electronics', 'Mobiles', 'Fashion', 'Shoes', 'Grocery',
  'Home Appliances', 'Furniture', 'Beauty', 'Books', 'Smart Gadgets',
  'Gaming', 'Accessories'
];

async function main() {
  console.log('Starting massive data seeding for GolBeKARTT...');

  // 1. Create Categories
  console.log('Creating Categories...');
  const categoryIds = [];
  for (const catName of CATEGORIES) {
    const slug = faker.helpers.slugify(catName).toLowerCase();
    const category = await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: catName,
        slug,
        image: faker.image.urlLoremFlickr({ category: catName.split(' ')[0].toLowerCase() })
      }
    });
    categoryIds.push(category.id);
  }
  console.log(`Created ${categoryIds.length} categories.`);

  // 2. Generate Products
  // The requirement is 2000+ products per category. Let's do 2000 per category.
  // 12 * 2000 = 24,000 products.
  const PRODUCTS_PER_CATEGORY = 2000;
  const BATCH_SIZE = 500;

  for (let i = 0; i < CATEGORIES.length; i++) {
    const categoryId = categoryIds[i];
    const categoryName = CATEGORIES[i];
    console.log(`Seeding products for category: ${categoryName} ...`);

    let productsToInsert = [];
    for (let p = 0; p < PRODUCTS_PER_CATEGORY; p++) {
      const productName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`;
      const price = parseFloat(faker.commerce.price({ min: 10, max: 2000 }));
      const hasDiscount = Math.random() > 0.5;
      const discountPrice = hasDiscount ? price * 0.8 : null;

      productsToInsert.push({
        name: productName,
        slug: faker.helpers.slugify(productName).toLowerCase() + '-' + faker.string.alphanumeric(6),
        description: faker.commerce.productDescription(),
        price,
        discountPrice,
        stock: faker.number.int({ min: 0, max: 500 }),
        categoryId,
        brand: faker.company.name(),
      });

      if (productsToInsert.length === BATCH_SIZE) {
        await prisma.product.createMany({
          data: productsToInsert
        });
        productsToInsert = []; // Reset batch
        process.stdout.write(`.`);
      }
    }
    // Insert remaining
    if (productsToInsert.length > 0) {
      await prisma.product.createMany({
        data: productsToInsert
      });
    }
    console.log(`\nFinished category: ${categoryName}`);
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
