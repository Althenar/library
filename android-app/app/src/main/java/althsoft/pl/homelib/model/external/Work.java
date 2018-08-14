
package althsoft.pl.homelib.model.external;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Work {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("books_count")
    @Expose
    private String booksCount;
    @SerializedName("ratings_count")
    @Expose
    private String ratingsCount;
    @SerializedName("text_reviews_count")
    @Expose
    private String textReviewsCount;
/*    @SerializedName("original_publication_year")
    @Expose
    private String originalPublicationYear;
    @SerializedName("original_publication_month")
    @Expose
    private OriginalPublicationMonth originalPublicationMonth;
    @SerializedName("original_publication_day")*/
    @Expose
    private OriginalPublicationDay originalPublicationDay;
    @SerializedName("average_rating")
    @Expose
    private String averageRating;
    @SerializedName("best_book")
    @Expose
    private BestBook bestBook;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBooksCount() {
        return booksCount;
    }

    public void setBooksCount(String booksCount) {
        this.booksCount = booksCount;
    }

    public String getRatingsCount() {
        return ratingsCount;
    }

    public void setRatingsCount(String ratingsCount) {
        this.ratingsCount = ratingsCount;
    }

    public String getTextReviewsCount() {
        return textReviewsCount;
    }

    public void setTextReviewsCount(String textReviewsCount) {
        this.textReviewsCount = textReviewsCount;
    }

/*    public String getOriginalPublicationYear() {
        return originalPublicationYear;
    }

    public void setOriginalPublicationYear(String originalPublicationYear) {
        this.originalPublicationYear = originalPublicationYear;
    }*

    public OriginalPublicationMonth getOriginalPublicationMonth() {
        return originalPublicationMonth;
    }

    public void setOriginalPublicationMonth(OriginalPublicationMonth originalPublicationMonth) {
        this.originalPublicationMonth = originalPublicationMonth;
    }

    public OriginalPublicationDay getOriginalPublicationDay() {
        return originalPublicationDay;
    }

    public void setOriginalPublicationDay(OriginalPublicationDay originalPublicationDay) {
        this.originalPublicationDay = originalPublicationDay;
    }*/

    public String getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(String averageRating) {
        this.averageRating = averageRating;
    }

    public BestBook getBestBook() {
        return bestBook;
    }

    public void setBestBook(BestBook bestBook) {
        this.bestBook = bestBook;
    }

}
