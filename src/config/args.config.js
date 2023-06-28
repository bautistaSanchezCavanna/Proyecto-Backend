import { Command } from "commander";

    const program = new Command();
    program
        .option('--debug', 'Variable para debuguear', false)
        .option('-p, --port <port>', 'Puerto del servidor', 8080) 
        .option('-m, --mode <mode>', 'Ambiente de desarrollo', 'production' )
        .requiredOption('-u, --user', 'Usuario utilizando el aplicativo', 'Usuario no definido')  
    
    program.parse();   

export default program.opts();
