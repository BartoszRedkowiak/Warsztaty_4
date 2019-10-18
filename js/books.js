$(function () {

    var tBody = $('#tBody');

    $.ajax ({
        url: "http://localhost:8282/books/",
        type: "GET",
        dataType: "json",
        contentType: "application/json"
    }).done(function(result) {
        for (var i = 0 ; i < result.length ; i++){
            //Odbieram pierwszą książkę
            var book = result[i];
            //Tworzę nowy wiersz
            var tr = $('<tr>').addClass('bookRecord');
            //Tworzę kolumny
            $('<td>').text(book.id).attr('id', 'bookId_' + book.id ).appendTo(tr);
            $('<td>').text(book.title).attr('id', 'title_' + book.id )
                .attr('data-method', 'GET').appendTo(tr);
            $('<td>').text(book.author).attr('id', 'bookAuthor_' + book.id ).appendTo(tr);
            $('<td><button class="removeBtn" data-method="DELETE">Delete</button></td>').appendTo(tr);

            //Podpinam wiersz pod tabelę na stronie
            tr.appendTo(tBody);
            // Tworze wiersz ukryty który będzie rozwijany po kliknięciu na tytuł książki
            var hiddenTr = $("<tr>").hide();
            $("<td colspan = 4>").appendTo(hiddenTr);
            hiddenTr.appendTo(tBody);
        }
    });
});