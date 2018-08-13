
package althsoft.pl.homelib.model.external;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Search {

    @SerializedName("query")
    @Expose
    private List<Object> query = null;
    @SerializedName("results-start")
    @Expose
    private String resultsStart;
    @SerializedName("results-end")
    @Expose
    private String resultsEnd;
    @SerializedName("total-results")
    @Expose
    private String totalResults;
    @SerializedName("source")
    @Expose
    private String source;
    @SerializedName("query-time-seconds")
    @Expose
    private String queryTimeSeconds;
    @SerializedName("results")
    @Expose
    private Results results;

    public List<Object> getQuery() {
        return query;
    }

    public void setQuery(List<Object> query) {
        this.query = query;
    }

    public String getResultsStart() {
        return resultsStart;
    }

    public void setResultsStart(String resultsStart) {
        this.resultsStart = resultsStart;
    }

    public String getResultsEnd() {
        return resultsEnd;
    }

    public void setResultsEnd(String resultsEnd) {
        this.resultsEnd = resultsEnd;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(String totalResults) {
        this.totalResults = totalResults;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getQueryTimeSeconds() {
        return queryTimeSeconds;
    }

    public void setQueryTimeSeconds(String queryTimeSeconds) {
        this.queryTimeSeconds = queryTimeSeconds;
    }

    public Results getResults() {
        return results;
    }

    public void setResults(Results results) {
        this.results = results;
    }

}
