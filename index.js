const palavras_reservadas = ['if', 'var', 'console.log', 'else', 'for']
const operadores = ['+', '-', '/', '*', '<', '>', '=', '%', '!']
const terminadores = [';', '(', ')', '[', ']', '{', '}', '"']
var fs = require('file-system')
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

var token_atual = '';                   // Armazena a sequencia de caracteres que forma um token
var pr_encontrados = [];
var identificadores_encontrados = [];
var operadores_encontrados = [];
var constantes_encontrados = [];        // Somente números inteiros
var terminadores_encontrados = [];
var aspas_abertas = false;              // Se for true todo o conteúdo deve ser salvo como um só
var rastro = "nada";                    // Identifica o tipo de caractere anterior ao atual (identificar sequencias)
var cont_linha = 0;                     // Identifica a linha de um token
var cont_coluna = 0;


for (caractere of txt_entrada) {
  console.log(`cont coluna ${cont_coluna}`);
  if (aspas_abertas) {
    if (caractere == '"') {
      aspas_abertas = !aspas_abertas;
      rastro = "constante";
      token_atual = checar_token(token_atual);
    }
    token_atual += caractere;
    rastro = "terminador";
  }

  else if (caractere == "\n") {
    cont_linha++;
    cont_coluna = 0;
  }

  else {
    if (!eh_espaco(caractere)) {
      if (!eh_operador(caractere)) {
        if (!eh_terminador(caractere)) {
          if (!eh_numero(caractere)) {
            if (rastro != "letra") {
              token_atual = checar_token(token_atual);
            }
            token_atual += caractere;
            rastro = "letra";
          }
          else if (Number.isInteger(parseInt(token_atual[0]))) {
            token_atual += caractere;
            rastro = "constante";
          }
          else {
            token_atual = checar_token(token_atual);
            token_atual += caractere;
            rastro = "constante";
          }
        }
        else {
          token_atual = checar_token(token_atual);
          token_atual += caractere;
          rastro = "terminador";
          if (caractere == '"') {
            aspas_abertas = !aspas_abertas;
            token_atual = checar_token(token_atual);
          }
        }
      }
      else if (operadores.includes(token_atual[0])) {
        token_atual += caractere;
        rastro = "operador";
      }
      else {
        token_atual = checar_token(token_atual);
        token_atual += caractere;
        rastro = "operador";
      }
    }
    else {
      token_atual = checar_token(token_atual);
      rastro = "nada";
    }
  }
  cont_coluna++;
}

console.log(`palavras reservadas: ${pr_encontrados}
\nidentificadores: ${identificadores_encontrados} 
\noperadores: ${operadores_encontrados} 
\nterminadores: ${terminadores_encontrados}
\nconstantes: ${constantes_encontrados}
\ncont linha ${cont_linha}`);
var saida_arquivo = 'token;tipo_token;posicao(col);\n';
var aux_token_repetido = [];

concat_retorno_arquivo(pr_encontrados, 'Palavra Reservada');
concat_retorno_arquivo(identificadores_encontrados, 'Identificador');
concat_retorno_arquivo(operadores_encontrados, 'Operador');
concat_retorno_arquivo(constantes_encontrados, 'Constante');

fs.writeFile('./saidas/resultado.csv', saida_arquivo, function (err) { })

function checar_token(token_atual) {
  if (token_atual != '') {
    switch (rastro) {
      case "nada":
        break;
      case "letra":
        if (palavras_reservadas.includes(token_atual)) {
          pr_encontrados.push(token_atual);
        }
        else if (token_atual != "\n") {
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

function eh_espaco(caractere) {
  return caractere === ' ';
}

function eh_operador(caractere) {
  return operadores.includes(caractere);
}

function eh_terminador(caractere) {
  return terminadores.includes(caractere)
}

function eh_numero(caractere) {
  var n = parseInt(caractere);
  return Number.isInteger(n);
}

function concat_retorno_arquivo(items, tipo_token) {
  for (id of items) {
    if (aux_token_repetido[id]) {
      pos = aux_token_repetido[id].ultima_pos + 1

      saida_arquivo += `${id}; ${tipo_token}; ${txt_entrada.indexOf(id, pos)}\n`;
      aux_token_repetido[id] = { token: id, qtd: aux_token_repetido[id].qtd + 1, ultima_pos: txt_entrada.indexOf(id, pos) }
    } else {
      saida_arquivo += `${id}; ${tipo_token}; ${txt_entrada.indexOf(id)}\n`;
      aux_token_repetido[id] = { token: id, qtd: 1, ultima_pos: txt_entrada.indexOf(id) }
    }
  }
  aux_token_repetido = []
}