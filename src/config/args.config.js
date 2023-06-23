import ENV from "./env.config.js";
import { Command } from "commander";

export const argsConfig = () =>{
    const program = new Command();
    program
        .option('--debug', 'Variable para debuguear', false)
        .option('-p, --port <port>', 'Puerto del servidor', ENV.PORT) 
        .option('-m, --mode <mode>', 'Ambiente de desarrollo', ENV.NODE_ENV )
        .requiredOption('-u, --user', 'Usuario utilizando el aplicativo', 'Usuario no definido')  
    
    program.parse();   

}