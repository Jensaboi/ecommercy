import { getConnection } from "./getConnection.js";

async function seedTable() {
  const db = await getConnection();
  try {
    await db.exec(`
  INSERT INTO categories (name) VALUES
  ('shoes'),
  ('clothes'),
  ('watches'),
  ('phones'),
  ('computers')
`);

    await db.exec(`
  INSERT INTO sub_categories ( name, category_id ) VALUES
  ('casual', 1),
  ('outdoor', 1),
  ('sport', 1),
  ('tshirts', 2),
  ('hoodies', 2),
  ('jackets', 2),
  ('wristwatches', 3),
  ('smartwatches', 3),
  ('luxury', 3),
  ('smartphone', 4),
  ('retro phone', 4),
  ('retro computers', 5),
  ('laptops', 5),
  ('gaming', 5)
`);

    await db.exec(`
INSERT INTO products (name, stock, price, description, images, attributes, sub_category_id)
VALUES
-- ⌚ WRISTWATCHES
(
  'Cheap Gray Clock',
  10,
  49.99,
  'Affordable gray wristwatch with simple design, perfect for everyday wear.',
  '["/products/clock-1-cheap-gray.jpg"]',
  '{"brand":"Generic","color":"Gray","material":"Metal","style":"Casual"}',
  7
),
(
  'Nixon White & Purple Watch',
  5,
  179.99,
  'Stylish Nixon watch with white dial and purple accents.',
  '["/products/clock-2-nixon-white-purple.jpg"]',
  '{"brand":"Nixon","color":"White/Purple","material":"Metal","style":"Modern"}',
  7
),
(
  'Curr Blue & Gold Watch',
  6,
  199.99,
  'Elegant Curr wristwatch with blue dial and gold case.',
  '["/products/clock-3-curr-blue-gold.jpg"]',
  '{"brand":"Curr","color":"Blue/Gold","material":"Metal","style":"Modern"}',
  7
),

-- ⌚ SMARTWATCHES
(
  'Samsung Black Smartwatch',
  7,
  249.99,
  'Samsung smartwatch with black body, fitness tracking, and AMOLED display.',
  '["/products/smartwatch-1-samsung-black.jpg"]',
  '{"brand":"Samsung","color":"Black","material":"Aluminum","style":"Smart"}',
  8
),
(
  'Apple White Smartwatch',
  5,
  399.99,
  'Apple Watch with white aluminum case, fitness tracking, and retina display.',
  '["/products/smartwatch-2-white-apple-watch.jpg"]',
  '{"brand":"Apple","color":"White","material":"Aluminum","style":"Smart"}',
  8
),

-- 💎 LUXURY WATCHES
(
  'Rolex Gold Luxury Watch',
  2,
  12999.99,
  'Iconic Rolex luxury watch with gold metal finish and premium craftsmanship.',
  '["/products/luxury-1-rolex-metal-gold.jpg"]',
  '{"brand":"Rolex","color":"Gold","material":"Metal","style":"Luxury"}',
  9
),
(
  'IWC White Leather & Metal Luxury Watch',
  3,
  8999.99,
  'IWC luxury watch with white dial, leather strap, and metal accents.',
  '["/products/luxury-2-IWC-leather-metal-white.jpg"]',
  '{"brand":"IWC","color":"White","material":"Leather/Metal","style":"Luxury"}',
  9
),

-- 🥾 SHOES CASUAL & SPORT
(
  'Nike Black Sneaker',
  10,
  129.99,
  'Classic black Nike sneaker, comfortable and versatile.',
  '["/products/shoe-1-black-nike.jpg"]',
  '{"brand":"Nike","color":"Black","type":"Sneaker","material":"Synthetic"}',
  1
),
(
  'Adidas White & Black Stripes Sneaker',
  8,
  119.99,
  'Stylish Adidas sneaker in white with black stripes, perfect for casual wear.',
  '["/products/shoe-2-addidas-white-blackstripes.jpg"]',
  '{"brand":"Adidas","color":"White/Black","type":"Sneaker","material":"Synthetic"}',
  1
),
(
  'Gray Puma Sneaker',
  7,
  109.99,
  'Gray Puma casual sneaker for everyday wear.',
  '["/products/shoe-3-gray-puma.jpg"]',
  '{"brand":"Puma","color":"Gray","type":"Sneaker","material":"Suede"}',
  1
),
(
  'Black Converse Low-Top',
  6,
  89.99,
  'Classic black Converse low-top sneaker with timeless design.',
  '["/products/shoe-4-black-converse-low.jpg"]',
  '{"brand":"Converse","color":"Black","type":"Low-Top","material":"Canvas"}',
  1
),
(
  'Vans Black Sneaker',
  8,
  99.99,
  'Black Vans sneaker with classic skater style.',
  '["/products/shoe-5-vans-black.jpg"]',
  '{"brand":"Vans","color":"Black","type":"Skater Shoe","material":"Canvas"}',
  1
),
(
  'Nike Air Red & White',
  7,
  149.99,
  'Nike Air sneaker with red and white accents, sporty style.',
  '["/products/shoe-6-nike-air-red-white.jpg"]',
  '{"brand":"Nike","color":"Red/White","type":"Running","material":"Synthetic"}',
  3
),
(
  'Nike Air Full Black',
  6,
  159.99,
  'All-black Nike Air sneaker, sleek design for sport and casual wear.',
  '["/products/shoe-7-nike-air-full-black.jpg"]',
  '{"brand":"Nike","color":"Black","type":"Running","material":"Synthetic"}',
  3
),
(
  'Nike Air Black & White Logo',
  5,
  149.99,
  'Nike Air sneaker with black/white accents and logo, sporty design.',
  '["/products/shoe-8-nike-air-black-white-logo.jpg"]',
  '{"brand":"Nike","color":"Black/White","type":"Running","material":"Synthetic"}',
  3
),

-- 🏕 OUTDOOR SHOES
(
  'Brown Outdoor Shoe',
  7,
  119.99,
  'Brown outdoor shoe, durable and comfortable for hiking.',
  '["/products/outdoor-1-brown.jpg"]',
  '{"brand":"Generic","color":"Brown","type":"Outdoor","material":"Leather"}',
  2
),
(
  'Gray/Blue Outdoor Shoe',
  6,
  124.99,
  'Gray and blue outdoor shoe, perfect for trails.',
  '["/products/outdoor-2-grey-blue.jpg"]',
  '{"brand":"Generic","color":"Gray/Blue","type":"Outdoor","material":"Leather"}',
  2
),
(
  'Black Outdoor Shoe',
  5,
  119.99,
  'Black outdoor shoe, durable and rugged.',
  '["/products/outdoor-3-black.jpg"]',
  '{"brand":"Generic","color":"Black","type":"Outdoor","material":"Leather"}',
  2
),
(
  'White/Beige Outdoor Shoe',
  5,
  119.99,
  'White and beige outdoor shoe for casual outdoor activities.',
  '["/products/outdoor-4-white-beig.jpg"]',
  '{"brand":"Generic","color":"White/Beige","type":"Outdoor","material":"Leather"}',
  2
),
(
  'Olive Green Outdoor Shoe',
  6,
  129.99,
  'Olive green outdoor shoe, durable and stylish.',
  '["/products/outdoor-5-olive-green.jpg"]',
  '{"brand":"Generic","color":"Olive Green","type":"Outdoor","material":"Leather"}',
  2
),

-- 👕 T-SHIRTS
(
  'Black C++ Joke T-Shirt',
  10,
  24.99,
  'Funny C++ developer joke printed on black cotton T-shirt.',
  '["/products/tshirt-1-black-c++-c-joke.jpg"]',
  '{"brand":"Generic","color":"Black","material":"Cotton","size":"M/L/XL"}',
  4
),
(
  'Why Dont My Code Work T-Shirt',
  9,
  24.99,
  'Humorous programmer T-shirt with fun coding joke.',
  '["/products/tshirt-2-why-doesnt-my-code-work.jpg"]',
  '{"brand":"Generic","color":"Gray","material":"Cotton","size":"M/L/XL"}',
  4
),
(
  'Coding Funny Cause Its True T-Shirt',
  8,
  23.99,
  'Geeky and fun T-shirt for programmers.',
  '["/products/tshirt-3-coding-funny-cause-its-true.jpg"]',
  '{"brand":"Generic","color":"Black","material":"Cotton","size":"M/L/XL"}',
  4
),
(
  'Blue Pavillion T-Shirt',
  7,
  22.99,
  'Simple blue Pavillion branded T-shirt for casual wear.',
  '["/products/tshirt-4-blue-pavillion.jpg"]',
  '{"brand":"Pavillion","color":"Blue","material":"Cotton","size":"M/L/XL"}',
  4
),
(
  'Black Generic T-Shirt',
  7,
  21.99,
  'Classic black T-shirt, comfortable and versatile.',
  '["/products/tshirt-5-black.jpg"]',
  '{"brand":"Generic","color":"Black","material":"Cotton","size":"M/L/XL"}',
  4
),

-- 🧥 HOODIES
(
  'Brown Hoodie',
  8,
  39.99,
  'Comfortable brown hoodie, perfect for casual wear.',
  '["/products/hoodie-1-brown.jpg"]',
  '{"brand":"Generic","color":"Brown","material":"Cotton","size":"M/L/XL"}',
  5
),

-- 🧥 JACKETS
(
  'White Jacket',
  6,
  79.99,
  'Simple white jacket, lightweight and stylish.',
  '["/products/jacket-1-white.jpg"]',
  '{"brand":"Generic","color":"White","material":"Polyester","size":"M/L/XL"}',
  6
),

-- 💻 LAPTOPS
(
  'MacBook Air',
  5,
  999.99,
  'Apple MacBook Air laptop with lightweight design and Retina display.',
  '["/products/laptop-1-macbook-air.jpg"]',
  '{"brand":"Apple","color":"Silver","material":"Aluminum","storage":"256GB"}',
  13
),

-- 💾 RETRO PHONES
(
  'Old Nokia Retro Phone',
  3,
  49.99,
  'Classic old Nokia phone, durable and nostalgic.',
  '["/products/retrophone-1-old-nokia.jpg"]',
  '{"brand":"Nokia","color":"Gray","material":"Plastic","type":"Retro Phone"}',
  11
),
(
  'Old Black Retro Phone',
  2,
  59.99,
  'Black retro phone, reminiscent of early mobile devices.',
  '["/products/retrophone-2-old-black.jpg"]',
  '{"brand":"Generic","color":"Black","material":"Plastic","type":"Retro Phone"}',
  11
),

-- 📱 SMARTPHONES
(
  'iPhone Modern',
  6,
  999.99,
  'Modern iPhone smartphone with high-resolution display.',
  '["/products/phone-1-iphone.jpg"]',
  '{"brand":"Apple","color":"Black","material":"Aluminum","storage":"128GB"}',
  10
),
(
  'Samsung Modern Smartphone',
  5,
  899.99,
  'Latest Samsung smartphone with AMOLED display and fast processor.',
  '["/products/phone-2-samsung.jpg"]',
  '{"brand":"Samsung","color":"Black","material":"Aluminum","storage":"128GB"}',
  10
),
(
  'First Generation iPhone',
  2,
  499.99,
  'Original first-gen iPhone, iconic touchscreen design.',
  '["/products/phone-3-first-iphone.jpg"]',
  '{"brand":"Apple","color":"Black","material":"Aluminum","storage":"8GB"}',
  10
),

-- 🖥 RETRO COMPUTERS
(
  'Retro White Computer',
  4,
  199.99,
  'Classic retro computer in white casing.',
  '["/products/computer-1-retro-white.jpg"]',
  '{"brand":"Generic","color":"White","material":"Plastic","type":"Retro Computer"}',
  12
),
(
  'Retro Mac White/Blue',
  3,
  299.99,
  'Retro-style Mac computer with white and blue accents.',
  '["/products/computer-2-retro-mac-white-blue.jpg"]',
  '{"brand":"Apple","color":"White/Blue","material":"Plastic","type":"Retro Computer"}',
  12
),
(
  'Classic Mac White',
  2,
  399.99,
  'Classic Mac desktop computer, timeless design.',
  '["/products/computer-3-mac-classic-white.jpg"]',
  '{"brand":"Apple","color":"White","material":"Plastic","type":"Retro Computer"}',
  12
),
(
  'Retro White Computer 2',
  3,
  199.99,
  'Second retro white computer for retro enthusiasts.',
  '["/products/computer-4-retro-white.jpg"]',
  '{"brand":"Generic","color":"White","material":"Plastic","type":"Retro Computer"}',
  12
),
(
  'Retro Mac White 2',
  2,
  299.99,
  'Second retro Mac computer in white casing.',
  '["/products/computer-5-retro-mac-white.jpg"]',
  '{"brand":"Apple","color":"White","material":"Plastic","type":"Retro Computer"}',
  12
),

-- 🎮 GAMING
(
  'Monster Black/Blue Gaming Rig',
  1,
  2499.99,
  'High-end monster gaming rig with black and blue LEDs.',
  '["/products/gaming-1-black-blue-led-monster-rig.jpg"]',
  '{"brand":"Monster","color":"Black/Blue","material":"Metal/Plastic","type":"Gaming Rig"}',
  14
);
`);

    console.log("All tables seeded successfully.");
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}
seedTable();
