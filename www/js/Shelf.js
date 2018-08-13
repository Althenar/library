class Shelf extends React.Component {
    static get BASE_URL() {
        return "http://library.zxcv.pl/api/";
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.shelfId,
            bookcaseId: -1,
            row: -1,
            col: -1,
            newIsbn: '',
            addBook: false,
            books: []
        };
    }

    getDataFromDB = () => {
        var _this = this;
        var shelfData;

        fetch(Bookcase.BASE_URL + 'shelf/' + this.state.id).then(function(response) { return response.json()})
        .then(function(shelfData) {
            _this.setState({
                bookcaseId: shelfData[0].id_bookcase,
                row: shelfData[0].row,
                col: shelfData[0].col,
            });
        }).then(function() {
            fetch(Bookcase.BASE_URL + 'shelf/' + _this.state.id +'/books').
                then(function(response) {
                return response.json();
            }).then(function(bookData) {
                _this.setState({
                    books: bookData
                });
            })
        });
    }

    getDataFromProps = () => {
        this.setState({
            bookcaseId: this.props.shelfData.bookcaseId,
            row: this.props.shelfData.row,
            col: this.props.shelfData.col
        })
    }

    componentDidMount() {
        if (parseInt(this.state.id) >= 0) {
            this.getDataFromDB();
        } else {
            this.getDataFromProps();
        }
    }

    handleUnmount = (id) => {
        var index = this.state.books.findIndex(b => b.id == id);
        if (index>=0) {
            this.state.books.splice(index, 1);
            this.forceUpdate();
        }
    }

    prepareBooks() {
        var books = [];

        for (let book of this.state.books) {
            books.push(
                <Book book={book} key={'b' + book.id} deleteBook={this.handleUnmount} editBookMode={this.props.editBookMode} refreshBook={this.refreshBook}/>
            )
        }
        if (this.state.addBook) {
            var newBook = {
                id: -1,
                isbn: this.state.newIsbn,
                id_shelf: this.state.id
            };
            books.push(
                <Book book={newBook} key='-1' refreshBook={this.refreshBook} />
            )
            this.state.addBook = false;
            this.state.newIsbn = '';
        }
        return books;
    }

    addBook = () => {
        this.setState({ addBook: true});
    }

    refreshBook = (bookId) => {
        let _this = this;
        fetch(Shelf.BASE_URL + 'book/' + bookId)
        .then(function(response) {
            return response.json();
        }).then(function(response) {
            let newBook = response[0];
            var index = _this.state.books.findIndex(b => b.id == newBook.id);
            if (index < 0) {
                _this.state.books.push(newBook);
            } else {
                _this.state.books[index] = newBook;
            }
            _this.forceUpdate();
        })
    }

    addShelf = () => {
        let _this = this;

        let data = new URLSearchParams();

        data.append('row', this.state.row);
        data.append('col', this.state.col);
        data.append('id_bookcase', this.state.bookcaseId);
        let fetchData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }

        fetch(Shelf.BASE_URL + 'shelf', fetchData)
        .then(function(response) {
            return response.json();
        }).then(function(response) {
            _this.state.id = response.id;
            _this.props.refreshShelf(_this.state.id);
        })
    }

    deleteShelf = () => {
        let _this = this;

        let fetchData = {
            method: 'DELETE',
            headers: new Headers()
        }

        fetch(Shelf.BASE_URL + 'shelf/' + this.state.id, fetchData)
        .then(function() {
            _this.props.deleteShelf(_this.state.id);
        })
    }

    handleNewIsbnChange = (e) => {
        this.setState({newIsbn: e.target.value});
    }

    bookKeyUp = (e) => {
            if (e.keyCode==13) {
                this.addBook();
            }
    }

    render() {
        var books = this.prepareBooks();
        return (
            <section className={this.props.potential ? "potential" : "shelf"} id={this.state.id}>
                {this.props.editShelfMode
                    && !this.props.potential
                    && ( this.state.row != 1 || this.state.col != 1 )
                    && books.length==0
                    && this.props.deleteEnabled
                    &&
                    <span className='bookButton'>
                        <button className='delShelf' onClick={this.deleteShelf}> - </button>
                    </span>
                }
                {books}
                {this.props.editBookMode &&
                    <span className='bookButton' onKeyUp={this.bookKeyUp}><input type='text' value={this.state.newIsbn} onChange={this.handleNewIsbnChange} /></span>
                }
                {this.props.editShelfMode && this.props.potential
                    && this.props.addEnabled
                    &&
                    <span className='bookButton'>
                        <button className='addShelf' onClick={this.addShelf}> + </button>
                    </span>
                }
            </section>
        );
    }
}
