import * as fs from "fs";
import * as path from "path";

const filepath = path.join(process.cwd(), "./src/database/db.json");

// READ PRODUCTS
export const readProduct = () => {
  const products = fs.readFileSync(filepath, "utf-8");

  return JSON.parse(products);
};

// WRITE PRODUCTS
export const writeProduct = (data: any) => {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
};
