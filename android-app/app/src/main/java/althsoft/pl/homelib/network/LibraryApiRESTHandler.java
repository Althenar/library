package althsoft.pl.homelib.network;

import althsoft.pl.homelib.model.Book;
import althsoft.pl.homelib.model.Shelf;
import althsoft.pl.homelib.model.external.ExternalData;
import althsoft.pl.homelib.model.external.Request;
import android.util.Log;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.io.IOException;
import java.util.List;

import static android.webkit.ConsoleMessage.MessageLevel.LOG;

/**
 * Created by R on 02.07.2017.
 */
public class LibraryApiRESTHandler {
    private static final String BASE_URL = "http://library.zxcv.pl/api/";
    public static final LibraryApiRESTHandler instance = new LibraryApiRESTHandler();
    private LibraryService service;

    public static LibraryApiRESTHandler getInstance() {
        return instance;
    }

    private LibraryApiRESTHandler() {
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        service = retrofit.create(LibraryService.class);
    }

    public void getBookList(Callback<List<Book>> callback) {
        service.bookList().enqueue(callback);
    }

    public void getBook(int id, Callback<List<Book>> callback) {
        service.book(id).enqueue(callback);
    }

    public void getShelf(int id, final Callback<List<Shelf>> callback) {
        service.shelf(id).enqueue(callback);
    }

    public Shelf getShelfSync(int id) {
        Response<List<Shelf>> res = null;
        try {
            res = service.shelf(id).execute();
        } catch (IOException e) {
            Log.d("getShelfSync", e.getMessage());
        }
        if (res.isSuccessful()) {
            return res.body().get(0);
        } else {
            Log.d("getShelfSync", "Response code: " + res.code());
        }

        return new Shelf();
    }

    public void getExternalData(String isbn, final Callback<ExternalData> callback) {
        service.externalData(isbn).enqueue(callback);
    }


    public ExternalData getExternalDataSync(String isbn) {
        Response<ExternalData> res = null;
        try {
            res = service.externalData(isbn).execute();
        } catch (IOException e) {
            Log.d("getExternalDataSync", e.getMessage());
        }
        if (res.isSuccessful()) {
            return res.body();
        } else {
            Log.d("getExternalDataSync", "Response code: " + res.code());
        }

        return new ExternalData();
    }
}
