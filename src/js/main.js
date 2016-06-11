$(document).ready(function(){

    $('#integration_form').rd_modal({
        token: '62bb61431348e22850828a5829c4373faafe29c1',
        secret: '51a266c2844ccd5cac83d88de88d82d05358aa51',
        action: '/send',
        modal: true,
        height: '550',
        width: '600',
        title: 'Resultados Digitais.',
        description:'Desafio Front end.',
        message: {
            success: 'Registro salvo com sucesso!',
            error: 'Não foi possível enviar. Tente novamente!'
        },
        inputName:{
            name: 'name',
            label: 'Nome',
            required: true
        },
        inputMail:{
            name: 'email',
            label: 'E-mail',
            required: true
        },
        inputEstado:{
            name: 'estado',
            label: 'Estado', 
            estado: ['PR','SC','SP','RS'],
        },
        inputNivel:{
            name: 'nivel',
            label: 'Nível', 
            nivel: ['Iniciante','Intermediário','Avançado','Ninja']
        }
    });
});