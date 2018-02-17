const arr_palavras_reservadas = ['if', 'var', 'console.log', 'else', 'for']
const terminadores = ['+', '=', '\n']
count_ids = 1
txt_entrada = `
    var i = 6;
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
var token_atual = ''
var kw_encontrados = [];
var identificadores_encontrados = [];
for(caractere of txt_entrada){
    if(!eh_espaco(caractere)){
        if(!eh_numero(caractere)){
            if(terminadores.includes(caractere)){
                console.log(`token: ${token_atual} \nterminador: ${caractere}`);   
            }
            else{
                token_atual += caractere;
            }
        }
    }else{
        if(arr_palavras_reservadas.includes(token_atual)){
            console.log(`kw encontrado: ${token_atual} \n`);
            kw_encontrados.push(token_atual);
            token_atual = '';
        }
        else if(token_atual){
            console.log(`identificador encontrado: ${token_atual} \n`);
            identificadores_encontrados.push(token_atual);
            token_atual = '';
        }
    }
    
    

}


function eh_espaco(caractere){
    return caractere === ' ';
}

function eh_numero(caractere){
    return caractere === 0 | 
    caractere === 1 | 
    caractere === 2 | 
    caractere === 3 | 
    caractere === 4 | 
    caractere === 5 | 
    caractere === 6 | 
    caractere === 7 | 
    caractere === 8 | 
    caractere === 9;
}
