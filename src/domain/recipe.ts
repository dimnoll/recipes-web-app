import { removeLeadingDigits, replacePercentPlus } from "./string-utils.js";

export type RecipeRecord = {
  id: number;
  name: string;
  url: string;
  image: string;
  local_image: string;
  author_name: string | null;
  author_url: string | null;
  ingredients: string[];
  steps: string[];
  about: string[];
};

export type RecipeSearchDoc = {
  id: number;
  name: string;
  url: string;
  image: string;
  local_image: string;
  author_name: string | null;
  author_url: string | null;
};

export class Recipe {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly image: string;
  readonly localImage: string;
  readonly authorName: string | null;
  readonly authorUrl: string | null;
  readonly ingredients: readonly string[];
  readonly steps: readonly string[];
  readonly about: readonly string[];

  constructor(record: RecipeRecord) {
    this.id = record.id;
    this.name = replacePercentPlus(record.name);
    this.url = record.url;
    this.image = record.image;
    this.localImage = record.local_image;
    this.authorName = record.author_name;
    this.authorUrl = record.author_url;
    this.ingredients = [...record.ingredients];
    this.steps = record.steps.map((step) => removeLeadingDigits(step));
    this.about = [...record.about];
  }

  toSearchDoc(): RecipeSearchDoc {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      image: this.image,
      local_image: this.localImage,
      author_name: this.authorName,
      author_url: this.authorUrl,
    };
  }
}
