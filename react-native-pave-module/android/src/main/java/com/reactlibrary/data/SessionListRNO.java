package com.reactlibrary.data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;
import java.util.List;

public class SessionListRNO {
    @SerializedName("value")
    @Expose
    List<SessionRNO> value = new ArrayList<>();

    public List<SessionRNO> getValue() {
        return value;
    }

    public void setValue(List<SessionRNO> value) {
        this.value = value;
    }
}
