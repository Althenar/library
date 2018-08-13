class Book extends React.Component {
    static get BASE_URL() {
        return "http://library.zxcv.pl/api/";
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.book.id,
            shelfId: props.book.id_shelf,
            isbn: props.book.isbn,
            author: props.book.author ? props.book.author : '',
            title: props.book.title ? props.book.title : '',
            editData: false
        };
    }

    remove = () => {
        let _this = this;

        let fetchData = {
            method: 'DELETE',
            headers: new Headers()
        }

        fetch(Book.BASE_URL + 'book/' + this.state.id, fetchData)
        .then(function() {
            _this.state.editData = false;
            _this.props.deleteBook(_this.state.id);
        })
    }

    update = () => {
        let _this = this;

        let data = new URLSearchParams();

        data.append('title', this.state.title);
        data.append('author', this.state.author);

        let fetchData = {
            method: 'PUT',
            body: data,
            headers: new Headers()
        }

        fetch(Book.BASE_URL + 'book/' + this.state.id, fetchData)
        .then(function() {
            _this.state.editData = false;
            _this.props.refreshBook(_this.state.id)
        })
    }

    updateWithExtData = (extData) => {
        this.state.title = extData.title;
        if (extData.author.name != undefined) {
            this.state.author = extData.author.name;
        } else {
            this.state.author = '';
        }
        this.state.editData = true;

        this.update();
    }

    addBook() {
        let _this = this;
        let data = new URLSearchParams();

        data.append('isbn', this.state.isbn);
        data.append('id_shelf', this.state.shelfId);

        let fetchData = {
            method: 'POST',
            body: data,
            headers: new Headers()
        }

        fetch(Book.BASE_URL + 'book', fetchData)
        .then (function(response) {
            return response.json();
        }).then(function(newBook) {
            _this.state.id = newBook.id;
            fetch(Book.BASE_URL + 'book/externalData/' + _this.state.isbn)
            .then(function(response){
                return response.json();
            }).then(function(extData) {
                if (extData.search['total-results']==0) {
                    _this.setState({
                        editData: true,
                        message: 'No results found'
                    });
                } else if (extData.search['total-results']>1) {
                    _this.setState({
                        editData: true,
                        message: 'Too many results'
                    });
                } else {
                    _this.updateWithExtData(extData.search.results.work.best_book);
                }
            })
        })
    }

    componentDidMount() {
        if (this.state.id == -1) {
            this.addBook();
        }
    }

    authorChange = (e) => {
        this.setState({
            author: e.target.value
        })
    }

    titleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    edit = () => {
        this.setState({
            editData: true
        })
    }

    cancelEdit = () => {
        this.setState({
            editData: false
        })
    }

    render() {
        var display;
        if (this.state.editData) {
            display = (
                <span>
                [{this.state.isbn}]&nbsp;
                    <span className='author'>
                        <input type='text' value={this.state.author} onChange={this.authorChange}/>
                    </span>
                    <span className='title'>
                        <input type='text' value={this.state.title} onChange={this.titleChange}/>
                    </span>
                    <span className='bookButton'>
                        <button onClick={this.update}>upd</button>
                        <button onClick={this.cancelEdit}>canc</button>
                    </span>
                </span>
            )
        } else display = (
            <span>
                [{this.state.isbn}] {this.state.author}: {this.state.title}
                {this.props.editBookMode &&
                    <span className='bookButton'>
                        <button onClick={this.edit}>edit</button>
                        <button onClick={this.remove}>del</button>
                    </span>
                }
            </span>
        );
        return (
            <li className="book" key={this.state.id}>
                {this.state.message}
                {display}
            </li>
        );
    };
}
