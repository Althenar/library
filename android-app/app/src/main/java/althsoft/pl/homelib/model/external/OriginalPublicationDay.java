
package althsoft.pl.homelib.model.external;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class OriginalPublicationDay {

    @SerializedName("@attributes")
    @Expose
    private Attributes_ attributes;

    public Attributes_ getAttributes() {
        return attributes;
    }

    public void setAttributes(Attributes_ attributes) {
        this.attributes = attributes;
    }

}
