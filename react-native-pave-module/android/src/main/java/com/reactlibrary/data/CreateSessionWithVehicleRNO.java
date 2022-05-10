package com.reactlibrary.data;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class CreateSessionWithVehicleRNO {
    @SerializedName("sessionKey")
    @Expose
    private String sessionKey;
    @SerializedName("inspectionID")
    @Expose
    private String inspectionID;
    @SerializedName("active")
    @Expose
    private String active;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("redirectURL")
    @Expose
    private String redirectURL;
    @SerializedName("theme")
    @Expose
    private String theme;
    @SerializedName("id")
    @Expose
    private String id;

    public String getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(String sessionKey) {
        this.sessionKey = sessionKey;
    }

    public String getInspectionID() {
        return inspectionID;
    }

    public void setInspectionID(String inspectionID) {
        this.inspectionID = inspectionID;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRedirectURL() {
        return redirectURL;
    }

    public void setRedirectURL(String redirectURL) {
        this.redirectURL = redirectURL;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "CreateSessionWithVehicleRNO{" +
                "sessionKey='" + sessionKey + '\'' +
                ", inspectionID='" + inspectionID + '\'' +
                ", active='" + active + '\'' +
                ", status='" + status + '\'' +
                ", redirectURL='" + redirectURL + '\'' +
                ", theme='" + theme + '\'' +
                ", id='" + id + '\'' +
                '}';
    }
}
