package com.reactlibrary.data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SessionRNO {
    @SerializedName("id")
    @Expose
    String id = "id";

    @SerializedName("sessionKey")
    @Expose
    String sessionKey = "sessionKey";

    @SerializedName("inspectionId")
    @Expose
    String inspectionId = "inspectionId";

    @SerializedName("status")
    @Expose
    String status = "status";

    public SessionRNO(String id, String sessionKey, String inspectionId, String status) {
        this.id = id;
        this.sessionKey = sessionKey;
        this.inspectionId = inspectionId;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public String getInspectionId() {
        return inspectionId;
    }

    public void setInspectionId(String inspectionId) {
        this.inspectionId = inspectionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}

