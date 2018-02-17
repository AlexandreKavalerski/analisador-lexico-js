const arr_palavras_reservadas = ['if', 'var', 'console.log', 'else', 'for']
// Para automatizar a criação da Regex: (Com erros) #TODO
// var txt_regex = arr_palavras_reservadas.reduce((prev, el) => {
//     return `(${prev}(${el}([^a-z]))`;
// });

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

// Agora vem a magia.......

var regex = /((if([^a-z]))|(var([^a-z]))|(console.log([^a-z]))|(else([^a-z]))|(for([^a-z])))/gm;


// var tokens_palavras_reservadas = txt_entrada.search(regex)//aqui vem o regex
var tokens_palavras_reservadas = [];
while (matches = regex.exec(txt_entrada)){
    if(!tokens_palavras_reservadas.includes(matches[1]))
        tokens_palavras_reservadas.push(matches[1])
}
console.log(tokens_palavras_reservadas)