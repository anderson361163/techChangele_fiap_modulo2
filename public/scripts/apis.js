
function CONTEXTO(){
    return window.location.origin;
}

function salvar(post){

    return axios({
        method: 'post',
        url: CONTEXTO()+'/posts',
        data: post
      });

}

function remover(id){

    return axios({
        method: 'delete',
        url: CONTEXTO()+'/posts/'+id
      });

}

function buscar(texto){

    return axios({
        method: 'get',
        url: CONTEXTO()+'/posts/search?texto='+texto
      });

}

function alterar(id){

    return axios({
        method: 'get',
        url: CONTEXTO()+'/posts/'+id,
      });

}