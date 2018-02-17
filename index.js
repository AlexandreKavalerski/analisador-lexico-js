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
for(caractere of txt_entrada){
    if(!eh_espaco(caractere)){
        if(!eh_numero(caractere)){
            if(terminadores.includes(caractere)){
                console.log(`terminador: ${caractere}`);   
            }
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
