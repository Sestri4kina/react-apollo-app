const { getRecipes, addRecipe, getRecipe } = require("../models/Recipe");
// const { getIngredient, getIngredients } = require("../models/Ingredient");
const sleep = require("../utils/sleep");

module.exports = {
  Recipe: {
    // ingredients: ({ ingredients }) => {
    //   return Promise.all(
    //     ingredients.map(ingredient => getIngredient(ingredient))
    //   );
    // }
  },
  Query: {
    recipes: async (_, args) => {
      await sleep(global.delay);
      return getRecipes(args);
    },
    recipe: async (_, args) => {
      await sleep(global.delay);
      return getRecipe(args);
    }
    // ingredients: async (_, args) => {
    //   await sleep(global.delay)
    //   return getIngredients(args)
    // }
  },
  Mutation: {
    addRecipe: async (_, { recipe }) => {
      await sleep(global.delay);
      return addRecipe(recipe);
    }
  }
};
