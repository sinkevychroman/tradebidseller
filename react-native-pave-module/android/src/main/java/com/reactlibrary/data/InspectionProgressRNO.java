package com.reactlibrary.data;

import android.util.Log;

import com.discoveryloft.pavesdk.domain.entity.Cage;
import com.discoveryloft.pavesdk.service.getInspectionProgress.GetInspectionProgressResponse;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.google.gson.internal.LinkedTreeMap;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class InspectionProgressRNO {

    @SerializedName("inspectionID")
    @Expose
    private String inspectionID;
    @SerializedName("sessionID")
    @Expose
    private String sessionID;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("ttw")
    @Expose
    private Integer ttw;
    @SerializedName("isReported")
    @Expose
    private Boolean isReported;
    @SerializedName("photos")
    @Expose
    private PhotosRNO photos;
    @SerializedName("passQC")
    @Expose
    private Boolean passQC;

    @SerializedName("userPhotos")
    @Expose
    private List<LinkedTreeMap<String, Object>> userPhotos;

    public String getInspectionID() {
        return inspectionID;
    }

    public void setInspectionID(String inspectionID) {
        this.inspectionID = inspectionID;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getTtw() {
        return ttw;
    }

    public void setTtw(Integer ttw) {
        this.ttw = ttw;
    }

    public Boolean getIsReported() {
        return isReported;
    }

    public void setIsReported(Boolean isReported) {
        this.isReported = isReported;
    }

    public PhotosRNO getPhotos() {
        return photos;
    }

    public void setPhotos(PhotosRNO photos) {
        this.photos = photos;
    }

    public Boolean getPassQC() {
        return passQC;
    }

    public void setPassQC(Boolean passQC) {
        this.passQC = passQC;
    }

    public static String parseFirstMessageMapToString(Map<String, String> messageMap) {

        for (Map.Entry<String, String> entry : messageMap.entrySet()) {
            String key = entry.getKey();
            String value = entry.getValue();
            Log.d(key, value.toString());
            return value;
        }

        return "";
    }

    public static InspectionProgressRNO parseResponseToDataRNO(GetInspectionProgressResponse response) {
        if (response == null)
            return new InspectionProgressRNO();

        InspectionProgressRNO inspectionProgressRNO = new InspectionProgressRNO();
        inspectionProgressRNO.setInspectionID(response.getInspectionID());
        inspectionProgressRNO.setIsReported(response.getIsReported());
        inspectionProgressRNO.setSessionID(response.getSessionID());
        inspectionProgressRNO.setStatus(response.getStatus());
        inspectionProgressRNO.setPassQC(response.isPassQC());

        InspectionProgressRNO.PhotosRNO photos = new InspectionProgressRNO.PhotosRNO();

        if (response.getPhotos() != null) {
            // Create QC photos information list
            List<InspectionProgressRNO.PhotoCodeInformation> qcList = new ArrayList<>();
            if (response.getPhotos().getQc() != null && !response.getPhotos().getQc().isEmpty()) {
                for (int i = 0; i < response.getPhotos().getQc().size(); i++) {
                    com.discoveryloft.pavesdk.service.getInspectionProgress.entity.PhotoCodeInformation item = response
                            .getPhotos().getQc().get(i);

                    String message = parseFirstMessageMapToString(item.getMessage());

                    qcList.add(new InspectionProgressRNO.PhotoCodeInformation(
                            Cage.fromValue(Integer.parseInt(item.getPhotoCode())).getName(), item.getPhotoCode(),
                            item.getStatus(), message, item.getRejectedCount()));
                }
            }
            photos.setQc(qcList);

            // Create Finished photos information list
            List<InspectionProgressRNO.PhotoCodeInformation> finishedList = new ArrayList<>();
            if (response.getPhotos().getFinished() != null && !response.getPhotos().getFinished().isEmpty()) {
                for (int i = 0; i < response.getPhotos().getFinished().size(); i++) {
                    com.discoveryloft.pavesdk.service.getInspectionProgress.entity.FinishedInformation item = response
                            .getPhotos().getFinished().get(i);

                    String message = item.getMessage().toString();

                    finishedList.add(new InspectionProgressRNO.PhotoCodeInformation(
                            Cage.fromValue(Integer.parseInt(item.getPhotoCode())).getName(), item.getPhotoCode(),
                            item.getStatus(), message, item.getRejectedCount()));
                }
            }
            photos.setFinished(finishedList);

            // Create Inspect photos information list
            List<InspectionProgressRNO.PhotoCodeInformation> inspectList = new ArrayList<>();
            if (response.getPhotos().getInspect() != null && !response.getPhotos().getInspect().isEmpty()) {
                for (int i = 0; i < response.getPhotos().getInspect().size(); i++) {
                    com.discoveryloft.pavesdk.service.getInspectionProgress.entity.PhotoCodeInformation item = response
                            .getPhotos().getInspect().get(i);

                    String message = parseFirstMessageMapToString(item.getMessage());

                    inspectList.add(new InspectionProgressRNO.PhotoCodeInformation(
                            Cage.fromValue(Integer.parseInt(item.getPhotoCode())).getName(), item.getPhotoCode(),
                            item.getStatus(), message, item.getRejectedCount()));
                }
            }
            photos.setInspect(inspectList);

            // Create Rejected photos information list
            List<InspectionProgressRNO.PhotoCodeInformation> rejectedList = new ArrayList<>();
            if (response.getPhotos().getRejected() != null && !response.getPhotos().getRejected().isEmpty()) {
                for (int i = 0; i < response.getPhotos().getRejected().size(); i++) {
                    com.discoveryloft.pavesdk.service.getInspectionProgress.entity.PhotoCodeInformation item = response
                            .getPhotos().getRejected().get(i);

                    String message = parseFirstMessageMapToString(item.getMessage());

                    rejectedList.add(new InspectionProgressRNO.PhotoCodeInformation(
                            Cage.fromValue(Integer.parseInt(item.getPhotoCode())).getName(), item.getPhotoCode(),
                            item.getStatus(), message, item.getRejectedCount()));
                }
            }
            photos.setRejected(rejectedList);

            // Create Missing photos information list
            List<String> missingList = new ArrayList<>();

            for (int i = 0; i < response.getPhotos().getMissing().size(); i++) {
                String photoCodeString = response.getPhotos().getMissing().get(i);
                try {
                    int photoCode = Integer.parseInt(photoCodeString);
                    // String cageName = String.valueOf(Cage.fromValue(photoCode));
                    // cageName = cageName.replace("_VIEW", "");
                    String cageName = Cage.fromValue(photoCode).getName();
                    missingList.add(cageName);
                } catch (Exception e) {
                    missingList.add(photoCodeString);
                    e.printStackTrace();
                }

            }



            photos.setMissing(missingList);
            inspectionProgressRNO.setPhotos(photos);

            List<LinkedTreeMap<String, Object>>  userPhotos = new ArrayList<>();

            if(!response.getUserPhotos().isEmpty() && response.getUserPhotos().size() > 0){
                for(int i = 0; i < response.getUserPhotos().size(); i++){
                    LinkedTreeMap<String, Object> casted = (LinkedTreeMap<String, Object>) response.getUserPhotos().get(i);
                    userPhotos.add(casted);
                }
            }
            inspectionProgressRNO.userPhotos = userPhotos;




        }

        return inspectionProgressRNO;
    }

    public static class PhotosRNO {

        @SerializedName("missing")
        @Expose
        private List<String> missing = null;
        @SerializedName("qc")
        @Expose
        private List<PhotoCodeInformation> qc = null;
        @SerializedName("finished")
        @Expose
        private List<PhotoCodeInformation> finished = null;
        @SerializedName("rejected")
        @Expose
        private List<PhotoCodeInformation> rejected = null;
        @SerializedName("inspect")
        @Expose
        private List<PhotoCodeInformation> inspect = null;

        public List<String> getMissing() {
            return missing;
        }

        public void setMissing(List<String> missing) {
            this.missing = missing;
        }

        public List<PhotoCodeInformation> getQc() {
            return qc;
        }

        public void setQc(List<PhotoCodeInformation> qc) {
            this.qc = qc;
        }

        public List<PhotoCodeInformation> getFinished() {
            return finished;
        }

        public void setFinished(List<PhotoCodeInformation> finished) {
            this.finished = finished;
        }

        public List<PhotoCodeInformation> getRejected() {
            return rejected;
        }

        public void setRejected(List<PhotoCodeInformation> rejected) {
            this.rejected = rejected;
        }

        public List<PhotoCodeInformation> getInspect() {
            return inspect;
        }

        public void setInspect(List<PhotoCodeInformation> inspect) {
            this.inspect = inspect;
        }

    }

    public static class PhotoCodeInformation {
        @SerializedName("nameCage")
        @Expose
        private String nameCage;
        @SerializedName("photoCode")
        @Expose
        private String photoCode;
        @SerializedName("status")
        @Expose
        private String status;
        @SerializedName("message")
        @Expose
        private String message;
        @SerializedName("rejectedCount")
        @Expose
        private Integer rejectedCount;

        public PhotoCodeInformation(String nameCage, String photoCode, String status, String message,
                                    Integer rejectedCount) {
            this.nameCage = nameCage;
            this.photoCode = photoCode;
            this.status = status;
            this.message = message;
            this.rejectedCount = rejectedCount;
        }

        public String getNameCage() {
            return nameCage;
        }

        public void setNameCage(String nameCage) {
            this.nameCage = nameCage;
        }

        public String getPhotoCode() {
            return photoCode;
        }

        public void setPhotoCode(String photoCode) {
            this.photoCode = photoCode;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Integer getRejectedCount() {
            return rejectedCount;
        }

        public void setRejectedCount(Integer rejectedCount) {
            this.rejectedCount = rejectedCount;
        }

    }

}
