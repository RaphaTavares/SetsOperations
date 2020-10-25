var linhas;
var lista = [];
var lista1 = [];
var lista2 = [];
var lista3 = [];
window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('txtfiletoread');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                var fileReader = new FileReader();
                fileReader.onload = function (e) {
                    var fileContents = document.getElementById('filecontents');
                    fileContents.innerText = fileReader.result;
                    
                    linhas = fileReader.result.split('\n');
                    
                    
                    for(let i = 0; i < linhas.length; i++)
                    {
                        //regex que remove todos os caracteres especiais
                        lista1.push(linhas[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z,-])/g, ''));

                    }

                    //organiza as letras em um array
                    for(let i = 0; i < lista1.length; i++)
                    {
                        lista3[i] = lista1[i].slice(0, 1);
                        lista2.push(linhas[i].normalize('NFD').replace(/([\u0300-\u036f]|[^0-9,-])/g, ''));
                        
                    }
                    
                    //organiza os numeros em um array
                    for(let i = 0; i < lista2.length; i++)
                    {
                        lista.push(lista2[i].split(','));
                    }

                    //junta as letras e numeros no mesmo array, organizados ("ta pronto sorvetinho")
                    for(let i = 0; i < lista3.length; i++)
                    {
                        lista[i].unshift(lista3[i]);
                    }
                    
                    

                    //console.table(lista);

                        var table = document.getElementById("tabela");
    for(let i = 0; i < linhas.length; i++)
    {
        newLinha = document.createElement('tr');
        

        newColuna = document.createElement('td');
        var texto = document.createTextNode(linhas[i]);

        newColuna.appendChild(texto);
        newLinha.appendChild(newColuna);
        table.appendChild(newLinha);
    }
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }

}

//var conjuntodaspartes1 = [];
//var conjuntodaspartes2 = [];
var resultado = [];
const delay = ms => new Promise(res => setTimeout(res, ms));

const inputar = async () => {
    await delay(300);
    let input1 = document.getElementById("elemento1");
    input1.value = lista[0][0];

    let input2 = document.getElementById("elemento2");
    input2.value = lista[1][0];

}


function calcula()
{

    var operacao = document.getElementById("operacao").value;


    switch(operacao)
    {
        case '1':
            maiorQue();
            document.getElementById("conteudoresultado").textContent = formata();
            break;

        case '2':
            menorQue();
            document.getElementById("conteudoresultado").textContent = formata();
            break;

        case '3':
            igual();
            document.getElementById("conteudoresultado").textContent = formata();
            break;

        case '4':
            quadrado();
            document.getElementById("conteudoresultado").textContent = formata();
            break;

        case '5':
            raiz();
            document.getElementById("conteudoresultado").textContent = formata();
            break;
        default:
            console.log("default");
            break;
    }
    document.getElementById("dominio").textContent = "D = {" + dominio() + "}";
    document.getElementById("imagem").textContent = "I = {" + imagem() + "}";
    document.getElementById("funcional").textContent = funcional();
    document.getElementById("injetora").textContent = injetora();
    document.getElementById("total").textContent = total();
    document.getElementById("sobrejetora").textContent = sobrejetora();
    document.getElementById("monomorfismo").textContent = monomorfismo();
    document.getElementById("epimorfismo").textContent = epimorfismo();
    document.getElementById("isomorfismo").textContent = isomorfismo();
}

function maiorQue()
{
    while(resultado.length) {
        resultado.pop();
     }

    for(let i = 1; i <= lista[0].length; i++)
    {
        for(let j = 1; j <= lista[1].length; j++)
        {
            if(parseInt(lista[0][i], 10) > parseInt(lista[1][j], 10))
            {
                let par = [];
                par.push(lista[0][i]);
                par.push(lista[1][j]);
                resultado.push(par);
            }
        }
    }
    return resultado;
}

function igual()
{
    while(resultado.length) {
        resultado.pop();
     }

    for(let i = 1; i < lista[0].length; i++)
    {
        for(let j = 1; j < lista[1].length; j++)
        {
            if(parseInt(lista[0][i], 10) == parseInt(lista[1][j], 10))
            {
                let par = [];
                par.push(lista[0][i]);
                par.push(lista[1][j]);
                resultado.push(par);
            }
        }
    }
    return resultado;
}

