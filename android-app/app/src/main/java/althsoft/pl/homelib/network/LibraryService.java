package althsoft.pl.homelib.network;

import althsoft.pl.homelib.model.Book;
import althsoft.pl.homelib.model.Shelf;
import althsoft.pl.homelib.model.external.ExternalData;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

import java.util.List;

/**
 * Created by R on 02.07.2017.
 */
public interface LibraryService {
    @GET("bookList")
    Call<List<Book>> bookList();

    @GET("book/{id}")
    Call<List<Book>> book(@Path("id") int id);

    @GET("shelf/{id}")
    Call<List<Shelf>> shelf(@Path("id") int id);

    @GET("book/externalData/{isbn}")
    Call<ExternalData> externalData(@Path("isbn") String isbn);
}
