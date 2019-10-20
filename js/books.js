$(function (events, handler) {

//------------- Zadanie 3 -----------------------------------------------------------

    var tBody = $('#tBody');
    getBooks()

function getBooks() {
    $.ajax({
        url: "http://localhost:8282/books/",
        type: "GET",
        dataType: "json",
        contentType: "application/json"
    }).done(function (result) {
        tBody.html('');
        for (var i = 0; i < result.length; i++) {
            //Odbieram pierwszą książkę
            var book = result[i];
            //Tworzę nowy wiersz
            var tr = $('<tr>').addClass('bookRecord');
            //Tworzę kolumny
            $('<td>').text(book.id).attr('id', 'bookId_' + book.id).addClass('bookId').appendTo(tr);
            $('<td>').text(book.title).attr('id', 'title_' + book.id).addClass('bookTitle')
                .attr('data-method', 'GET').appendTo(tr);
            $('<td>').text(book.author).attr('id', 'bookAuthor_' + book.id).appendTo(tr);
            $('<td><button class="btn btn-danger dltBtn" data-method="DELETE">Delete</button></td>').appendTo(tr);

            //Podpinam wiersz pod tabelę na stronie
            tr.appendTo(tBody);
            // Tworze wiersz ukryty który będzie rozwijany po kliknięciu na tytuł książki
            var hiddenTr = $("<tr>").hide();
            $("<td colspan = 4>").appendTo(hiddenTr);
            hiddenTr.appendTo(tBody);
        }
    });
}

//------------- Zadanie 4 -----------------------------------------------------------

    tBody.on('click','.bookTitle' , function () {
        var id = $(this).prev().text();
        var bookDescription = $(this).parent().next().toggle(300);


        $.ajax({
            url: "http://localhost:8282/books/" + id,
            type: "GET",
            dataType: "json",
            contentType: "application/json"
        }).done(function (result) {
            var input = 'ISBN: ' + result.isbn + '<br>Publisher: ' + result.publisher + '<br>Type: ' + result.type;
            bookDescription.find('td').html(input);
        });
    });



//------------- Zadanie 5 -----------------------------------------------------------

    $('#formBook').on('submit',  function (event) {
        event.preventDefault();

        var bookId = $('#formId').val();
        var bookIsbn = $('#formIsbn').val();
        var bookAuthor = $('#formAuthor').val();
        var bookTitle = $('#formTitle').val();
        var bookPublisher = $('#formPublisher').val();
        var bookType = $('#formType').val();
        var ajaxType = $("#submitBtn").data("method");

        var book = {id: bookId, isbn: bookIsbn, title: bookTitle, author: bookAuthor, publisher: bookPublisher, type: bookType};
        var bookString = JSON.stringify(book);

        ajaxCall('', ajaxType, bookString).done(function (result) {
            getBooks();
        });


    });

    function ajaxCall(bookId, type, data) {
        return $.ajax({
            url: "http://localhost:8282/books/" + bookId,
            type: type,
            dataType: "json",
            data: data,
            contentType: "application/json"
        })
    }

//------------- Zadanie 6 -----------------------------------------------------------

    tBody.on('click', '.dltBtn', function () {
        var tr = $(this).parent().parent();
        var trHidden = tr.next();

        var bookId = tr.find('.bookId').text();
        var ajaxType = tr.find('button').data("method");

        ajaxCall(bookId, ajaxType, '').done(function () {
            tr.remove();
            trHidden.remove();
            console.log('Usunięto rekord');
        })
    })

});