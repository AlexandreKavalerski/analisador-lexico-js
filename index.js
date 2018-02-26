const palavras_reservadas = ['if', 'var', 'console.log', 'else', 'for']
const operadores = ['+', '-', '/', '*', '<', '>', '=', '%', '!']
const terminadores = [';', '(', ')', '[', ']', '{', '}', '"']
var fs = require('file-system')
var txt_entrada = fs.readFileSync('entradas/comando.js', 'utf8')

linhas_txt_entrada = txt_entrada.split('\n');

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

var saida_arquivo = 'token;tipo_token;posicao(linha);posicao(coluna);\n';
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
      ultima_col = aux_token_repetido[id].ultima_col + 1
      ultima_linha = aux_token_repetido[id].ultima_linha

      linha_e_coluna = get_linha_e_coluna_token(id, ultima_col, ultima_linha);

      saida_arquivo += `${id}; ${tipo_token}; ${linha_e_coluna.linha};${linha_e_coluna.coluna}\n`;

      aux_token_repetido[id] = { token: id, qtd: aux_token_repetido[id].qtd + 1, ultima_col: linha_e_coluna.coluna, ultima_linha: linha_e_coluna.linha }
    } else {
      linha_e_coluna = get_linha_e_coluna_token(id);
      saida_arquivo += `${id}; ${tipo_token}; ${linha_e_coluna.linha};${linha_e_coluna.coluna}\n`;

      aux_token_repetido[id] = { token: id, qtd: 1, ultima_col: linha_e_coluna.coluna, ultima_linha: linha_e_coluna.linha }
    }
  }
  aux_token_repetido = []
}
function get_linha_e_coluna_token(token, ultima_col = false, ultima_linha = false) {
  for (const linha of linhas_txt_entrada) {
    var col_token = linha.indexOf(token);
    if (col_token >= 0) {
      var linha_token = linhas_txt_entrada.indexOf(linha)
      if (!(ultima_col && ultima_linha)) {
        return { linha: linha_token, coluna: col_token };
      }
      else {
        if (linha_token == ultima_linha && col_token > ultima_col) {
          return { linha: linha_token, coluna: col_token };
        }
        else if ((linha_token != ultima_linha || col_token != ultima_col) && (linha_token > ultima_linha || col_token > ultima_col)) {
          return { linha: linha_token, coluna: col_token };
        }
      }
    }
  }
  return false;
}