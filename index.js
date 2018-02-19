const palavras_reservadas = ['if', 'var', 'console.log', 'else', 'for']
const operadores = ['+','-','/','*','<','>','=','%','!']
const terminadores = [';','(',')','[',']','{','}','"'] 
txt_entrada = `
    var i = 600;
    if ( i % 2 == 0 ) {
        console.log("É número par!");
    }
    else {
        console.log("É número ímpar!");
    }
    for(j = 0; j < 1; j++){
        console.log(j);
    }
`

var token_atual = '';
var pr_encontrados = [];                // 1 - NO GRAU
var identificadores_encontrados = [];   // 2 - NO GRAU
var operadores_encontrados = [];        // 3 - NO GRAU
var constantes_encontrados = [];        // 4 - NO GRAU (SÓ NÚMEROS INTEIROS)
var terminadores_encontrados = [];      // 5 - NO GRAU
var aspas_abertas = false;
var rastro = "nada";

for(caractere of txt_entrada){
    if(aspas_abertas){
        if(caractere == '"'){
            aspas_abertas = !aspas_abertas;
            rastro = "constante";
            token_atual = checar_token(token_atual);
        }
        token_atual += caractere;
        rastro = "terminador";
    }
    else{
        if(!eh_espaco(caractere)){
            if(!eh_operador(caractere)){
                if(!eh_terminador(caractere)){
                    if(!eh_numero(caractere)){
                        if(rastro != "letra"){
                            token_atual = checar_token(token_atual);
                        }
                        token_atual += caractere;
                        rastro = "letra";
                    }
                    else if(Number.isInteger(parseInt(token_atual[0])) || token_atual == ''){
                        token_atual += caractere;
                        rastro = "constante";
                    }
                    else{
                        token_atual = checar_token(token_atual);
                        token_atual += caractere;
                        rastro = "constante";
                    }
                }
                else{
                    token_atual = checar_token(token_atual);
                    token_atual += caractere;
                    rastro = "terminador";
                    if(caractere == '"'){
                        aspas_abertas = !aspas_abertas;
                        token_atual = checar_token(token_atual);
                    }
                }
            }
            else if(operadores.includes(token_atual[0]) || token_atual == ''){
                token_atual += caractere;
                rastro = "operador";
            }
            else{
                token_atual = checar_token(token_atual);
                token_atual += caractere;
                rastro = "operador";
            }
        }
        else{
            token_atual = checar_token(token_atual);
            rastro = "nada";
        }
    }
}

console.log(`palavras reservadas: ${pr_encontrados}
\nidentificadores: ${identificadores_encontrados} 
\noperadores: ${operadores_encontrados} 
\nterminadores: ${terminadores_encontrados}
\nconstantes: ${constantes_encontrados}`);

function checar_token(token_atual){
    if(token_atual != ''){
        switch(rastro) {
            case "nada":
                break;
            case "letra":
                if(palavras_reservadas.includes(token_atual)){
                    pr_encontrados.push(token_atual);
                }
                else if(token_atual != "\n"){
                    identificadores_encontrados.push(token_atual);
                }
                break;
            case "operador":
                operadores_encontrados.push(token_atual);
                break;
            case "constante":
                constantes_encontrados.push(token_atual);
                break;
            case "terminador":
                terminadores_encontrados.push(token_atual);
                break;
        }
    }
    return '';
}

function eh_espaco(caractere){
    return caractere === ' ';
}

function eh_operador(caractere){
    return operadores.includes(caractere);
}

function eh_terminador(caractere){
    return terminadores.includes(caractere)
}

function eh_numero(caractere){
    var n = parseInt(caractere);
    return Number.isInteger(n);
}
