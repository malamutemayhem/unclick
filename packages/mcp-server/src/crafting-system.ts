export interface CraftingIngredient {
  itemId: string;
  quantity: number;
}

export interface CraftingRecipe {
  id: string;
  name: string;
  ingredients: CraftingIngredient[];
  output: CraftingIngredient;
  craftTime?: number;
  level?: number;
}

export class CraftingSystem {
  private recipes: Map<string, CraftingRecipe> = new Map();
  private inventory: Map<string, number> = new Map();
  private level = 1;
  private experience = 0;

  addRecipe(recipe: CraftingRecipe): void {
    this.recipes.set(recipe.id, recipe);
  }

  removeRecipe(id: string): boolean {
    return this.recipes.delete(id);
  }

  getRecipe(id: string): CraftingRecipe | undefined {
    return this.recipes.get(id);
  }

  addItem(itemId: string, quantity: number): void {
    this.inventory.set(itemId, (this.inventory.get(itemId) ?? 0) + quantity);
  }

  removeItem(itemId: string, quantity: number): boolean {
    const current = this.inventory.get(itemId) ?? 0;
    if (current < quantity) return false;
    const remaining = current - quantity;
    if (remaining === 0) {
      this.inventory.delete(itemId);
    } else {
      this.inventory.set(itemId, remaining);
    }
    return true;
  }

  getItemCount(itemId: string): number {
    return this.inventory.get(itemId) ?? 0;
  }

  canCraft(recipeId: string): boolean {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return false;
    if (recipe.level && recipe.level > this.level) return false;
    for (const ing of recipe.ingredients) {
      if ((this.inventory.get(ing.itemId) ?? 0) < ing.quantity) return false;
    }
    return true;
  }

  craft(recipeId: string): CraftingIngredient | null {
    if (!this.canCraft(recipeId)) return null;
    const recipe = this.recipes.get(recipeId)!;
    for (const ing of recipe.ingredients) {
      this.removeItem(ing.itemId, ing.quantity);
    }
    this.addItem(recipe.output.itemId, recipe.output.quantity);
    this.experience += 10;
    return { ...recipe.output };
  }

  craftMany(recipeId: string, count: number): number {
    let crafted = 0;
    for (let i = 0; i < count; i++) {
      if (this.craft(recipeId)) crafted++;
      else break;
    }
    return crafted;
  }

  availableRecipes(): CraftingRecipe[] {
    return Array.from(this.recipes.values()).filter((r) => this.canCraft(r.id));
  }

  allRecipes(): CraftingRecipe[] {
    return Array.from(this.recipes.values());
  }

  recipeCount(): number {
    return this.recipes.size;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  getLevel(): number {
    return this.level;
  }

  getExperience(): number {
    return this.experience;
  }

  inventoryItems(): Array<{ itemId: string; quantity: number }> {
    return Array.from(this.inventory.entries()).map(([itemId, quantity]) => ({
      itemId,
      quantity,
    }));
  }

  missingIngredients(recipeId: string): CraftingIngredient[] {
    const recipe = this.recipes.get(recipeId);
    if (!recipe) return [];
    const missing: CraftingIngredient[] = [];
    for (const ing of recipe.ingredients) {
      const have = this.inventory.get(ing.itemId) ?? 0;
      if (have < ing.quantity) {
        missing.push({ itemId: ing.itemId, quantity: ing.quantity - have });
      }
    }
    return missing;
  }
}
