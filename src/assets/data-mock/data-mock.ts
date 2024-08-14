import type { Recipe } from 'src/app/shared/models/recipe.model';

export const recipes: Recipe[] = [
  {
    name: 'Big Phat Burger',
    description: 'Best burger in the world',
    imagePath:
      'https://d1ralsognjng37.cloudfront.net/5ba0e4cb-61aa-4786-9263-c5d0045a4c59.jpeg',
    ingredients: [
      { ingredientName: 'Burger bun', amount: 2 },
      { ingredientName: 'Patty', amount: 1 },
      { ingredientName: 'Salad', amount: 1 },
      { ingredientName: 'Tomato', amount: 1 },
    ],
  },
  {
    name: 'Pork Schnitzel',
    description: 'Authentic German Schnitzel',
    imagePath:
      'https://www.allrecipes.com/thmb/bu4s12dq2GNt-kgi9R8sZTrhQYo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Pork-Schnitzel-ddmfs-3x2-113-7c044e725d604cb0b2a3827b63a7f6f6.jpg',
    ingredients: [
      { ingredientName: 'Lemon', amount: 1 },
      { ingredientName: 'Pork meat', amount: 1 },
      { ingredientName: 'Egg', amount: 2 },
    ],
  },
];
