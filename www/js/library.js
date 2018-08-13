function createAddSection(parent, neighbour, vertical) {
    x = vertical ? parseInt(neighbour.attr('data-row'))+1 : parseInt(neighbour.attr('data-row'));
    y = vertical ? parseInt(neighbour.attr('data-column')) : parseInt(neighbour.attr('data-column'))+1;
    s = $("<section class='potential'></section>").attr({
        "data-row": x,
        "data-column": y
    });
    createAddButton(s, x, y);
    s.appendTo(parent);
}

function createAddButton(parent, x, y) {
    btn = $("<button class='addShelf'> + </button>").click(function() {
        addShelf(parent, $(this.closest(".bookcase")), x, y);
    }).appendTo(parent);
}

function createDelButton(parent, x, y) {
    btn = $("<button class='delShelf'> - </button>").click(function() {
        delShelf(parent, $(this.closest(".bookcase")), x, y);
    }).appendTo(parent);
}

function addShelf(shelf, bookcase, x, y) {
    shelf.removeClass().addClass("shelf").addClass("shelf-ajax").html("&nbsp;").children().remove();
    $.ajax({
        type: 'POST',
        url: './api/shelf',
        dataType: 'json',
        data: { row: x, col: y, id_bookcase: bookcase.attr('data-id')}
    }).done(function(resp, status) {
        // remove the add button and change classes
        shelf.removeClass("shelf-ajax").attr('data-id',resp.id).attr('id','s'+resp.id);
        redraw(bookcase);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
        shelf.removeClass().addClass("placeholder");
        redraw(bookcase);
    });
}

