
package althsoft.pl.homelib.model.external;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Attributes__ {

    @SerializedName("type")
    @Expose
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
