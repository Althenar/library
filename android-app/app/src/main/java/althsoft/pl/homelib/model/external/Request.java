
package althsoft.pl.homelib.model.external;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Request {

    @SerializedName("authentication")
    @Expose
    private String authentication;
    @SerializedName("key")
    @Expose
    private List<Object> key = null;
    @SerializedName("method")
    @Expose
    private List<Object> method = null;

    public String getAuthentication() {
        return authentication;
    }

    public void setAuthentication(String authentication) {
        this.authentication = authentication;
    }

    public List<Object> getKey() {
        return key;
    }

    public void setKey(List<Object> key) {
        this.key = key;
    }

    public List<Object> getMethod() {
        return method;
    }

    public void setMethod(List<Object> method) {
        this.method = method;
    }

}
