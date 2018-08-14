package althsoft.pl.homelib.adapter;

import althsoft.pl.homelib.model.Book;
import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by R on 02.07.2017.
 */
public class BookAdapter extends ArrayAdapter<Book> {
    private final Context context;
    private final List<Book> books;
    private final List<Book> allBooks;
    private final List<Book> suggestions;
    private final int layoutResourceId;

    public BookAdapter(Context context, int resource, List<Book> books) {
        super(context, resource, books);
        this.context = context;
        this.layoutResourceId = resource;
        this.books = new ArrayList<Book>(books);
        this.allBooks = new ArrayList<Book>(books);
        this.suggestions = new ArrayList<Book>();
    }

    @Override
    public int getCount() {
        return books.size();
    }

    @Override
    public long getItemId(int position) {
        return books.get(position).getId();
    }

    @Override
    public Book getItem(int position) {
        return books.get(position);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup container) {
        if (convertView == null) {
            convertView = ((Activity) context).getLayoutInflater().inflate(layoutResourceId, container, false);
        }

        ((TextView) convertView.findViewById(android.R.id.text1)).setText(getItem(position).getName());

        return convertView;
    }

    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            public String convertResultToString(Object resultValue) {
                return ((Book) resultValue).name;
            }

            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                if (constraint != null) {
                    suggestions.clear();
                    for (Book book : allBooks) {
                        if (book.name != null && book.name.toLowerCase().contains(constraint.toString().toLowerCase())) {
                            suggestions.add(book);
                        }
                    }
                    FilterResults filterResults = new FilterResults();
                    filterResults.values = suggestions;
                    filterResults.count = suggestions.size();
                    return filterResults;
                } else {
                    return new FilterResults();
                }
            }

            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                books.clear();
                if (results != null && results.count > 0) {
                    // avoids unchecked cast warning when using mDepartments.addAll((ArrayList<Department>) results.values);
                    List<?> result = (List<?>) results.values;
                    for (Object object : result) {
                        if (object instanceof Book) {
                            books.add((Book) object);
                        }
                    }
                } else if (constraint == null) {
                    // no filter, add entire original list back in
                    books.addAll(allBooks);
                }
                notifyDataSetChanged();
            }
        };
    }
}