function delShelf(shelf, bookcase, x, y) {
    $.ajax({
        type: 'DELETE',
        url: './api/shelf/'+shelf.attr('data-id'),
    }).done(function(resp) {
        // remove the add button and change classes
        shelf.removeClass().removeAttr('data-id').removeAttr('id').addClass("placeholder").children().remove();
        shelf.text('');

        redraw(bookcase);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function redraw(bookcase) {
    clearEditFields();
    redrawAdds(bookcase);
    redrawDeletes(bookcase);
}

function redrawAdds(bookcase) {
    /*if (bookcase.find(".shelf").length == 0) {
        bookcase.append($("<div class='shelves'></div>"));
        createPlaceholderWithXY(bookcase,1,1);
    }*/
    bookcase.find(".shelf").each(function() {
        var x = parseInt($(this).attr('data-row'));
        var y = parseInt($(this).attr('data-column'));
        // if there are no rows above our shelf, then we need to generate a new one
        if ($(this).parent().prev().length==0) {
            topEditRow(bookcase).prependTo($(this).parent().parent());
            $(this).parents("div.edit").removeClass("edit");
        };

        // if there is an empty space above, add a button there
        s = bookcase.find("section[data-row="+(x+1)+"][data-column="+y+"]");
        if (s.length==0) {
            lastShelf = ($(this).parent().prev().children().last());
            currCol = parseInt(lastShelf.attr('data-column'))+1;
            while (currCol<y) {
                createPlaceholderWithXY($(this).parent().prev(),x+1,currCol++);
            }
            createAddSection($(this).parent().prev(), $(this), true);
        } else if (s.hasClass("placeholder")) {
            createButtonInPlaceholder(s, x+1, y);
        }

        // same thing, but below
        s = bookcase.find("section[data-row="+(x-1)+"][data-column="+y+"]");
        if (s.length==0) {
            lastShelf = ($(this).parent().next().children().last());
            currCol = parseInt(lastShelf.attr('data-column'))+1;
            while (currCol<=y) {
                createPlaceholderWithXY($(this).parent().next(),x-1,currCol++);
            }
            currCol--;
            createButtonInPlaceholder($(this).parent().next().children().last(), x-1, currCol);
        } else if (s.hasClass("placeholder")) {
            createButtonInPlaceholder(s, x-1, y);
        }

        // if the shelf is in the last column, or the columns to the right or left are empty
        // we need buttons there
        if ($(this).next().length==0) {
            createAddSection($(this).parent(),$(this),false);
        }

        if ($(this).next().hasClass("placeholder")) {
            createButtonInPlaceholder($(this).next(),x,y+1);
        }

        if ($(this).prev().hasClass("placeholder")) {
            createButtonInPlaceholder($(this).prev(), x, y-1);
        }

    })
}

function createPlaceholder(editDiv, neighbour) {
    x = parseInt(neighbour.attr('data-row'))+1;
    y = parseInt(neighbour.attr('data-column'));
    $("<section class='placeholder' />").attr({
        "data-row": x,
        "data-column": y
    }).appendTo(editDiv);
}

function createPlaceholderWithXY(editDiv, x, y) {
    $("<section class='placeholder' />").attr({
        "data-row": x,
        "data-column": y
    }).appendTo(editDiv);
}

function createButtonInPlaceholder(parent, x, y) {
    parent.removeClass("placeholder").addClass("potential").addClass("edit");
    createAddButton(parent, x, y);
}

function topEditRow(bookcase) {
    cols = bookcase.children(".shelves").first().children().first().children();
    // top button row
    editDiv = $("<div class='edit'></div>");
    cols.each(function() {
        if ($(this).hasClass("placeholder") || $(this).hasClass("potential")) {
            createPlaceholder(editDiv, $(this));
        } else {
            createAddSection(editDiv, $(this), true)
        }
    });

    return editDiv;
}

function editMode(event) {
    bookcase = $("#"+event.target.parentElement.id+".bookcase");
    redraw(bookcase);

    $("input[type='button']").attr('disabled','disabled');
    bookcase.find("input[name='edit']").prop("value", "Exit").off('click').click(disableEditMode).removeAttr('disabled');
}

function bookEditMode(event) {
    bookcase = $("#"+event.target.parentElement.id+".bookcase");
    drawBookButtons(bookcase);

    $("input[type='button']").attr('disabled','disabled');
    bookcase.find("input[name='editBooks']").prop("value", "Exit").off('click').click(disableBookEditMode).removeAttr('disabled');
}

function clearEditFields() {
    $(".shelf").each(function() {
        $(this).parent().removeClass("edit");
        $(this).prevAll(".potential").each(function() {
            $(this).removeClass("edit").removeClass("potential").addClass("placeholder").children().remove();
        });
    });
    $("div.shelves > div").each(function() {
        if ($(this).children(".shelf").length==0) {
            $(this).remove();
        }
    })
    $(".edit").remove();
    $(".potential").remove();
    $(".shelf ~ .placeholder").each(function() {
        if ($(this).nextAll(".shelf").length==0) {
            $(this).remove();
        }
    });
    $(".delShelf").remove();
}

function disableEditMode(event) {
    bookcase = $("#"+event.target.parentElement.id+".bookcase");
    clearEditFields();
    bookcase.find("input[name='edit']").prop("value", "Edit").off('click').click(editMode);
    $("input[type='button']").removeAttr('disabled');
}

function disableBookEditMode(event) {
    bookcase = $("#"+event.target.parentElement.id+".bookcase");
    clearBookButtons();
    bookcase.find("input[name='editBooks']").prop("value", "Edit books").off('click').click(bookEditMode);
    $("input[type='button']").removeAttr('disabled');
}

function traverse(node, traverseData) {
    var children = 0;
    traverseData.visited[node.attr('data-id')] = true;
    traverseData.disc[node.attr('data-id')] = ++traverseData.time;
    traverseData.low[node.attr('data-id')] = traverseData.time;

    var x = parseInt($(node).attr('data-row'));
    var y = parseInt($(node).attr('data-column'));
    var adj = $(".shelf[data-row="+(x+1)+"][data-column="+(y)+"]")
            .add($(".shelf[data-row="+(x)+"][data-column="+(y+1)+"]"))
            .add($(".shelf[data-row="+(x-1)+"][data-column="+(y)+"]"))
            .add($(".shelf[data-row="+(x)+"][data-column="+(y-1)+"]"));

    adj.each(function() {
        var v = $(this);
        if (!traverseData.visited[v.attr('data-id')]) {
            children++;
            traverseData.parent[v.attr('data-id')] = node.attr('data-id');
            traverse(v, traverseData);

            traverseData.low[node.attr('data-id')] = Math.min(traverseData.low[v.attr('data-id')], traverseData.low[node.attr('data-id')]);

            if (traverseData.parent[node.attr('data-id')] != null && traverseData.low[v.attr('data-id')] >= traverseData.disc[node.attr('data-id')]) {
                traverseData.ap[node.attr('data-id')] = true;
            }
        } else if (v.attr('data-id') != traverseData.parent[node.attr('data-id')]) {
            traverseData.low[node.attr('data-id')] = Math.min(traverseData.low[v.attr('data-id')], traverseData.low[node.attr('data-id')]);
        }
    })
}

function redrawDeletes() {
    var traverseData = {
        visited: new Array(),
        disc: new Array(),
        low: new Array(),
        parent: new Array(),
        ap: new Array(),
        time: 0
    };

    bookcase.find(".shelf").each(function() {
        traverseData.parent[$(this).attr('data-id')] = null;
        traverseData.visited[$(this).attr('data-id')] = false;
        traverseData.ap[$(this).attr('data-id')] = false;
    });

    traverse(bookcase.find(".shelf[data-row=1][data-column=1]"), traverseData);
    bookcase.find(".shelf").each(function() {
        var x = parseInt($(this).attr('data-row'));
        var y = parseInt($(this).attr('data-column'));
        if ((x!=1 || y!=1) && !traverseData.ap[$(this).attr('data-id')]) {
            createDelButton($(this), x, y);
        }
    });
}

function drawBookButtons(bookcase) {
    bookcase.find("li.book").each(function() {
        var id = $(this).attr('data-id');
        $("<span class='bookButton'><button>del</button></a></span>'").click(function() {
            setTimeout("delBook("+id+")",100);
        }).appendTo($(this));
    })
    bookcase.find(".shelf").each(function() {
        $("<span class='bookButton'><input type='text'></span>'").keyup(function(e) {
            if (e.keyCode==13) {
                addBook($(this));
            }
        }).appendTo($(this));
    })
}

function clearBookButtons() {
    $(".bookButton").remove();
}

function delBook(bookId) {
    $.ajax({
        type: 'DELETE',
        url: './api/book/'+bookId,
    }).done(function(resp) {
        // remove the add button and change classes
        $("li#b"+bookId).remove();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    });
}

function showManual(newBook) {
    $("<span class='author'><input type='text'></span><span class='title'><input type='text'></span>").appendTo(newBook);
    $("<span class='bookButton'><button>upd</button></a></span>'").click(function() {
        externalData = {
            title: newBook.find(".title > input[type='text']").val(),
            author: {
                name: newBook.find(".author > input[type='text']").val()
            }
        };
        newBook.find("input[type='text']").remove();
        newBook.find("input[type='text']").remove();
        updateBook(newBook, externalData);
    }).appendTo(newBook);
};

function addBook(span) {
    input=span.find("input[type='text']");
    shelf=span.parent();
    input.attr('disabled','disabled');
    isbn=input.val();
    newBook=$("<li class='book book-ajax'>["+input.val()+"]</li>");
    shelf.children('ul').append(newBook);

    $.ajax({
        type: 'POST',
        url: './api/book',
        dataType: 'json',
        data: { isbn: input.val(), id_shelf: shelf.attr('data-id')}
    }).done(function(resp) {
        // remove the add button and change classes
        newBook.removeClass("book-ajax").attr('data-id',resp.id).attr('id','b'+resp.id);
        $("<span class='bookButton'><button>del</button></a></span>'").click(function() {
            setTimeout("delBook("+resp.id+")",100);
        }).appendTo(newBook);
        input.val('');

        $.ajax({
            type: 'GET',
            url: './api/book/externalData/'+isbn,
            dataType: 'json'
        }).done(function(resp) {
            // remove the add button and change classes
            if (resp.search['total-results']==0) {
                showManual(newBook);
            } else if (resp.search['total-results']>1){
                alert("More than one book found");
            } else {
                updateBook(newBook, resp.search.results.work.best_book);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
        newBook.remove();
    }).always(function() {
        input.removeAttr('disabled').focus();
    });

}

function updateBook(book, externalData) {
    var title=externalData.title;
    if (externalData.author.name!=undefined) {
        var author=externalData.author.name;
    }

    $.ajax({
        type: 'PUT',
        url: './api/book/'+book.attr('data-id'),
        dataType: 'json',
        data: { author: author, title: title }
    }).done(function(resp) {
        // remove the add button and change classes
        if (author!=undefined) {
            book.text('['+resp.isbn+'] '+resp.author+': '+resp.title);
        } else {
            book.text('['+resp.isbn+'] '+resp.title);
        }
        $("<span class='bookButton'><button>del</button></a></span>'").click(function() {
            setTimeout("delBook("+resp.id+")",100);
        }).appendTo(book);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
    });
}
