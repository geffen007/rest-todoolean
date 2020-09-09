$(document).ready(function() {
    getData();
    removeData();
    postElement();

    $(document).on('click', 'li', function(){
        var elemento = $(this);
        var idElement = elemento.attr('data-id');
        $(this).toggle();
        $(this).next('input').toggle().focus();
    });
    $(document).on('focusout','input',function(){
        $(this).toggle();
        $(this).prev('li').toggle();
    });




});

function postElement(){
    $('button.post-element').click(function(){
        var newElement = $('#new-element').val();
        createElement(newElement);
    });
}

function createElement(element){
    $.ajax(
        {
            url: 'http://157.230.17.132:3001/todos',
            method: 'POST',
            data: {
                text: element,
            },
            success: function(resp){
                $('.todos').empty();
                getData();
            },
            error: function(){
                alert('error')
            }
        }
    );
}

function removeData(){
    $(document).on('click', 'span.x', function(){
        var elemento = $(this);
        var idElement = elemento.parent().attr('data-id');
        deleteElement(idElement);
    });
}

function deleteElement(id){
    $.ajax(
        {
            url: 'http://157.230.17.132:3001/todos/' + id,
            method: 'DELETE',
            success: function(resp){
                $('.todos').empty();
                getData();
            },
            error: function(){
                alert('error')
            }
        }
    );
}


function getData(){
    $.ajax(
        {
            url: 'http://157.230.17.132:3001/todos',
            method: 'GET',
            success: function(resp){
                getElement(resp)
            },
            error: function(){
                alert('error')
            }
        }
    );
}


function getElement(data){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    for (var i = 0; i < data.length; i++) {
        var context = data[i];
        var html = template(context);
        $('ol.todos').append(html);
    }
}
