package althsoft.pl.homelib.model;

/**
 * Created by R on 02.07.2017.
 */
public class Book {
    public int id;
    public int id_shelf;
    public String isbn;
    public String author;
    public String title;
    public String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId_shelf() {
        return id_shelf;
    }

    public void setId_shelf(int id_shelf) {
        this.id_shelf = id_shelf;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
