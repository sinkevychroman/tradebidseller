package com.reactlibrary.data;

import com.discoveryloft.pavesdk.domain.entity.Cage;
import com.discoveryloft.pavesdk.service.getReportDamage.GetReportDamageResponse;
import com.discoveryloft.pavesdk.service.getReportDamage.entity.PavedExtColor;
import com.discoveryloft.pavesdk.service.getReportDamage.entity.PavedIntColor;
import com.discoveryloft.pavesdk.service.getReportDamage.entity.PavedTrim;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.google.gson.internal.LinkedTreeMap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ReportDamageRNO {

    @SerializedName("sessionKey")
    @Expose
    private String sessionKey;
    @SerializedName("inspectionId")
    @Expose
    private String inspectionId;
    @SerializedName("license")
    @Expose
    private String license;
    @SerializedName("response")
    @Expose
    private Response response;
    @SerializedName("photoStatus")
    @Expose
    private List<PhotoStatus> photoStatus = null;
    @SerializedName("vehicle")
    @Expose
    private Vehicle vehicle;
    @SerializedName("vehicleThumbnailUrl")
    @Expose
    private String vehicleThumbnailUrl;
    @SerializedName("damageAreas")
    @Expose
    private List<DamageArea> damageAreas = null;

    @SerializedName("sellerAnnouncements")
    @Expose
    private HashMap<String, Object> sellerAnnouncements;

    @SerializedName("sellerDisclosures")
    @Expose
    private LinkedTreeMap<String, Object> sellerDisclosures;

    @SerializedName("grading")
    @Expose
    private LinkedTreeMap<String, Object> grading;

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

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public List<PhotoStatus> getPhotoStatus() {
        return photoStatus;
    }

    public void setPhotoStatus(List<PhotoStatus> photoStatus) {
        this.photoStatus = photoStatus;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getVehicleThumbnailUrl() {
        return vehicleThumbnailUrl;
    }

    public void setVehicleThumbnailUrl(String vehicleThumbnailUrl) {
        this.vehicleThumbnailUrl = vehicleThumbnailUrl;
    }

    public List<DamageArea> getDamageAreas() {
        return damageAreas;
    }

    public void setDamageAreas(List<DamageArea> damageAreas) {
        this.damageAreas = damageAreas;
    }

    public HashMap<String, Object> getSellerAnnouncements() {
        return sellerAnnouncements;
    }

    public void setSellerAnnouncements(HashMap<String, Object> sellerAnnouncements) {
        this.sellerAnnouncements = sellerAnnouncements;
    }

    public LinkedTreeMap<String, Object> getSellerDisclosures() {
        return sellerDisclosures;
    }

    public void setSellerDisclosures(LinkedTreeMap<String, Object> sellerDisclosures) {
        this.sellerDisclosures = sellerDisclosures;
    }

    public LinkedTreeMap<String, Object> getGrading() {
        return grading;
    }

    public void setGrading(LinkedTreeMap<String, Object> grading) {
        this.grading = grading;
    }

    public static ReportDamageRNO parseResponseToDataRNO(GetReportDamageResponse response) {
        ReportDamageRNO reportDamageRNO = new ReportDamageRNO();

        if (response.getResponse() == null) {
            return reportDamageRNO;
        } else {
            reportDamageRNO.setInspectionId(response.getInspectionId());
            reportDamageRNO.setSessionKey(response.getSessionKey());
            reportDamageRNO.setLicense(response.getLicense());
            if (response.getSellerAnnouncements() != null) {
                reportDamageRNO.setSellerAnnouncements(response.getSellerAnnouncements());
            }
            if (response.getSellerDisclosures() != null) {
                reportDamageRNO.setSellerDisclosures((LinkedTreeMap<String, Object>) response.getSellerDisclosures());
            }
            if (response.getInspection() != null && response.getInspection().getGrading() != null) {
                reportDamageRNO.setGrading((LinkedTreeMap<String, Object>) response.getInspection().getGrading());
            }
            /*
             * ReportDamageRNO.VehicleThumbnailUrl
             */
            if (response.getImages() != null) {
                reportDamageRNO.setVehicleThumbnailUrl(response.getImages().getOriginalImages().get04().get(0));
            } else {
                return reportDamageRNO;
            }
            /*
             * ReportDamageRNO.Response
             */

            reportDamageRNO.setResponse(new ReportDamageRNO.Response(response.getResponse().getStatus()));

            /*
             * ReportDamageRNO.PhotoStatus
             */
            List<ReportDamageRNO.PhotoStatus> photoStatusList = new ArrayList<>();
            if (response.getPhotoStatus() != null) {
                for (int i = 0; i < response.getPhotoStatus().size(); i++) {
                    com.discoveryloft.pavesdk.service.getReportDamage.entity.PhotoStatus item = response
                            .getPhotoStatus().get(i);
                    photoStatusList.add(new ReportDamageRNO.PhotoStatus(item.getUrl(), item.getPhotoType(),
                            item.getPhotoCode(), item.getApproved(), item.getReason()));
                }
            }
            reportDamageRNO.setPhotoStatus(photoStatusList);

            /*
             * ReportDamageRNO.Vehicle
             */
            ReportDamageRNO.Vehicle vehicle = new ReportDamageRNO.Vehicle();
            com.discoveryloft.pavesdk.service.getReportDamage.entity.Vehicle resVehicle = response.getVehicle();
            vehicle.setVehicle_id(resVehicle.getVehicleId().toString());
            vehicle.setVin(resVehicle.getVin());
            vehicle.setYear(resVehicle.getYear());
            vehicle.setMake(resVehicle.getMake());
            vehicle.setModel(resVehicle.getModel());
            vehicle.setBodyType(resVehicle.getBodyType());
            vehicle.setOdomReading(resVehicle.getOdomReading());
            vehicle.setOdomUnit(resVehicle.getOdomUnit());
            vehicle.setTrim(resVehicle.getTrim());
            vehicle.setTransmission(resVehicle.getTransmission());
            vehicle.setExtColName(resVehicle.getExtColName());
            vehicle.setIntColName(resVehicle.getIntColName());
            vehicle.setEngineType(resVehicle.getEngineType());
            vehicle.setPavedExtColor(resVehicle.getPavedExtColor());
            vehicle.setPavedIntColor(resVehicle.getPavedIntColor());
            vehicle.setPavedTrim(resVehicle.getPavedTrim());
            vehicle.setFuelType(resVehicle.getFuelType());
            vehicle.setDisplacement(resVehicle.getDisplacement());
            vehicle.setDrivetrain(resVehicle.getDrivetrain());
            reportDamageRNO.setVehicle(vehicle);

            /*
             * ReportDamageRNO.DamageArea
             */
            List<ReportDamageRNO.DamageArea> damageAreaList = new ArrayList<>();

            // =========== LEFT_VIEW ===========
            ReportDamageRNO.DamageArea leftDamageArea = new ReportDamageRNO.DamageArea();
            leftDamageArea.setView(Cage.LEFT_VIEW.getName());
            leftDamageArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> leftDetectedDamageList = new ArrayList<>();
            // =========== RIGHT_VIEW ===========
            ReportDamageRNO.DamageArea rightDamageArea = new ReportDamageRNO.DamageArea();
            rightDamageArea.setView(Cage.RIGHT_VIEW.getName());
            rightDamageArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> rightDetectedDamages = new ArrayList<>();
            // =========== FRONT_VIEW ===========
            ReportDamageRNO.DamageArea frontDamageArea = new ReportDamageRNO.DamageArea();
            frontDamageArea.setPhotoUrl("");
            frontDamageArea.setView(Cage.FRONT_VIEW.getName());
            List<ReportDamageRNO.DetectedDamage> frontDetectedDamages = new ArrayList<>();
            // =========== REAR_VIEW ===========
            ReportDamageRNO.DamageArea rearDamageArea = new ReportDamageRNO.DamageArea();
            rearDamageArea.setView(Cage.REAR_VIEW.getName());
            rearDamageArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> rearDetectedDamages = new ArrayList<>();
            // =========== WIND_SHIELD ===========
            ReportDamageRNO.DamageArea windShieldArea = new ReportDamageRNO.DamageArea();
            windShieldArea.setView(Cage.WIND_SHIELD.getName());
            windShieldArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> windShieldDetectedDamages = new ArrayList<>();
            // =========== TIRE ===========
            ReportDamageRNO.DamageArea tireArea = new ReportDamageRNO.DamageArea();
            tireArea.setView(Cage.TIRE.getName());
            tireArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> tireDetectedDamages = new ArrayList<>();
            // =========== INTERIOR ===========
            ReportDamageRNO.DamageArea interiorArea = new ReportDamageRNO.DamageArea();
            interiorArea.setView(Cage.CAR_INTERIOR_LEFT_VIEW.getName());
            interiorArea.setPhotoUrl("");
            List<ReportDamageRNO.DetectedDamage> interiorDetectedDamages = new ArrayList<>();

            for (int i = 0; i < response.getInspection().getDetectedDamages().size(); i++) {
                com.discoveryloft.pavesdk.service.getReportDamage.entity.DetectedDamage detectedDamage = response
                        .getInspection().getDetectedDamages().get(i);

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.LEFT_VIEW.getValueStr())) {
                    leftDetectedDamageList.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));

                    if (leftDamageArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get04().isEmpty()) {
                            leftDamageArea.setPhotoUrl(response.getImages().getAnnotatedImages().get04().get(0));
                        } else if (!response.getImages().getOriginalImages().get04().isEmpty()) {
                            leftDamageArea.setPhotoUrl(response.getImages().getOriginalImages().get04().get(0));
                        }
                    }
                }

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.RIGHT_VIEW.getValueStr())) {
                    rightDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (rightDamageArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get07().isEmpty()) {
                            rightDamageArea.setPhotoUrl(response.getImages().getAnnotatedImages().get07().get(0));
                        } else if (!response.getImages().getOriginalImages().get07().isEmpty()) {
                            rightDamageArea.setPhotoUrl(response.getImages().getOriginalImages().get07().get(0));
                        }
                    }
                }

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.FRONT_VIEW.getValueStr())) {
                    frontDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (frontDamageArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get05().isEmpty()) {
                            frontDamageArea.setPhotoUrl(response.getImages().getAnnotatedImages().get05().get(0));
                        } else if (!response.getImages().getOriginalImages().get05().isEmpty()) {
                            frontDamageArea.setPhotoUrl(response.getImages().getOriginalImages().get05().get(0));
                        }
                    }
                }

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.REAR_VIEW.getValueStr())) {
                    rearDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (rearDamageArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get08().isEmpty()) {
                            rearDamageArea.setPhotoUrl(response.getImages().getAnnotatedImages().get08().get(0));
                        } else if (!response.getImages().getOriginalImages().get08().isEmpty()) {
                            rearDamageArea.setPhotoUrl(response.getImages().getOriginalImages().get08().get(0));
                        }
                    }
                }

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.WIND_SHIELD.getValueStr())) {
                    windShieldDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (windShieldArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get09().isEmpty()) {
                            windShieldArea.setPhotoUrl(response.getImages().getAnnotatedImages().get09().get(0));
                        } else if (!response.getImages().getOriginalImages().get09().isEmpty()) {
                            windShieldArea.setPhotoUrl(response.getImages().getOriginalImages().get09().get(0));
                        }
                    }
                }

                if (detectedDamage.getDamageGroup().equalsIgnoreCase(Cage.TIRE.name())) {
                    tireDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (tireArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get06().isEmpty()) {
                            tireArea.setPhotoUrl(response.getImages().getAnnotatedImages().get06().get(0));
                        } else if (!response.getImages().getOriginalImages().get06().isEmpty()) {
                            tireArea.setPhotoUrl(response.getImages().getOriginalImages().get06().get(0));
                        }
                    }
                }

                if (detectedDamage.getPhoto().getCode().equalsIgnoreCase(Cage.CAR_INTERIOR_LEFT_VIEW.getValueStr())) {
                    interiorDetectedDamages.add(new ReportDamageRNO.DetectedDamage(detectedDamage.getDamageGroup(),
                            detectedDamage.getComponent(), detectedDamage.getDamageName(),
                            (String) detectedDamage.getUserResponse(), detectedDamage.getSource(),
                            detectedDamage.getLabel(), detectedDamage.getDescription(), detectedDamage.getTolerance(),
                            detectedDamage.getRepairMethod(), detectedDamage.getRepairType(),
                            detectedDamage.getUnitMeasure(), detectedDamage.getGradeScore(), detectedDamage.getUuid(),
                            detectedDamage.getCroppedUrl(), detectedDamage.getCroppedCode(),
                            detectedDamage.getAascItem(), detectedDamage.getAascItemCode(),
                            detectedDamage.getAascDamageCode(), detectedDamage.getAascSeverityCode(),
                            detectedDamage.getSeverity(), detectedDamage.getComponentLabel(),
                            detectedDamage.getSeriesNme(), detectedDamage.getPartCategoryTypeId(),
                            detectedDamage.getPartCategoryTypeNme(), detectedDamage.getPartLocationId(),
                            detectedDamage.getAutoVINPartID(), detectedDamage.getPartLocationDesc(),
                            detectedDamage.getPartDescFr(), detectedDamage.getPartName(),
                            detectedDamage.getPartNameFR(), detectedDamage.getDamageCategoryClassDesc(),
                            detectedDamage.getDamageDescFr(), detectedDamage.getDamageCategoryClassId(),
                            detectedDamage.getAutoVinDamageID(), detectedDamage.getEstimatedPartCostAmt(),
                            detectedDamage.getReserveAmt(), detectedDamage.getFrame()));
                    if (interiorArea.getPhotoUrl().isEmpty()) {
                        if (!response.getImages().getAnnotatedImages().get02().isEmpty()) {
                            interiorArea.setPhotoUrl(response.getImages().getAnnotatedImages().get02().get(0));
                        } else if (!response.getImages().getOriginalImages().get02().isEmpty()) {
                            interiorArea.setPhotoUrl(response.getImages().getOriginalImages().get02().get(0));
                        }
                    }
                }
            }
            // set final LeftDetectedDamageList value
            leftDamageArea.setDetectedDamages(leftDetectedDamageList);
            frontDamageArea.setDetectedDamages(frontDetectedDamages);
            rightDamageArea.setDetectedDamages(rightDetectedDamages);
            rearDamageArea.setDetectedDamages(rearDetectedDamages);
            windShieldArea.setDetectedDamages(windShieldDetectedDamages);
            tireArea.setDetectedDamages(tireDetectedDamages);
            interiorArea.setDetectedDamages(interiorDetectedDamages);

            // add final LeftDamageArea into DamageAreaList
            damageAreaList.add(interiorArea);
            damageAreaList.add(leftDamageArea);
            damageAreaList.add(frontDamageArea);
            damageAreaList.add(rightDamageArea);
            damageAreaList.add(rearDamageArea);
            if (!windShieldArea.getPhotoUrl().trim().isEmpty())
                damageAreaList.add(windShieldArea);
            if (!tireArea.getPhotoUrl().trim().isEmpty())
                damageAreaList.add(tireArea);

            //////////// set all DamageAreaList data ///////////////////
            reportDamageRNO.setDamageAreas(damageAreaList);

            return reportDamageRNO;
        }

    }

    public static class DamageArea {

        @SerializedName("view")
        @Expose
        private String view;
        @SerializedName("detectedDamages")
        @Expose
        private List<DetectedDamage> detectedDamages = null;
        @SerializedName("photoUrl")
        @Expose
        private String photoUrl;

        public String getView() {
            return view;
        }

        public void setView(String view) {
            this.view = view;
        }

        public List<DetectedDamage> getDetectedDamages() {
            return detectedDamages;
        }

        public void setDetectedDamages(List<DetectedDamage> detectedDamages) {
            this.detectedDamages = detectedDamages;
        }

        public String getPhotoUrl() {
            return photoUrl;
        }

        public void setPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
        }

    }

    public static class DetectedDamage {
        @SerializedName("damage_group")
        @Expose
        private String damageGroup;

        @SerializedName("component")
        @Expose
        private String component;

        @SerializedName("damage_name")
        @Expose
        private String damageName;

        @SerializedName("user_response")
        @Expose
        private String userResponse;

        @SerializedName("source")
        @Expose
        private String source;

        @SerializedName("label")
        @Expose
        private String label;

        @SerializedName("description")
        @Expose
        private String description;

        @SerializedName("tolerance")
        @Expose
        private String tolerance;

        @SerializedName("repair_method")
        @Expose
        private String repairMethod;

        @SerializedName("repair_type")
        @Expose
        private String repairType;

        @SerializedName("unit_measure")
        @Expose
        private String unitMeasure;

        @SerializedName("grade_score")
        @Expose
        private Integer gradeScore;

        @SerializedName("uuid")
        @Expose
        private String uuid;

        @SerializedName("cropped_url")
        @Expose
        private String croppedUrl;

        @SerializedName("croppedCode")
        @Expose
        private String croppedCode;

        @SerializedName("aasc_item")
        @Expose
        private String aascItem;
        @SerializedName("aasc_item_code")
        @Expose
        private int aascItemCode;
        @SerializedName("aasc_damage_code")
        @Expose
        private int aascDamageCode;
        @SerializedName("aasc_severity_code")
        @Expose
        private int aascSeverityCode;

        @SerializedName("Severity")
        @Expose
        private String severity;

        @SerializedName("component_label")
        @Expose
        private String component_label;

        @SerializedName("series_nme")
        @Expose
        private String seriesNme;
        @SerializedName("part_category_type_id")
        @Expose
        private Integer partCategoryTypeId;
        @SerializedName("part_category_type_nme")
        @Expose
        private String partCategoryTypeNme;
        @SerializedName("part_location_id")
        @Expose
        private Integer partLocationId;
        @SerializedName("AutoVINPartID")
        @Expose
        private Integer autoVINPartID;
        @SerializedName("part_location_desc")
        @Expose
        private String partLocationDesc;
        @SerializedName("part_desc_fr")
        @Expose
        private String partDescFr;
        @SerializedName("PartName")
        @Expose
        private String partName;
        @SerializedName("PartName_FR")
        @Expose
        private String partNameFR;
        @SerializedName("damage_category_class_desc")
        @Expose
        private String damageCategoryClassDesc;
        @SerializedName("damage_desc_fr")
        @Expose
        private String damageDescFr;
        @SerializedName("damage_category_class_id")
        @Expose
        private Integer damageCategoryClassId;
        @SerializedName("AutoVinDamageID")
        @Expose
        private Integer autoVinDamageID;
        @SerializedName("estimated_part_cost_amt")
        @Expose
        private String estimatedPartCostAmt;
        @SerializedName("reserve_amt")
        @Expose
        private String reserveAmt;
        @SerializedName("frame")
        @Expose
        private String frame;

        public DetectedDamage(String damageGroup, String component, String damageName, String userResponse,
                String source, String label, String description, String tolerance, String repairMethod,
                String repairType, String unitMeasure, Integer gradeScore, String uuid, String croppedUrl,
                String croppedCode) {
            this.damageGroup = damageGroup;
            this.component = component;
            this.damageName = damageName;
            this.userResponse = userResponse;
            this.source = source;
            this.label = label;
            this.description = description;
            this.tolerance = tolerance;
            this.repairMethod = repairMethod;
            this.repairType = repairType;
            this.unitMeasure = unitMeasure;
            this.gradeScore = gradeScore;
            this.uuid = uuid;
            this.croppedUrl = croppedUrl;
            this.croppedCode = croppedCode;
        }

        public DetectedDamage(String damageGroup, String component, String damageName, String userResponse,
                String source, String label, String description, String tolerance, String repairMethod,
                String repairType, String unitMeasure, Integer gradeScore, String uuid, String croppedUrl,
                String croppedCode, String aascItem, int aascItemCode, int aascDamageCode, int aascSeverityCode,
                String severity, String component_label) {
            this.damageGroup = damageGroup;
            this.component = component;
            this.damageName = damageName;
            this.userResponse = userResponse;
            this.source = source;
            this.label = label;
            this.description = description;
            this.tolerance = tolerance;
            this.repairMethod = repairMethod;
            this.repairType = repairType;
            this.unitMeasure = unitMeasure;
            this.gradeScore = gradeScore;
            this.uuid = uuid;
            this.croppedUrl = croppedUrl;
            this.croppedCode = croppedCode;
            this.aascItem = aascItem;
            this.aascItemCode = aascItemCode;
            this.aascDamageCode = aascDamageCode;
            this.aascSeverityCode = aascSeverityCode;
            this.severity = severity;
            this.component_label = component_label;
        }

        public DetectedDamage(String damageGroup, String component, String damageName, String userResponse,
                String source, String label, String description, String tolerance, String repairMethod,
                String repairType, String unitMeasure, Integer gradeScore, String uuid, String croppedUrl,
                String croppedCode, String aascItem, int aascItemCode, int aascDamageCode, int aascSeverityCode,
                String severity, String component_label, String seriesNme, Integer partCategoryTypeId,
                String partCategoryTypeNme, Integer partLocationId, Integer autoVINPartID, String partLocationDesc,
                String partDescFr, String partName, String partNameFR, String damageCategoryClassDesc,
                String damageDescFr, Integer damageCategoryClassId, Integer autoVinDamageID,
                String estimatedPartCostAmt, String reserveAmt, String frame) {
            this.damageGroup = damageGroup;
            this.component = component;
            this.damageName = damageName;
            this.userResponse = userResponse;
            this.source = source;
            this.label = label;
            this.description = description;
            this.tolerance = tolerance;
            this.repairMethod = repairMethod;
            this.repairType = repairType;
            this.unitMeasure = unitMeasure;
            this.gradeScore = gradeScore;
            this.uuid = uuid;
            this.croppedUrl = croppedUrl;
            this.croppedCode = croppedCode;
            this.aascItem = aascItem;
            this.aascItemCode = aascItemCode;
            this.aascDamageCode = aascDamageCode;
            this.aascSeverityCode = aascSeverityCode;
            this.severity = severity;
            this.component_label = component_label;
            this.seriesNme = seriesNme;
            this.partCategoryTypeId = partCategoryTypeId;
            this.partCategoryTypeNme = partCategoryTypeNme;
            this.partLocationId = partLocationId;
            this.autoVINPartID = autoVINPartID;
            this.partLocationDesc = partLocationDesc;
            this.partDescFr = partDescFr;
            this.partName = partName;
            this.partNameFR = partNameFR;
            this.damageCategoryClassDesc = damageCategoryClassDesc;
            this.damageDescFr = damageDescFr;
            this.damageCategoryClassId = damageCategoryClassId;
            this.autoVinDamageID = autoVinDamageID;
            this.estimatedPartCostAmt = estimatedPartCostAmt;
            this.reserveAmt = reserveAmt;
            this.frame = frame;
        }

        public String getDamageGroup() {
            return damageGroup;
        }

        public void setDamageGroup(String damageGroup) {
            this.damageGroup = damageGroup;
        }

    }

    public static class PhotoStatus {

        @SerializedName("url")
        @Expose
        private String url;
        @SerializedName("photoType")
        @Expose
        private String photoType;
        @SerializedName("photoCode")
        @Expose
        private Integer photoCode;
        @SerializedName("approved")
        @Expose
        private Boolean approved;
        @SerializedName("reason")
        @Expose
        private String reason;

        public PhotoStatus(String url, String photoType, Integer photoCode, Boolean approved, String reason) {
            this.url = url;
            this.photoType = photoType;
            this.photoCode = photoCode;
            this.approved = approved;
            this.reason = reason;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getPhotoType() {
            return photoType;
        }

        public void setPhotoType(String photoType) {
            this.photoType = photoType;
        }

        public Integer getPhotoCode() {
            return photoCode;
        }

        public void setPhotoCode(Integer photoCode) {
            this.photoCode = photoCode;
        }

        public Boolean getApproved() {
            return approved;
        }

        public void setApproved(Boolean approved) {
            this.approved = approved;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

    }

    public static class Response {

        @SerializedName("status")
        @Expose
        private String status;
        @SerializedName("inspectionCreate")
        @Expose
        private String inspectionCreate;
        @SerializedName("inspectionStart")
        @Expose
        private String inspectionStart;
        @SerializedName("inspectionEnd")
        @Expose
        private String inspectionEnd;
        @SerializedName("inspectionPartner")
        @Expose
        private String inspectionPartner;

        public Response(String status, String inspectionCreate, String inspectionStart, String inspectionEnd,
                String inspectionPartner) {
            this.status = status;
            this.inspectionCreate = inspectionCreate;
            this.inspectionStart = inspectionStart;
            this.inspectionEnd = inspectionEnd;
            this.inspectionPartner = inspectionPartner;
        }

        public Response(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getInspectionCreate() {
            return inspectionCreate;
        }

        public void setInspectionCreate(String inspectionCreate) {
            this.inspectionCreate = inspectionCreate;
        }

        public String getInspectionStart() {
            return inspectionStart;
        }

        public void setInspectionStart(String inspectionStart) {
            this.inspectionStart = inspectionStart;
        }

        public String getInspectionEnd() {
            return inspectionEnd;
        }

        public void setInspectionEnd(String inspectionEnd) {
            this.inspectionEnd = inspectionEnd;
        }

        public String getInspectionPartner() {
            return inspectionPartner;
        }

        public void setInspectionPartner(String inspectionPartner) {
            this.inspectionPartner = inspectionPartner;
        }

    }

    public static class Vehicle {
        @SerializedName("vehicle_id")
        @Expose
        private String vehicle_id;
        @SerializedName("vin")
        @Expose
        private String vin;
        @SerializedName("year")
        @Expose
        private Integer year;
        @SerializedName("make")
        @Expose
        private String make;
        @SerializedName("model")
        @Expose
        private String model;
        @SerializedName("body_type")
        @Expose
        private String bodyType;
        @SerializedName("odom_reading")
        @Expose
        private String odomReading;
        @SerializedName("odom_unit")
        @Expose
        private String odomUnit;
        @SerializedName("trim")
        @Expose
        private String trim;
        @SerializedName("transmission")
        @Expose
        private String transmission;

        @SerializedName("engine_type")
        @Expose
        private String engineType;

        @SerializedName("drivetrain")
        @Expose
        private String drivetrain;

        @SerializedName("displacement")
        @Expose
        private String displacement;

        @SerializedName("ext_col_name")
        @Expose
        private String extColName;
        @SerializedName("int_col_name")
        @Expose
        private String intColName;

        @SerializedName("fuel_type")
        @Expose
        private String fuelType;

        @SerializedName("paved_trim")
        @Expose
        private PavedTrim pavedTrim;
        @SerializedName("paved_ext_color")
        @Expose
        private PavedExtColor pavedExtColor;
        @SerializedName("paved_int_color")
        @Expose
        private PavedIntColor pavedIntColor;

        public String getVehicle_id() {
            return vehicle_id;
        }

        public void setVehicle_id(String vehicle_id) {
            this.vehicle_id = vehicle_id;
        }

        public String getVin() {
            return vin;
        }

        public void setVin(String vin) {
            this.vin = vin;
        }

        public Integer getYear() {
            return year;
        }

        public void setYear(Integer year) {
            this.year = year;
        }

        public String getMake() {
            return make;
        }

        public void setMake(String make) {
            this.make = make;
        }

        public String getModel() {
            return model;
        }

        public void setModel(String model) {
            this.model = model;
        }

        public String getBodyType() {
            return bodyType;
        }

        public void setBodyType(String bodyType) {
            this.bodyType = bodyType;
        }

        public String getOdomReading() {
            return odomReading;
        }

        public void setOdomReading(String odomReading) {
            this.odomReading = odomReading;
        }

        public String getOdomUnit() {
            return odomUnit;
        }

        public void setOdomUnit(String odomUnit) {
            this.odomUnit = odomUnit;
        }

        public String getTrim() {
            return trim;
        }

        public void setTrim(String trim) {
            this.trim = trim;
        }

        public String getTransmission() {
            return transmission;
        }

        public void setTransmission(String transmission) {
            this.transmission = transmission;
        }

        public String getExtColName() {
            return extColName;
        }

        public void setExtColName(String extColName) {
            this.extColName = extColName;
        }

        public String getIntColName() {
            return intColName;
        }

        public void setIntColName(String intColName) {
            this.intColName = intColName;
        }

        public String getEngineType() {
            return engineType;
        }

        public void setEngineType(String engineType) {
            this.engineType = engineType;
        }

        public String getDrivetrain() {
            return drivetrain;
        }

        public void setDrivetrain(String drivetrain) {
            this.drivetrain = drivetrain;
        }

        public String getDisplacement() {
            return displacement;
        }

        public void setDisplacement(String displacement) {
            this.displacement = displacement;
        }

        public String getFuelType() {
            return fuelType;
        }

        public void setFuelType(String fuelType) {
            this.fuelType = fuelType;
        }

        public PavedTrim getPavedTrim() {
            return pavedTrim;
        }

        public void setPavedTrim(PavedTrim pavedTrim) {
            this.pavedTrim = pavedTrim;
        }

        public PavedExtColor getPavedExtColor() {
            return pavedExtColor;
        }

        public void setPavedExtColor(PavedExtColor pavedExtColor) {
            this.pavedExtColor = pavedExtColor;
        }

        public PavedIntColor getPavedIntColor() {
            return pavedIntColor;
        }

        public void setPavedIntColor(PavedIntColor pavedIntColor) {
            this.pavedIntColor = pavedIntColor;
        }

    }

}
