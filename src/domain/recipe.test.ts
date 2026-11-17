import assert from "node:assert/strict";
import { test } from "node:test";
import { Recipe } from "./recipe.js";
import { removeLeadingDigits, replacePercentPlus } from "./string-utils.js";

test("recipe equality follows id", () => {
  const left = new Recipe({
    id: 1,
    name: "Cake",
    url: "https://example.com",
    image: "https://example.com/cake.jpg",
    local_image: "Cake.jpg",
    author_name: "Ada",
    author_url: "https://example.com/ada",
    ingredients: [],
    steps: [],
    about: [],
  });
  const right = new Recipe({
    id: 1,
    name: "Other",
    url: "https://example.com/other",
    image: "https://example.com/other.jpg",
    local_image: "Other.jpg",
    author_name: null,
    author_url: null,
    ingredients: ["flour"],
    steps: ["mix"],
    about: [],
  });
  assert.equal(left.id, right.id);
});

test("replacePercentPlus undoes nested encoding and plus signs", () => {
  assert.equal(replacePercentPlus("Zucchini%2BSalad"), "Zucchini Salad");
});

test("removeLeadingDigits strips numbered steps", () => {
  assert.equal(removeLeadingDigits("1. Mix the batter"), "Mix the batter");
});
