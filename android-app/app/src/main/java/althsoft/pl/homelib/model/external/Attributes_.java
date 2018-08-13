
package althsoft.pl.homelib.model.external;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Attributes_ {

    @SerializedName("type")
    @Expose
    private String type;
    @SerializedName("nil")
    @Expose
    private String nil;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNil() {
        return nil;
    }

    public void setNil(String nil) {
        this.nil = nil;
    }

}
