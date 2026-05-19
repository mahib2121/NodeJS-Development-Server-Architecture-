import * as fs from "fs";
import * as path from "path";
const filepath = path.join(process.cwd(), "./src/database/db.json");
export const readProduct= ()=>{

//console.log(filepath);
const products = fs.readFileSync(filepath, "utf-8");
        return JSON.parse(products);
} 