$(document).ready(function() {
    getData();
    removeData();
    postElement();
    putElement();

    showInput();
    hideInput();
});


function hideInput(){
    $(document).on('focusout','input.input-element',function(){
        $(this).toggle();
        $(this).prev('li.element').toggle();
    });
}


function showInput(){
    $(document).on('click', 'li.element', function(){
        $(this).toggle();
        $(this).next('input.input-element').toggle().focus();
    });
}


function putElement(){
    $(document).on('keydown','input.input-element', function(event){
        var idElement = $(this).attr('data-id');
    if (event.keyCode == 13 || event.which == 13){
        var modElement = $(this).val();
        changeElement(modElement, idElement)
        }
    });
}


function changeElement(value, id){
    $.ajax(
        {
            url:'http://157.230.17.132:3001/todos/' + id,
            method:'PUT',
            data:{
                text:value
            },
            success: function(resp){
                $('.todos').empty();
                getData();
            },
            error: function(){
                alert('Si è verificato un errore');
            }
        }
    )
}


function send(value, id){
    if (event.which == 13 || event.keydown == 13 ){
        console.log(value);
        console.log(id);

    }
}


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
