const dezenas = ["dez ", "onze ", "doze ", "treze ", "quatorze ", "quinze ", "dezesseis ", "dezessete ", "dezoito ", "dezenove "]
const nums = [{unid:"um", dezena: "dez", centena:"cem"},
              {unid:"dois", dezena: "vinte", centena:"duzentos"}, 
              {unid:"três", dezena: "trinta", centena:"trezentos"},
              {unid:"quatro", dezena: "quarenta", centena:"quatrocentos"},
              {unid:"cinco", dezena: "cinquenta", centena:"quinhentos"}, 
              {unid:"seis", dezena: "sessenta", centena:"seiscentos"},
              {unid:"sete", dezena: "setenta", centena:"setecentos"},
              {unid:"oito", dezena: "oitenta", centena:"oitocentos"}, 
              {unid:"nove", dezena: "noventa", centena:"novecentos"}];
const milharesPlural = ["", "mil","milhões", "bilhões", "trilhões", "quatrilhões"];
const milharesSingular = ["", "mil", "milhão", "bilhão", "trilhão", "quatrilhão"];

function Onlynumbers(e)
{
	var tecla=new Number();
	if(window.event) {
		tecla = e.keyCode;
	}
	else if(e.which) {
		tecla = e.which;
	}
	else {
		return true;
	}
	if((tecla < "48") || (tecla > "57")){
        alert("Por favor, digite apenas números!");
        return false;
	}
}

function getNumber(){
    let numero = document.getElementById("InputNumero").value;
    let result = numero.split('').reverse();
    let vet = [];
    let stringResult = "";
    let lbl = document.getElementById("lblExibir");

    for(let i = 0; i < result.length; i++){
        if(vet[Math.floor(i/3)] === undefined){
            vet[Math.floor(i/3)] = result[i];
        }else{
            vet[Math.floor(i/3)] += result[i];
        }
    }

    for(let i = vet.length-1; i >= 0; i--){
        vet[i].toString();
        for(let j = vet[i].length-1; j >=0;j--){
            if(stringResult !== ""){
                if(j == vet[i].length-1){
                    if((vet[i][0] != 0)||(vet[i][1] != 0)||(vet[i][2] != 0)){
                        if(i != 0){
                            stringResult += ", "
                        }else{
                            stringResult += " e "
                        }
                    }
                }else{
                    if(vet[i][j] != 0){
                        if(vet[i][1] != 1){
                            stringResult += " e "
                        }
                    }
                }
            }
            stringResult += convertNumbers(vet[i][j],vet, i, j);
            if(j == 0){
                if(vet[i][j] == 1){
                    stringResult += milharesSingular[i];
                }else if((vet[i][0] != 0)||(vet[i][1] != 0)||(vet[i][2] != 0)){
                    stringResult += milharesPlural[i];
                }
            }
        }
    }
    document.getElementById("lblExibir").innerHTML = stringResult;
}

function convertNumbers(num,vetor, separador, type){
    stringnum = "";
    if(num == 1){
        if(type == 0){
            if(vetor[separador][1] != 1){
                if((separador != 1) && (vetor[separador][1] != null) && (vetor[separador][2] != null)){
                    stringnum = "um "
                }
            }
        }else if(type == 1){
            stringnum = dezenas[vetor[separador][0]];
        }else if(type == 2){
            if((vetor[separador][type-1] != 0)||(vetor[separador][type-2] != 0)){
                stringnum = "cento "
            }else{
                stringnum = "cem ";
            }
        }
    }
    else if(num == 0){
         if(vetor[0][1] == null){
             stringnum = "zero "
         }else{
             stringnum = "";
         }
     }else{
        for(let i = 2; i < 10; i++){
            if(num == i){
                if(type == 0){
                    if(vetor[separador][1] != 1){
                        transformNumbers(type, nums[i-1].unid, nums[i-1].dezena, nums[i-1].centena)
                    }
                }else{
                    transformNumbers(type, nums[i-1].unid, nums[i-1].dezena, nums[i-1].centena)
                }
            }
        }
     }
    return stringnum;
}

function transformNumbers(tipo, unidade, dezena, centena){
    if(tipo == 0){
        stringnum = `${unidade} `;
    }else if(tipo == 1){
        stringnum = `${dezena} `;
    }else if(tipo == 2){
        stringnum = `${centena} `;
    }
}