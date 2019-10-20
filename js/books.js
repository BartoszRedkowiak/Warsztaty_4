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
            $('<td>').text(book.id).attr('id', 'bookId_' + book.id).appendTo(tr);
            $('<td>').text(book.title).attr('id', 'title_' + book.id).addClass('bookTitle')
                .attr('data-method', 'GET').appendTo(tr);
            $('<td>').text(book.author).attr('id', 'bookAuthor_' + book.id).appendTo(tr);
            $('<td><button class="btn btn-danger" data-method="DELETE">Delete</button></td>').appendTo(tr);

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
//TODO dokończyć + dodać metodę ajaxCall (slack)

    $('#submitBtn').on('click', function (event) {
        event.preventDefault();

        $.ajax({
            url: "http://localhost:8282/books/",
            type: $(this).data('method'),
            dataType: "json",
            contentType: "application/json"
        }).done(function (result) {
            getBooks();
        });


    })


});