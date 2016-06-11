(function($){
    // Defining our jQuery plugin
    $.fn.rd_modal = function(prop){
        // Default parameters
        var options = $.extend({
            height : "400",
            width : "600",
            title: 'Resultados Digitais.',
            description:'Desafio Front end.',
            top: "20%",
            left: "30%",
        },prop);
                
        return this.click(function(e){
            $('#mensagem').html('');
            add_block_page();
            add_popup_box();
            add_styles();            
            $('.rd_modal').fadeIn();
        });
        
        function add_styles(){         
            $('.rd_modal').css({ 
                'position':'absolute', 
                'left':options.left,
                'top':options.top,
                'display':'none',
                'height': options.height + 'px',
                'width': options.width + 'px',
                'border':'1px solid #fff',
                'box-shadow': '0px 2px 7px #292929',
                '-moz-box-shadow': '0px 2px 7px #292929',
                '-webkit-box-shadow': '0px 2px 7px #292929',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px',
                'background': '#f2f2f2', 
                'z-index':'50',
            });
            $('.rd_modal_close').css({
                'position':'relative',
                'top':'-25px',
                'left':'20px',
                'float':'right',
                'display':'block',
                'height':'50px',
                'width':'50px',
                'background': 'url(https://paulund.co.uk/playground/demo/jquery_modal_box/images/close.png) no-repeat',
            });
            
            var pageHeight = $(document).height();
            var pageWidth = $(window).width();

            $('.rd_modal_page').css({
                'position':'absolute',
                'top':'0',
                'left':'0',
                'background-color':'rgba(0,0,0,0.6)',
                'height':pageHeight,
                'width':pageWidth,
                'z-index':'10'
            });
            $('.rd_modal_inner_modal_box').css({
                'background-color':'#fff',
                'height':(options.height - 35) + 'px',
                'width':(options.width - 35) + 'px',
                'padding':'10px',
                'margin':'15px',
                'border-radius':'10px',
                '-moz-border-radius':'10px',
                '-webkit-border-radius':'10px'
            });
        }
        
        function add_block_page(){
            var block_page = $('<div class="rd_modal_page"></div>');                        
            $(block_page).appendTo('body');
        }
                
        function add_popup_box(){
            var optionEstado = [];
            var optionNivel = [];
            for (i = 0; i < options.inputEstado.estado.length; i++) {
                optionEstado.push('<option value="'+ i +'">'+ options.inputEstado.estado[i] +'</option>');
            }
            for (i = 0; i < options.inputNivel.nivel.length; i++) {
                optionNivel.push('<option value="'+ i +'">'+ options.inputNivel.nivel[i] +'</option>');
            }
            
            var pop_up = $('<div class="rd_modal">'+
                                '<a href="#" class="rd_modal_close"></a>'+
                                '<div class="rd_modal_inner_modal_box">'+
                                    '<h2>' + options.title + '</h2>'+
                                    '<p>' + options.description + '</p>'+
                                    '<p id="mensagem"></p>'+
                                    '<form method="POST">'+
                                        '<div class="form-group">'+
                                            '<label for="name">' + options.inputName.label + ' (*) </label>'+
                                            '<span class="error nome label label-danger pull-right"> Nome é obrigátorio!</span>'+
                                            '<input type="text" class="form-control" id="' + options.inputName.name + '" name="' + options.inputName.name + '" placeholder="' + options.inputName.label + '">'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="email">' + options.inputMail.label + ' (*) </label>'+
                                            '<span class="error email label label-danger pull-right"> E-mail é obrigátorio!</span>'+
                                            '<span class="error email_end label label-danger pull-right"> Verifique o endereço de e-mail!</span>'+
                                            '<input type="email" class="form-control" id="' + options.inputMail.name + '" name="' + options.inputMail.name + '" placeholder="' + options.inputMail.label + '">'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="email">' + options.inputEstado.label + '</label>'+
                                            '<select name="' + options.inputEstado.name + '" id="' + options.inputEstado.name + '" class="form-control">'+ optionEstado +'</select>'+
                                        '</div>'+
                                        '<div class="form-group">'+
                                            '<label for="email">' + options.inputNivel.label + '</label>'+
                                            '<select name="' + options.inputNivel.name + '" id="' + options.inputNivel.name + '" class="form-control">'+ optionNivel +'</select>'+
                                        '</div>'+
                                        '<button type="submit" class="btn btn-success pull-right" id="myDiv">Enviar</button>'+
                                    '</form>'+
                                '</div>'+
                            '</div>');
            $(pop_up).appendTo('.rd_modal_page');
                         
            $('.rd_modal_close').click(function(){
                $(this).parent().fadeOut().remove();
                $('.rd_modal_page').fadeOut().remove();                 
            });

            $('#myDiv').on('click',function(){
                if( $('#name').val() == '' ){
                    $('.nome').css('display', 'inline').fadeOut(10000);
                    $('#name').focus();
                    return false;
                }    
                if( $('#email').val() == "" ){
                    $('.email').css('display', 'inline').fadeOut(10000);
                    $('#email').focus();
                    return false;
                }     
                if( $('#email').val() != "" ){
                    atpos = $('#email').val().indexOf("@");
                    dotpos = $('#email').val().lastIndexOf(".");
                 
                    if (atpos < 1 || ( dotpos - atpos < 2 )) {
                        $('.email_end').css('display', 'inline').fadeOut(10000);
                        $('#email').focus();
                        return false;
                    }
                }

                var request;
                request = $.ajax({
                    url: "http://date.jsontest.com",
                    type: "GET"
                });

                request.done(function (response, textStatus, jqXHR){
                    $('#mensagem').html('<div class="alert alert-success" role="alert">' + options.message.success + '</div>');
                });
            
                request.fail(function (jqXHR, textStatus, errorThrown){
                    $('#mensagem').html('<div class="alert alert-danger" role="alert">' + options.message.error + '</div>');
                });

                return false;

                return true;          
            });
        }
        return this;
    };
    
})(jQuery);