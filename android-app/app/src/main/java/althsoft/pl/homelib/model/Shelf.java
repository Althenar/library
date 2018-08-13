package althsoft.pl.homelib.model;

/**
 * Created by R on 02.07.2017.
 */
public class Shelf {
    public int id;
    public int id_bookcase;
    public int row;
    public int col;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_bookcase() {
        return id_bookcase;
    }

    public void setId_bookcase(int id_bookcase) {
        this.id_bookcase = id_bookcase;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }
}
