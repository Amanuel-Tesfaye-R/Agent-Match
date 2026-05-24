const FOODS = [
// Fruits
{ name: 'Apple', category: 'Fruits', cal: 52, serving: '78 (medium)', ingredients: 'fiber, vitamin C, potassium, quercetin' },
{ name: 'Banana', category: 'Fruits', cal: 89, serving: '105 (medium)', ingredients: 'potassium, vitamin B6, fiber, vitamin C, manganese' },
{ name: 'Orange', category: 'Fruits', cal: 47, serving: '62 (medium)', ingredients: 'vitamin C, fiber, folate, thiamine, potassium' },
{ name: 'Strawberries', category: 'Fruits', cal: 32, serving: '48 (1 cup)', ingredients: 'vitamin C, manganese, antioxidants, folate, potassium' },
{ name: 'Blueberries', category: 'Fruits', cal: 57, serving: '84 (1 cup)', ingredients: 'fiber, vitamin C, vitamin K, manganese, anthocyanins' },
{ name: 'Avocado', category: 'Fruits', cal: 160, serving: '240 (1/2 fruit)', ingredients: 'healthy fats, fiber, potassium, vitamin K, vitamin E' },

// Vegetables
{ name: 'Broccoli', category: 'Vegetables', cal: 34, serving: '55 (1 cup)', ingredients: 'fiber, vitamin C, vitamin K, iron, sulforaphane' },
{ name: 'Spinach', category: 'Vegetables', cal: 23, serving: '7 (1 cup)', ingredients: 'iron, vitamin K, vitamin A, folate, magnesium' },
{ name: 'Kale', category: 'Vegetables', cal: 49, serving: '33 (1 cup)', ingredients: 'vitamin K, vitamin C, calcium, antioxidants, quercetin' },
{ name: 'Carrot', category: 'Vegetables', cal: 41, serving: '50 (1 medium)', ingredients: 'vitamin A, fiber, vitamin K, potassium, biotin' },
{ name: 'Sweet Potato', category: 'Vegetables', cal: 86, serving: '103 (medium)', ingredients: 'fiber, vitamin A, vitamin C, manganese, vitamin B6' },
{ name: 'Bell Pepper', category: 'Vegetables', cal: 31, serving: '39 (1 medium)', ingredients: 'vitamin C, vitamin A, vitamin B6, folate, fiber' },
{ name: 'Mixed Greens Salad', category: 'Vegetables', cal: 18, serving: '36 (200g)', ingredients: 'spinach, arugula, romaine, kale, radicchio' },

// Proteins
{ name: 'Chicken Breast', category: 'Proteins', cal: 165, serving: '165 (100g)', ingredients: 'protein, selenium, vitamin B6, phosphorus, niacin' },
{ name: 'Salmon', category: 'Proteins', cal: 208, serving: '208 (100g)', ingredients: 'omega-3, protein, vitamin B12, vitamin D, selenium' },
{ name: 'Eggs', category: 'Proteins', cal: 155, serving: '78 (1 large)', ingredients: 'protein, vitamin B12, vitamin D, choline, selenium' },
{ name: 'Tofu', category: 'Proteins', cal: 76, serving: '76 (100g)', ingredients: 'protein, calcium, iron, magnesium, selenium' },
{ name: 'Lean Beef', category: 'Proteins', cal: 250, serving: '250 (100g)', ingredients: 'protein, iron, zinc, vitamin B12, creatine' },
{ name: 'Lentils', category: 'Proteins', cal: 116, serving: '230 (1 cup cooked)', ingredients: 'protein, fiber, iron, folate, magnesium, potassium' },
{ name: 'Chickpeas', category: 'Proteins', cal: 139, serving: '269 (1 cup cooked)', ingredients: 'protein, fiber, folate, iron, manganese, magnesium' },
{ name: 'Greek Yogurt Bowl', category: 'Proteins', cal: 95, serving: '285 (300g)', ingredients: 'greek yogurt, honey, granola, berries, seeds' },

// Grains
{ name: 'Brown Rice', category: 'Grains', cal: 111, serving: '218 (1 cup cooked)', ingredients: 'fiber, magnesium, vitamin B6, manganese, phosphorus' },
{ name: 'Quinoa', category: 'Grains', cal: 120, serving: '222 (1 cup cooked)', ingredients: 'protein, fiber, iron, magnesium, all 9 amino acids' },
{ name: 'Oats', category: 'Grains', cal: 389, serving: '154 (40g dry)', ingredients: 'fiber, manganese, phosphorus, magnesium, beta-glucan' },
{ name: 'Whole Wheat Bread', category: 'Grains', cal: 247, serving: '77 (1 slice)', ingredients: 'fiber, protein, iron, B vitamins, magnesium' },
{ name: 'Pasta (Whole Wheat)', category: 'Grains', cal: 124, serving: '174 (1 cup cooked)', ingredients: 'fiber, protein, iron, B vitamins, selenium' },
{ name: 'Granola', category: 'Grains', cal: 471, serving: '118 (1/4 cup)', ingredients: 'oats, nuts, honey, dried fruit, seeds, coconut oil' },

// Dairy
{ name: 'Greek Yogurt', category: 'Dairy', cal: 59, serving: '100 (170g serving)', ingredients: 'protein, calcium, vitamin B12, probiotics, riboflavin' },
{ name: 'Milk (Whole)', category: 'Dairy', cal: 61, serving: '146 (1 cup)', ingredients: 'calcium, vitamin D, protein, vitamin B12, riboflavin' },
{ name: 'Cottage Cheese', category: 'Dairy', cal: 98, serving: '110 (1/2 cup)', ingredients: 'protein, calcium, vitamin B12, riboflavin, selenium' },
{ name: 'Cheese (Cheddar)', category: 'Dairy', cal: 403, serving: '114 (28g)', ingredients: 'calcium, protein, vitamin A, vitamin B12, zinc' },

// Nuts & Seeds
{ name: 'Almonds', category: 'Nuts & Seeds', cal: 579, serving: '164 (1 oz)', ingredients: 'healthy fats, vitamin E, magnesium, fiber, riboflavin' },
{ name: 'Walnuts', category: 'Nuts & Seeds', cal: 654, serving: '185 (1 oz)', ingredients: 'omega-3, antioxidants, magnesium, copper, manganese' },
{ name: 'Chia Seeds', category: 'Nuts & Seeds', cal: 486, serving: '138 (1 oz)', ingredients: 'omega-3, fiber, protein, calcium, phosphorus' },
{ name: 'Flax Seeds', category: 'Nuts & Seeds', cal: 534, serving: '150 (1 oz)', ingredients: 'omega-3, fiber, lignans, thiamine, magnesium' },

// Beverages
{ name: 'Water', category: 'Beverages', cal: 0, serving: '0 (8 oz)', ingredients: 'trace minerals — essential for all bodily functions' },
{ name: 'Green Tea', category: 'Beverages', cal: 1, serving: '2 (8 oz)', ingredients: 'antioxidants, caffeine, catechins, L-theanine' },
{ name: 'Black Coffee', category: 'Beverages', cal: 2, serving: '5 (8 oz)', ingredients: 'caffeine, antioxidants, chlorogenic acid, niacin' },
{ name: 'Lemon Water', category: 'Beverages', cal: 6, serving: '6 (8 oz)', ingredients: 'vitamin C, citric acid, potassium, antioxidants' },
  
  // Healthy Meals
{ name: 'Grilled Chicken Salad', category: 'Healthy Meals', cal: 210, serving: '320 (1 bowl)', ingredients: 'chicken breast, lettuce, cucumber, tomato, olive oil, lemon' },
{ name: 'Veggie Wrap', category: 'Healthy Meals', cal: 180, serving: '250 (1 wrap)', ingredients: 'whole wheat tortilla, hummus, spinach, carrots, bell pepper' },
{ name: 'Turkey Sandwich', category: 'Healthy Meals', cal: 290, serving: '240 (1 sandwich)', ingredients: 'turkey, whole wheat bread, lettuce, tomato, mustard' },
{ name: 'Chicken Stir Fry', category: 'Healthy Meals', cal: 340, serving: '350 (1 plate)', ingredients: 'chicken, broccoli, carrots, soy sauce, garlic, brown rice' },
{ name: 'Quinoa Bowl', category: 'Healthy Meals', cal: 310, serving: '300 (1 bowl)', ingredients: 'quinoa, black beans, avocado, corn, tomatoes, lime' },
{ name: 'Salmon Rice Bowl', category: 'Healthy Meals', cal: 420, serving: '340 (1 bowl)', ingredients: 'salmon, brown rice, cucumber, avocado, sesame seeds' },

// Fast Foods
{ name: 'Cheeseburger', category: 'Fast Foods', cal: 303, serving: '150 (1 burger)', ingredients: 'beef patty, cheese, bun, ketchup, pickles, onions' },
{ name: 'French Fries', category: 'Fast Foods', cal: 312, serving: '117 (medium)', ingredients: 'potatoes, vegetable oil, salt' },
{ name: 'Pepperoni Pizza', category: 'Fast Foods', cal: 285, serving: '107 (1 slice)', ingredients: 'pizza dough, cheese, pepperoni, tomato sauce' },
{ name: 'Fried Chicken', category: 'Fast Foods', cal: 320, serving: '140 (2 pieces)', ingredients: 'chicken, flour, oil, spices, breadcrumbs' },
{ name: 'Hot Dog', category: 'Fast Foods', cal: 290, serving: '98 (1 hot dog)', ingredients: 'sausage, bun, ketchup, mustard, onions' },
{ name: 'Chicken Nuggets', category: 'Fast Foods', cal: 296, serving: '100 (6 pieces)', ingredients: 'chicken, flour, oil, breadcrumbs, spices' },

// Desserts
{ name: 'Chocolate Cake', category: 'Desserts', cal: 371, serving: '120 (1 slice)', ingredients: 'flour, cocoa, sugar, eggs, butter, milk' },
{ name: 'Ice Cream', category: 'Desserts', cal: 207, serving: '132 (1 cup)', ingredients: 'milk, cream, sugar, vanilla' },
{ name: 'Brownie', category: 'Desserts', cal: 466, serving: '85 (1 brownie)', ingredients: 'chocolate, butter, sugar, eggs, flour' },
{ name: 'Cheesecake', category: 'Desserts', cal: 321, serving: '125 (1 slice)', ingredients: 'cream cheese, sugar, eggs, graham crackers' },
{ name: 'Donut', category: 'Desserts', cal: 452, serving: '75 (1 donut)', ingredients: 'flour, sugar, oil, yeast, glaze' },
{ name: 'Apple Pie', category: 'Desserts', cal: 237, serving: '125 (1 slice)', ingredients: 'apples, flour, butter, sugar, cinnamon' },

// Seafood
{ name: 'Shrimp', category: 'Seafood', cal: 99, serving: '85 (100g)', ingredients: 'protein, selenium, iodine, vitamin B12, omega-3' },
{ name: 'Tuna', category: 'Seafood', cal: 132, serving: '100 (100g)', ingredients: 'protein, omega-3, vitamin D, selenium, niacin' },
{ name: 'Crab', category: 'Seafood', cal: 97, serving: '85 (100g)', ingredients: 'protein, zinc, selenium, copper, vitamin B12' },
{ name: 'Lobster', category: 'Seafood', cal: 89, serving: '85 (100g)', ingredients: 'protein, selenium, copper, omega-3, vitamin B12' },
{ name: 'Sardines', category: 'Seafood', cal: 208, serving: '92 (1 can)', ingredients: 'omega-3, calcium, vitamin D, protein, selenium' },

// Soups
{ name: 'Tomato Soup', category: 'Soups', cal: 74, serving: '245 (1 bowl)', ingredients: 'tomatoes, garlic, onion, cream, herbs' },
{ name: 'Chicken Soup', category: 'Soups', cal: 86, serving: '240 (1 bowl)', ingredients: 'chicken, carrots, celery, noodles, broth' },
{ name: 'Lentil Soup', category: 'Soups', cal: 180, serving: '250 (1 bowl)', ingredients: 'lentils, onion, carrots, celery, spices' },
{ name: 'Mushroom Soup', category: 'Soups', cal: 95, serving: '240 (1 bowl)', ingredients: 'mushrooms, cream, garlic, onion, broth' },

// Snacks
{ name: 'Popcorn', category: 'Snacks', cal: 387, serving: '56 (3 cups)', ingredients: 'corn, salt, butter, vegetable oil' },
{ name: 'Protein Bar', category: 'Snacks', cal: 250, serving: '60 (1 bar)', ingredients: 'protein blend, oats, nuts, chocolate, honey' },
{ name: 'Trail Mix', category: 'Snacks', cal: 462, serving: '85 (1 cup)', ingredients: 'nuts, raisins, chocolate chips, seeds' },
{ name: 'Rice Cakes', category: 'Snacks', cal: 35, serving: '9 (1 cake)', ingredients: 'rice, salt' },
{ name: 'Peanut Butter Sandwich', category: 'Snacks', cal: 350, serving: '120 (1 sandwich)', ingredients: 'peanut butter, whole wheat bread, honey' },

// Breakfast
{ name: 'Pancakes', category: 'Breakfast', cal: 227, serving: '100 (2 pancakes)', ingredients: 'flour, milk, eggs, butter, syrup' },
{ name: 'Scrambled Eggs', category: 'Breakfast', cal: 148, serving: '100 (2 eggs)', ingredients: 'eggs, butter, milk, salt' },
{ name: 'French Toast', category: 'Breakfast', cal: 229, serving: '120 (2 slices)', ingredients: 'bread, eggs, milk, cinnamon, syrup' },
{ name: 'Breakfast Burrito', category: 'Breakfast', cal: 305, serving: '200 (1 burrito)', ingredients: 'eggs, tortilla, cheese, beans, salsa' },
{ name: 'Smoothie Bowl', category: 'Breakfast', cal: 260, serving: '300 (1 bowl)', ingredients: 'banana, berries, yogurt, granola, chia seeds' },

// International Foods
{ name: 'Sushi', category: 'International Foods', cal: 200, serving: '150 (6 rolls)', ingredients: 'rice, seaweed, salmon, avocado, cucumber' },
{ name: 'Tacos', category: 'International Foods', cal: 226, serving: '120 (2 tacos)', ingredients: 'tortilla, beef, lettuce, cheese, salsa' },
{ name: 'Butter Chicken', category: 'International Foods', cal: 490, serving: '240 (1 bowl)', ingredients: 'chicken, tomato sauce, cream, butter, spices' },
{ name: 'Pad Thai', category: 'International Foods', cal: 300, serving: '200 (1 plate)', ingredients: 'rice noodles, shrimp, peanuts, bean sprouts, egg' },
{ name: 'Falafel', category: 'International Foods', cal: 333, serving: '100 (4 pieces)', ingredients: 'chickpeas, parsley, garlic, cumin, onion' },
// Ethiopian Foods
{ name: 'Injera', category: 'Ethiopian Foods', cal: 166, serving: '100 (1 piece)', ingredients: 'teff flour, water, yeast' },
{ name: 'Doro Wat', category: 'Ethiopian Foods', cal: 325, serving: '250 (1 serving)', ingredients: 'chicken, berbere, onion, garlic, niter kibbeh, boiled eggs' },
{ name: 'Shiro Wat', category: 'Ethiopian Foods', cal: 210, serving: '200 (1 bowl)', ingredients: 'chickpea flour, berbere, garlic, onion, oil' },
{ name: 'Misir Wat', category: 'Ethiopian Foods', cal: 180, serving: '220 (1 bowl)', ingredients: 'red lentils, berbere, onion, garlic, tomato paste' },
{ name: 'Tibs', category: 'Ethiopian Foods', cal: 370, serving: '220 (1 plate)', ingredients: 'beef, onion, rosemary, garlic, jalapeño, spices' },
{ name: 'Kitfo', category: 'Ethiopian Foods', cal: 350, serving: '180 (1 serving)', ingredients: 'minced beef, niter kibbeh, mitmita, cardamom' },
{ name: 'Gored Gored', category: 'Ethiopian Foods', cal: 330, serving: '180 (1 serving)', ingredients: 'raw beef cubes, niter kibbeh, mitmita, awaze' },
{ name: 'Dulet', category: 'Ethiopian Foods', cal: 290, serving: '200 (1 serving)', ingredients: 'tripe, liver, beef, onion, chili pepper, spices' },
{ name: 'Firfir', category: 'Ethiopian Foods', cal: 240, serving: '250 (1 bowl)', ingredients: 'injera pieces, berbere sauce, onions, niter kibbeh' },
{ name: 'Chechebsa', category: 'Ethiopian Foods', cal: 410, serving: '260 (1 plate)', ingredients: 'flatbread, berbere, butter, honey, spices' },
{ name: 'Genfo', category: 'Ethiopian Foods', cal: 280, serving: '230 (1 bowl)', ingredients: 'barley flour, wheat flour, butter, berbere sauce' },
{ name: 'Kinche', category: 'Ethiopian Foods', cal: 220, serving: '240 (1 bowl)', ingredients: 'cracked wheat, butter, salt, yogurt' },
{ name: 'Fatira', category: 'Ethiopian Foods', cal: 450, serving: '250 (1 serving)', ingredients: 'flour, eggs, honey, oil, spices' },
{ name: 'Ful Medames', category: 'Ethiopian Foods', cal: 230, serving: '250 (1 bowl)', ingredients: 'fava beans, olive oil, tomato, onion, jalapeño' },
{ name: 'Beyaynetu', category: 'Ethiopian Foods', cal: 520, serving: '450 (1 platter)', ingredients: 'injera, lentils, cabbage, spinach, potatoes, beets' },
{ name: 'Atkilt Wat', category: 'Ethiopian Foods', cal: 140, serving: '220 (1 bowl)', ingredients: 'cabbage, potatoes, carrots, turmeric, garlic' },
{ name: 'Gomen', category: 'Ethiopian Foods', cal: 110, serving: '180 (1 bowl)', ingredients: 'collard greens, garlic, ginger, onion, oil' },
{ name: 'Azifa', category: 'Ethiopian Foods', cal: 190, serving: '200 (1 bowl)', ingredients: 'green lentils, mustard, onion, jalapeño, lemon juice' },
{ name: 'Kik Alicha', category: 'Ethiopian Foods', cal: 175, serving: '210 (1 bowl)', ingredients: 'split peas, turmeric, garlic, onion, ginger' },
{ name: 'Dinich Wat', category: 'Ethiopian Foods', cal: 160, serving: '220 (1 bowl)', ingredients: 'potatoes, onion, tomato, turmeric, garlic' },
{ name: 'Duba Wat', category: 'Ethiopian Foods', cal: 145, serving: '230 (1 bowl)', ingredients: 'pumpkin, garlic, onion, ginger, spices' },
{ name: 'Siga Wat', category: 'Ethiopian Foods', cal: 340, serving: '250 (1 serving)', ingredients: 'beef, berbere, onion, garlic, niter kibbeh' },
{ name: 'Key Wat', category: 'Ethiopian Foods', cal: 355, serving: '240 (1 serving)', ingredients: 'beef, berbere, tomato paste, garlic, onions' },
{ name: 'Alicha Wat', category: 'Ethiopian Foods', cal: 250, serving: '230 (1 bowl)', ingredients: 'meat, turmeric, garlic, ginger, onions' },
{ name: 'Sambusa', category: 'Ethiopian Foods', cal: 260, serving: '90 (2 pieces)', ingredients: 'flour, lentils, onions, green chili, oil' },
{ name: 'Ethiopian Macchiato', category: 'Ethiopian Foods', cal: 120, serving: '120 (1 cup)', ingredients: 'espresso, milk, sugar' },
{ name: 'Buna (Coffee Ceremony Coffee)', category: 'Ethiopian Foods', cal: 5, serving: '60 (1 cup)', ingredients: 'fresh roasted coffee beans, water, cardamom' },
{ name: 'Tej', category: 'Ethiopian Foods', cal: 160, serving: '150 (1 glass)', ingredients: 'honey, water, gesho leaves' },
{ name: 'Tela', category: 'Ethiopian Foods', cal: 180, serving: '250 (1 glass)', ingredients: 'barley, gesho, water, yeast' },
{ name: 'Kocho', category: 'Ethiopian Foods', cal: 240, serving: '150 (1 serving)', ingredients: 'enset, butter, spices' },
{ name: 'Bulla', category: 'Ethiopian Foods', cal: 210, serving: '180 (1 bowl)', ingredients: 'enset starch, milk, butter, sugar' },
{ name: 'Nefro', category: 'Ethiopian Foods', cal: 170, serving: '200 (1 bowl)', ingredients: 'boiled wheat, chickpeas, salt' },
{ name: 'Ambasha', category: 'Ethiopian Foods', cal: 300, serving: '100 (1 slice)', ingredients: 'flour, yeast, sesame seeds, sugar, butter' },
{ name: 'Mulmul', category: 'Ethiopian Foods', cal: 190, serving: '80 (1 piece)', ingredients: 'injera crumbs, berbere, butter, spices' },
{ name: 'Tihlo', category: 'Ethiopian Foods', cal: 260, serving: '220 (1 serving)', ingredients: 'barley dough balls, shiro sauce, berbere' },
{ name: 'Zilzil Tibs', category: 'Ethiopian Foods', cal: 390, serving: '230 (1 plate)', ingredients: 'beef strips, onions, tomatoes, rosemary, chili' },
{ name: 'Quanta Firfir', category: 'Ethiopian Foods', cal: 410, serving: '260 (1 bowl)', ingredients: 'dried beef, injera, berbere sauce, onions' },
{ name: 'Bozena Shiro', category: 'Ethiopian Foods', cal: 320, serving: '240 (1 bowl)', ingredients: 'shiro powder, beef cubes, garlic, onions, berbere' },
{ name: 'Ye Beg Alicha', category: 'Ethiopian Foods', cal: 345, serving: '250 (1 serving)', ingredients: 'lamb, turmeric, garlic, ginger, onions' },
{ name: 'Asa Tibs', category: 'Ethiopian Foods', cal: 290, serving: '220 (1 plate)', ingredients: 'fish, onions, peppers, garlic, rosemary' },
{ name: 'Asa Wat', category: 'Ethiopian Foods', cal: 250, serving: '230 (1 bowl)', ingredients: 'fish, berbere, onion, garlic, tomato sauce' },

]
