/* começando chamando os dados do html para o js */
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');
/* primeira etapa (onde tudo começa ) */
let etapaAtual = 0;
let numero ='';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

/* Loop dos numeros */
    for(let i=0; i<etapa.numeros; i++) {
        if(i === 0)  {
            numeroHtml += '<div class="numero pisca"></div>';   
         } else {
        numeroHtml += '<div class="numero"></div>';
       }
    }


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

/* Atualizada interface e filtra os candidatos */
function atualizaInterFace() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    }); /* começando os votos */
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else  {
                fotosHtml += `<div class="d-1-image "><img src="imagens/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;   
            }
        }
/* essa parte sao do voto nulo */
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div';
    }            
}

/* Essa função e pra colocar os numeros */
function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    if(elnumero !== null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
/* Essa função e pra remover o pisca e depois colocar de novo e atualizar */
        elnumero.classList.remove('pisca');
        if(elnumero.nextElementSibling !== null) {
        elnumero.nextElementSibling.classList.add('pisca');
    } else {
        atualizaInterFace();
    }
    }
}

function branco() {
        numero = '';
        votoBranco = true ;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div`;
        lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
       
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }

    }
}

comecarEtapa();


/*tudo separado por partes
_ funcoes ( branco,
            corrige,
             confirma,
              clicou no numero (n),
               atualiza interface e
                começar etapa
                )

_ chamar os HTML(let), por partes (
    seu voto,
    cargo,
    descrição,
    aviso,
    lateral,
    numeros
)
_ importante nao pode esquecer de chamar a etapaAtual */ 