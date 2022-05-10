package com.reactlibrary.data;


import com.discoveryloft.pavesdk.domain.entity.Cage;
import com.discoveryloft.pavesdk.service.getInspectionDetails.GetInspectionDetailsResponse;
import com.discoveryloft.pavesdk.service.getInspectionDetails.entity.CageElement;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

public class InspectionDetailRNO {
    @SerializedName("inspectionID")
    @Expose
    private String inspectionID;
    @SerializedName("sessionID")
    @Expose
    private String sessionID;
    @SerializedName("status")
    @Expose
    private String status;
    @SerializedName("cages")
    @Expose
    private ArrayList<Cage> cages;
    @SerializedName("vinDecode")
    @Expose
    private boolean vinDecode = false;
    @SerializedName("cageDetected")
    @Expose
    private boolean cageDetected = false;


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

    public ArrayList<Cage> getCages() {
        return cages;
    }

    public void setCages(ArrayList<Cage> cages) {
        this.cages = cages;
    }

    public boolean isVinDecode() {
        return vinDecode;
    }

    public void setVinDecode(boolean vinDecode) {
        this.vinDecode = vinDecode;
    }

    public boolean isCageDetected() {
        return cageDetected;
    }

    public void setCageDetected(boolean cageDetected) {
        this.cageDetected = cageDetected;
    }

    public static InspectionDetailRNO parseResponseToDataRNO(GetInspectionDetailsResponse response){
        InspectionDetailRNO inspectionDetailRNO = new InspectionDetailRNO();

        ArrayList<InspectionDetailRNO.Cage> cages = new ArrayList<InspectionDetailRNO.Cage>();
        inspectionDetailRNO.setCages(cages);
        inspectionDetailRNO.setStatus(response.getStatus());
        inspectionDetailRNO.setInspectionID(response.getInspectionID());
        inspectionDetailRNO.setSessionID(response.getSessionID());
//        inspectionDetailRNO.setVinDecode(response.getVinDecode());


        if(response.getVehicle() == null || response.getVehicle().getVin() == null ) return inspectionDetailRNO;

        if(!response.getVehicle().getVin().trim().isEmpty()){
            inspectionDetailRNO.setCageDetected(true);
        } else if (response.getVinDecode()){
            inspectionDetailRNO.setCageDetected(true);
        } else {
            return inspectionDetailRNO;
        }

        CageElement cage1 = response.getCages().get_01();
        cages.add(new InspectionDetailRNO.Cage(com.discoveryloft.pavesdk.domain.entity.Cage.LEFT_VIEW.getName(),
                cage1.getPhoto().getUrl(),
                cage1.getLabel().getUrl(),
                cage1.getOutline().getUrl(),
                cage1.getCage().getUrl()));
        CageElement cage2 = response.getCages().get_02();
        cages.add(new InspectionDetailRNO.Cage(com.discoveryloft.pavesdk.domain.entity.Cage.FRONT_VIEW.getName(),
                cage2.getPhoto().getUrl(),
                cage2.getLabel().getUrl(),
                cage2.getOutline().getUrl(),
                cage2.getCage().getUrl()));
        CageElement cage3 = response.getCages().get_03();
        cages.add(new InspectionDetailRNO.Cage(com.discoveryloft.pavesdk.domain.entity.Cage.RIGHT_VIEW.getName(),
                cage3.getPhoto().getUrl(),
                cage3.getLabel().getUrl(),
                cage3.getOutline().getUrl(),
                cage3.getCage().getUrl()));
        CageElement cage4 = response.getCages().get_04();
        cages.add(new InspectionDetailRNO.Cage(com.discoveryloft.pavesdk.domain.entity.Cage.REAR_VIEW.getName(),
                cage4.getPhoto().getUrl(),
                cage4.getLabel().getUrl(),
                cage4.getOutline().getUrl(),
                cage4.getCage().getUrl()));

        inspectionDetailRNO.setCages(cages);

        return inspectionDetailRNO;
    }

    public static class Cage {
        @SerializedName("name")
        @Expose
        private String name;
        @SerializedName("photo")
        @Expose
        private String photo;
        @SerializedName("label")
        @Expose
        private String label;
        @SerializedName("outline")
        @Expose
        private String outline;
        @SerializedName("cage")
        @Expose
        private String cage;

        public Cage(String name, String photo, String label, String outline, String cage) {
            this.name = name;
            this.photo = photo;
            this.label = label;
            this.outline = outline;
            this.cage = cage;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getPhoto() {
            return photo;
        }

        public void setPhoto(String photo) {
            this.photo = photo;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public String getOutline() {
            return outline;
        }

        public void setOutline(String outline) {
            this.outline = outline;
        }

        public String getCage() {
            return cage;
        }

        public void setCage(String cage) {
            this.cage = cage;
        }
    }
}