function quadrado()
{
    while(resultado.length) {
        resultado.pop();
     }

    for(let i = 1; i < lista[0].length; i++)
    {
        for(let j = 1; j < lista[1].length; j++)
        {
            if(parseInt(lista[0][i], 10) == parseInt((lista[1][j] * lista[1][j]), 10))
            {
                let par = [];
                par.push(lista[0][i]);
                par.push(lista[1][j]);
                resultado.push(par);
            }
        }
    }
    return resultado;
}

function dominio()
{
    let dominio = [];

    for(let i = 0; i < resultado.length; i++)
    {
        dominio.push(resultado[i][0]);
    }

    return removeDuplicatas(dominio);
        
}

function removeDuplicatas(array)
{
    let novaArr = array.filter(function(este, i) {
        return array.indexOf(este) === i});
    
    return novaArr;
}

function imagem()

{
    let imagem = [];
    for(let i = 0; i < resultado.length; i++)
    {
        imagem.push(resultado[i][1]);
    }


    return removeDuplicatas(imagem); 
}

function formata()
{
    let formatado = [];

    for(let i = 0; i < resultado.length; i++)
    {
        formatado[i] = "(";
        formatado[i] += resultado[i][0];
        formatado[i] += ", ";
        formatado[i] += resultado[i][1];
        formatado[i] += ")";
    }
    return formatado;
}

function raiz()
{
    while(resultado.length) {
        resultado.pop();
     }

    for(let i = 1; i < lista[0].length; i++)
    {
        for(let j = 1; j < lista[1].length; j++)
        {
            if(parseInt((lista[0][i] * lista[0][i]), 10) == parseInt(lista[1][j], 10))
            {
                let par = [];
                par.push(lista[0][i]);
                par.push(lista[1][j]);
                resultado.push(par);
            }
        }
    }
    return resultado;
}

function menorQue()
{
    while(resultado.length) {
        resultado.pop();
     }

    for(let i = 1; i < lista[0].length; i++)
    {
        for(let j = 1; j < lista[1].length; j++)
        {
            if(parseInt(lista[0][i]) < parseInt(lista[1][j]))
            {
                let par = [];
                par.push(lista[0][i]);
                par.push(lista[1][j]);
                resultado.push(par);
            }
        }
    }
    return resultado;
}

function funcional()
{
    let a = [];
    for(let i = 0; i < resultado.length; i++)
    {
        a.push(resultado[i][0]);
    }

    if(checaDuplicatas(a))
    {
        return false;
    }
    else
    {
        return true;
    }
    console.table(resultado);
}

function injetora()
{
    let b = [];
    for(let i = 0; i < resultado.length; i++)
    {
        b.push(resultado[i][1]);
    }

    if(checaDuplicatas(b))
    {
        return false;
    }
    else
    {
        return true;
    }
}

function checaDuplicatas(array) {
    return (new Set(array)).size !== array.length;
}

function total()
{
    let elementosa = lista[0].slice().splice(1);

    let resultadoa = [];
    for(let i = 0; i < resultado.length; i++)
    {
        resultadoa.push(resultado[i][0]);
    }

    let resultadoaunico = removeDuplicatas(resultadoa);

    for(let i = 0; i < elementosa.length; i++)
    {
        if(resultadoaunico.indexOf(elementosa[i]) == -1)
        {
            return false;
        }
    }
    return true;
    
}

function sobrejetora()
{
    let elementosb = lista[1].slice().splice(1);
    console.table(elementosb);
    console.table(resultado);

    let resultadob = [];
    for(let i = 0; i < resultado.length; i++)
    {
        resultadob.push(resultado[i][1]);
    }

    let resultadobunico = removeDuplicatas(resultadob);

    for(let i = 0; i < elementosb.length; i++)
    {
        if(resultadobunico.indexOf(elementosb[i]) == -1)
        {
            return false;
        }
    }
    return true;
}

function monomorfismo()
{
    if(total() && injetora())
    {
        return true;
    }
    else
    {
        return false;
    }
}

function epimorfismo()
{
    if(funcional() && sobrejetora())
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isomorfismo()
{
    if(monomorfismo() && epimorfismo)
    {
        return true;
    }
    else
    {
        return false;
    }
}