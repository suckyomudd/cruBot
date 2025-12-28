import { makePlainError } from "discord.js";
import getenv from "./src/env";

async function main() {
    console.log(await getenv())
} 

main()