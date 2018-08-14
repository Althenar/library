class Bookcase extends React.Component {
    static get BASE_URL() {
        return "http://library.zxcv.pl/api/";
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.bookcaseId,
            name: '',
            shelves: [],
            editBookMode: false,
            editShelfMode: false,
            deleteNotAllowed: []
        };
    }

    componentDidMount() {
        var _this = this;
        fetch(Bookcase.BASE_URL + 'bookcase/' + this.state.id).then(function(response) {
            return response.json();
        }).then(function(bookcaseData) {
            _this.setState({ name: bookcaseData[0].name});
        }).then(function() {
            fetch(Bookcase.BASE_URL + 'bookcase/' + _this.state.id + '/shelves')
            .then(function(response) {
                return response.json();
            }).then(function(shelfData) {
                _this.setState({
                    shelves: shelfData
                });
            })
        });
    }

    sortShelves = (shelves) => {
        shelves.sort((a, b) => {
            if (parseInt(a.row) == parseInt(b.row)) {
                return (parseInt(a.col) - parseInt(b.col));
            } else {
                return (parseInt(b.row) - parseInt(a.row));
            }
        })
    }

    refreshShelf = (id) => {
        var _this = this;
        fetch(Bookcase.BASE_URL + 'shelf/' + id).then(function(response) {
            return response.json();
        }).then(function(shelfData) {
            _this.state.shelves.push(shelfData[0]);
            _this.sortShelves(_this.state.shelves);
            _this.forceUpdate();
        })
    }

    toggleBookEditMode = () => {
        this.setState({editBookMode: !this.state.editBookMode});
    }

    toggleShelfEditMode = () => {
        this.setState({editShelfMode: !this.state.editShelfMode});
    }

    handleUnmount = (id) => {
        var index = this.state.shelves.findIndex(s => s.id == id);
        if (index>=0) {
            this.state.shelves.splice(index, 1);
            this.forceUpdate();
        }
    }
    newCell = (row, col, potential=true, addEnabled=true) => {
        return {
            id: -1,
            row: row,
            col: col,
            bookcaseId: this.state.id,
            potential: potential,
            addEnabled: addEnabled
        }
    }

    createAddCells = (shelves) => {
        shelves.forEach(function (s) {
            var x = parseInt(s.col);
            var y = parseInt(s.row);
            if (!this.findShelf(y, x+1, shelves,true)) {
                shelves.push(this.newCell(y, x+1));
            }
            if (!this.findShelf(y+1, x, shelves,true)) {
                shelves.push(this.newCell(y+1, x));
            }
            if (!this.findShelf(y-1, x, shelves,true) && y-1>0) {
                shelves.push(this.newCell(y-1, x));
            }
            if (!this.findShelf(y, x-1, shelves,true) && x-1>0) {
                shelves.push(this.newCell(y, x-1));
            }
        }, this);
    }

    prepareShelves() {
        var shelves = [];
        var currRow = 999;
        var currCol = 0;
        var _this = this;
        var localShelves = this.state.shelves.slice(0);
        if (this.state.editShelfMode) {
            this.createAddCells(localShelves);
        }
        this.sortShelves(localShelves);
        for (let shelf of localShelves) {
            if (parseInt(shelf.row) < currRow) {
                if (currRow==999) {
                    currRow = parseInt(shelf.row) + 1;
                }
                currRow = currRow - 1;
                currCol = 0;
                shelves[currRow] = [];
            }
            if (parseInt(shelf.col) - currCol > 1) {
                for (let i = currCol+1; i<=parseInt(shelf.col)-1; i++) {
                    shelves[currRow].push(this.newCell(currRow, currCol++, true, false));
                }
            }
            shelves[currRow].push(shelf);
            currCol = parseInt(shelf.col)
        }

        var rows = [];

        for (let row of shelves) {
            if (row===undefined) continue;
            var cells = [];
            for (let cell of row) {
                var key = cell.id>0 ? cell.id : cell.row + '_' + cell.col;
                cells.push(<Shelf key={'s' + key} shelfData={cell} shelfId={cell.id} editBookMode={this.state.editBookMode} editShelfMode={this.state.editShelfMode} deleteShelf={this.handleUnmount} refreshShelf={this.refreshShelf} deleteEnabled={!this.state.deleteNotAllowed[cell.id]} addEnabled={cell.addEnabled} potential={cell.potential}/>)
            }
            rows.push(<div key={'r' + this.state.id + '_' + rows.length}>{cells}</div>)
        }
        return rows.reverse();
    }

    preparePotentialShelf = (row, col, addEnabled) => {
        let shelfData = {
            bookcaseId: this.state.id,
            row: row,
            col: col,
            addEnabled
        }
        let key = this.state.id + '_' + row + '_' + col;
        return (
            <div key={'r' + key}>
                <Shelf key={'s' + key} shelfData={shelfData} shelfId={-1} editBookMode={this.state.editBookMode} editShelfMode={this.state.editShelfMode} deleteShelf={this.handleUnmount} refreshShelf={this.refreshShelf} potential={true}/>
            </div>
        );
    }

    findShelf = (row, col, shelves = this.state.shelves, potential = false) => {
        return shelves.find(function(s) {
            return (s.row == row && s.col == col && (potential || !s.potential));
        })
    }

    traverse(node, traverseData, bookcase) {
        var children = 0;
        traverseData.visited[node.id] = true;
        traverseData.disc[node.id] = ++traverseData.time;
        traverseData.low[node.id] = traverseData.time;

        var x = parseInt(node.row);
        var y = parseInt(node.col);
        var adj = [];
        adj.push(bookcase.findShelf(x+1,y));
        adj.push(bookcase.findShelf(x,y+1));
        adj.push(bookcase.findShelf(x-1,y));
        adj.push(bookcase.findShelf(x,y-1));
        adj = adj.filter(Boolean);

        adj.forEach(function(v) {
            if (!traverseData.visited[v.id]) {
                children++;
                traverseData.parent[v.id] = node.id;
                bookcase.traverse(v, traverseData, bookcase);

                traverseData.low[node.id] = Math.min(traverseData.low[v.id], traverseData.low[node.id]);

                if (traverseData.parent[node.id] != null && traverseData.low[v.id] >= traverseData.disc[node.id]) {
                    traverseData.ap[node.id] = true;
                }
            } else if (v.id != traverseData.parent[node.id]) {
                traverseData.low[node.id] = Math.min(traverseData.low[v.id], traverseData.low[node.id]);
            }
        });
    };

    prepareTraverseData() {
        var root = this.findShelf(1,1);

        if (root) {
            var traverseData = {
                visited: [],
                disc: [],
                low: [],
                parent: [],
                ap: [],
                time: 0
            };

            this.state.shelves.forEach(function(s) {
                traverseData.parent[s.id] = null;
                traverseData.visited[s.id] = false;
                traverseData.ap[s.id] = false;
            });

            this.traverse(this.findShelf(1,1), traverseData, this);
            this.state.deleteNotAllowed = traverseData.ap;
        } else {
            this.state.deleteNotAllowed = [];
        }

    }

    render() {
        if (this.state.editShelfMode) {
            this.prepareTraverseData();
        }
        var rows = this.prepareShelves();
        return (
            <div>
                <h1>Bookcase #{this.state.id} {this.state.name}</h1>
                <div className="shelves">
                    <input type="button" disabled={this.state.editBookMode ? true : false } name="editShelves" value={this.state.editShelfMode ? 'Exit' : 'Edit shelves' } onClick={this.toggleShelfEditMode} />
                    <input type="button" disabled={this.state.editShelfMode ? true : false } name="editBooks" value={this.state.editBookMode ? 'Exit' : 'Edit books' } onClick={this.toggleBookEditMode} />
                    {rows}
                </div>
            </div>
        );
    }
}
