package althsoft.pl.homelib;

import althsoft.pl.homelib.model.Book;
import althsoft.pl.homelib.model.Shelf;
import althsoft.pl.homelib.model.external.ExternalData;
import althsoft.pl.homelib.network.LibraryApiRESTHandler;
import android.content.Context;
import android.os.Bundle;
import android.app.Activity;
import android.text.Html;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import com.squareup.picasso.Picasso;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.util.List;

public class BookDetailActivity extends Activity {
    private Context context = this;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_detail);
        getActionBar().setDisplayHomeAsUpEnabled(true);
        long bookId = getIntent().getLongExtra("book", -1);

        if (bookId > 0) {
            LibraryApiRESTHandler.getInstance().getBook((int) bookId, new Callback<List<Book>>() {
                @Override
                public void onResponse(Call<List<Book>> call, Response<List<Book>> response) {
                    TextView basicDataView = (TextView) findViewById(R.id.basicData);
                    if (response.isSuccessful()) {
                        Book b = response.body().get(0);
                        Shelf s = null;
                        if (b.getId_shelf() > 0) {
                            s = LibraryApiRESTHandler.getInstance().getShelfSync(b.getId_shelf());
                        }
                        basicDataView.setText(Html.fromHtml(getResources().getString(R.string.book_basic_data, b.getAuthor(), b.getTitle(), b.getIsbn(), s != null ? s.getRow() : -1, s != null ? s.getCol() : -1)));

                        LibraryApiRESTHandler.getInstance().getExternalData(b.getIsbn(), new Callback<ExternalData>() {
                            @Override
                            public void onResponse(Call<ExternalData> call, Response<ExternalData> response) {
                                if (response.isSuccessful()) {
                                    ImageView thumbnail = (ImageView) findViewById(R.id.bookImage);
                                    Picasso.with(context)
                                            .load(response.body().getSearch().getResults().getWork().getBestBook().getImageUrl())
                                            .placeholder(R.drawable.ic_stop)
                                            .into(thumbnail);
                                } else {
                                    Log.d("getBook", "Response code: " + response.code());
                                }
                            }

                            @Override
                            public void onFailure(Call<ExternalData> call, Throwable t) {
                                Log.d("getBook", t.getMessage());
                            }
                        });
                    } else {
                        Log.d("getBook", "Response code: " + response.code());
                        basicDataView.setText("ERROR getting book data from library");
                    }
                }

                @Override
                public void onFailure(Call<List<Book>> call, Throwable t) {
                    TextView basicDataView = (TextView) findViewById(R.id.basicData);
                    basicDataView.setText("ERROR getting book data from library");
                }
            });
        }
    }

}
