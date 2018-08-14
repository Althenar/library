package althsoft.pl.homelib;

import althsoft.pl.homelib.adapter.BookAdapter;
import althsoft.pl.homelib.model.Book;
import althsoft.pl.homelib.network.LibraryApiRESTHandler;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.View;
import android.widget.*;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends Activity {

    private void paintList(List<Book> bookList) {
        BookAdapter adapter = new BookAdapter(this, android.R.layout.simple_list_item_1, bookList);
        final AutoCompleteTextView textView = (AutoCompleteTextView) findViewById(R.id.bookSearch);
        textView.setAdapter(adapter);
        textView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(view.getContext(), BookDetailActivity.class);
                intent.putExtra("book", parent.getItemIdAtPosition(position));
                startActivity(intent);
            }
        });
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        setContentView(R.layout.activity_main);

        LibraryApiRESTHandler.getInstance().getBookList(new Callback<List<Book>>() {
            @Override
            public void onResponse(Call<List<Book>> call, Response<List<Book>> response) {
                if (response.isSuccessful()) {
                    paintList(response.body());
                } else {
                    Log.d("bookList", "ResponseCode: " + response.code());
                    paintList(new ArrayList<Book>());
                }
            }

            @Override
            public void onFailure(Call<List<Book>> call, Throwable t) {
                Log.d("bookList", t.getMessage());
                paintList(new ArrayList<Book>());
            }
        });
    }
}
