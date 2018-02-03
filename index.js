arr_palavras_reservadas = ['if', '+', '==', '{']
count_ids = 1
txt_entrada = 'if (1 + 1 == 2) {'

// Agora vem a magia.......

arr_tokens_entrada = txt_entrada.split(' ')//aqui vem o regex
// console.log(arr_tokens_entrada)

for (token of arr_tokens_entrada){
    console.log(`analisando token: ${token}`)
    if (arr_palavras_reservadas.includes(token)){
        console.log(`encontrado como palavra reservada: ${token}`)
    }
    else{ // se não for reservada, então é um identificador
        console.log(`${token} id: #${count_ids}`)
        count_ids += 1
    }
}



// regex = RegExp('[0-9]')
// test = txt_entrada.split(regex)//aqui vem o regex
// console.log(test)


