function obterMensagens() {
    var retorno = [];
  
    $.ajax({
      url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
      method: 'GET',
      dataType: 'json',
      async: false
    }).done(function(data) {
      retorno = data;
    }).fail(function(erro) {
      console.error("Erro ao obter mensagens:", erro);
    });
  
    return retorno;
  }
  
  function inserirMensagem(mensagem) {
    console.log("Enviando mensagem:", mensagem); // Adicionado para depuração
    $.ajax({
      url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/mensagens',
      method: 'POST',
      data: JSON.stringify(mensagem),
      async: true,
      contentType: 'application/json',
      dataType: 'text', // Alterado para 'text' para evitar parsererror
    }).done(function(data) {
      console.log("Mensagem inserida com sucesso!", data);
    }).fail(function(erro) {
      console.error("Erro ao inserir mensagem:", erro);
      console.log("Erro detalhes:", erro.responseText); // Adicionado para depuração
    });
  }
  
  function validarUsuario() {

    var objLoginSenha = {
        email: $("#email").val(), 
        senha: $("#password").val()} 

        var retorno = false;

        var validacao = $.ajax({
            url: 'https://app-uniesp-p2-b8d2992ac568.herokuapp.com/usuarios/validar',
            method: 'POST',
            dataType: 'json',
            async: false,
            headers: {
                'Access-Control-Allow-Origin': '*'
                    },
            contentType: 'application/json',
            data: JSON.stringify(objLoginSenha)
        }).fail(function(){
            return retorno;
        });
    
        validacao.done(function(data) {
            retorno = data;
        });
        
        if (retorno){
            window.location.href="mensagem.html"
        } else {
            alert("Login ou senha incorreta.")
        }

        return retorno;
    }
  
    function listarMensagens(){
        var mensagens = obterMensagens();
        var tabela = $('#messages-table');
      
        $.each(mensagens, function(index, mensagem){
          var linha = '<tr>' +
            '<td>' + mensagem.nome + '</td>' +
            '<td>' + mensagem.email + '</td>' +
            '<td>' + mensagem.mensagem + '</td>' +
            '</tr>';
          tabela.append(linha);
        });
      }
      
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('send-button').addEventListener('click', function(event) {
      event.preventDefault();
  
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const mensagem = document.getElementById('msg').value;
  
      if (nome && email && mensagem) {
        inserirMensagem({ nome, email, mensagem });
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  });

  
  