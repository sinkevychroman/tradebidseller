//
//  InspectionResultRNO.swift
//  PaveModule
//
//  Created by KimDuong on 7/16/20.
//

import Foundation

struct InspectionResultRNO: Codable {
    let sessionKey: String
    let inspectionid: String
    let license: String
    let responseResult: ResponseResult?
    let vehicle: VehicleResult!
    var photoStatus: [PhotoStatusResult]! = [PhotoStatusResult]()
    let vehicleThumbnailUrl: String
    var damageAreas: [DamageAreaResult] = [DamageAreaResult]()
    
    var sellerAnnouncements : JSONAny?
    var sellerDisclosures : JSONAny?
    var grading : JSONAny?


    init(result: InspectionResult) {
        
        sessionKey = result.sessionKey
        inspectionid = result.inspectionId
        license = result.license

        var cachePhotoStatus = [PhotoStatusResult]()

        result.photoStatus.forEach { photo in

            cachePhotoStatus.append(PhotoStatusResult(url: photo.url.valueOrEmpty,
                                           photoType: photo.photoType.valueOrEmpty,
                                           photoCode: photo.photoCode.valueOrEmpty,
                                           approved: photo.approved.valueOrEmpty,
                                           reason: photo.reason.valueOrEmpty))
        }
        
        photoStatus = cachePhotoStatus

        let vehicleRes = result.vehicle

        vehicle = VehicleResult(  vehicleid :vehicleRes.vehicleid.valueOrEmpty,
        vin :vehicleRes.vin.valueOrEmpty,
        year:vehicleRes.year.valueOrEmpty,
        make :vehicleRes.make.valueOrEmpty,
        model :vehicleRes.model.valueOrEmpty,
        bodyType :vehicleRes.bodyType.valueOrEmpty,
        odomReading :vehicleRes.odomReading.valueOrEmpty,
        odomUnit :vehicleRes.odomUnit.valueOrEmpty,
        trim :vehicleRes.trim.valueOrEmpty,
        trimTitle :vehicleRes.trimTitle.valueOrEmpty,
        mfrModelCode :vehicleRes.mfrModelCode.valueOrEmpty,
        chromeStyleid :vehicleRes.chromeStyleid.valueOrEmpty,
        transmission :vehicleRes.transmission.valueOrEmpty,
        drivetrain :vehicleRes.drivetrain.valueOrEmpty,
        engineType :vehicleRes.engineType.valueOrEmpty,
        fuelType :vehicleRes.fuelType.valueOrEmpty,
        extColName :vehicleRes.extColName.valueOrEmpty,
        intColName :vehicleRes.intColName.valueOrEmpty,
        aCode :vehicleRes.aCode.valueOrEmpty,
        doors :vehicleRes.doors.valueOrEmpty,
        hpValue :vehicleRes.hpValue.valueOrEmpty,
        hprpm :vehicleRes.hprpm.valueOrEmpty,
        torqueValue :vehicleRes.torqueValue.valueOrEmpty,
        torquerpm :vehicleRes.torquerpm.valueOrEmpty,
        cylinders :vehicleRes.cylinders.valueOrEmpty,
        displacement :vehicleRes.displacement.valueOrEmpty,
        wheelbase :vehicleRes.wheelbase.valueOrEmpty,
        fuelEcoCity :vehicleRes.fuelEcoCity.valueOrEmpty,
        fuelEcoHwy :vehicleRes.fuelEcoHwy.valueOrEmpty,
        fuelEcoUnit :vehicleRes.fuelEcoUnit.valueOrEmpty,
        fuelCapHigh :vehicleRes.fuelCapHigh.valueOrEmpty,
        fuelCapLow :vehicleRes.fuelCapLow.valueOrEmpty,
        fuelCapUnit :vehicleRes.fuelCapUnit.valueOrEmpty,
        extColor:vehicleRes.extColor,
        intColor:vehicleRes.intColor,
        pavedextColor:vehicleRes.pavedextColor,
        pavedIntColor:vehicleRes.pavedIntColor
        )
        vehicleThumbnailUrl = result.vehicleThumnailUrl
        
        var cacheDamageAreaResult = [DamageAreaResult]()
        
        result.damageAreas.forEach { (key,value) in
            cacheDamageAreaResult.append(DamageAreaResult.init(view: key.getName().removeUnderLine(), detectedDamages: value.detectedDamages, photoUrl:value.photoUrl.valueOrEmpty))
        }
        damageAreas = cacheDamageAreaResult
        
        sellerDisclosures = result.sellerDisclosures
        sellerAnnouncements = result.sellerAnnouncements
        grading = result.grading
        
        let response = result.response
        
        let resResult : ResponseResult = ResponseResult.init(status: response?.status.valueOrEmpty,
                                                             inspectionPartner: response?.inspectionPartner.valueOrEmpty)
     
        responseResult = resResult
        
    }

    enum CodingKeys: String, CodingKey {
        case sessionKey = "session_key"
        case inspectionid = "inspection_id"
        case license
        case photoStatus = "photo_status"
        case vehicle
        case vehicleThumbnailUrl
        case damageAreas
        case sellerAnnouncements
        case sellerDisclosures
        case responseResult = "response"
        case grading
    }
}

// MARK: - DamageArea

struct DamageAreaResult: Codable {
    var view: String
    var detectedDamages: [DetectedDamage]
    var photoUrl: String

    enum CodingKeys: String, CodingKey {
        case view
        case detectedDamages
        case photoUrl
    }
}


struct PhotoStatusResult: Codable {
    var url: String
    var photoType: String
    var photoCode: Int
    var approved: Bool
    var reason: String

    enum CodingKeys: String, CodingKey {
        case url
        case photoType
        case photoCode
        case approved
        case reason
    }
}


struct VehicleResult: Codable {
    let vehicleid: Int?
    let vin: String?
    let year: Int?
    let make: String?
    let model: String?
    let bodyType: String?
    let odomReading: String?
    let odomUnit: String?
    let trim: String?
    let trimTitle: String?
    let mfrModelCode: String?
    let chromeStyleid: String?
    let transmission: String?
    let drivetrain: String?
    let engineType: String?
    let fuelType: String?
    let extColName: String?
    let intColName: String?
    let aCode: String?
    let doors: String?
    let hpValue: String?
    let hprpm: String?
    let torqueValue: String?
    let torquerpm: String?
    let cylinders: String?
    let displacement: String?
    let wheelbase: String?
    let fuelEcoCity: String?
    let fuelEcoHwy: String?
    let fuelEcoUnit: String?
    let fuelCapHigh: String?
    let fuelCapLow: String?
    let fuelCapUnit: String?
    let extColor: VehicleColor?
    let intColor: VehicleColor?
//    let pavedTrim: PavedTrim?
    let pavedextColor: VehicleColor?
    let pavedIntColor: VehicleColor?
//    let pavedPackage: [JSONAny]?

     enum CodingKeys: String, CodingKey {
           case vehicleid = "vehicle_id"
           case vin = "vin"
           case year = "year"
           case make = "make"
           case model = "model"
           case bodyType = "body_type"
           case odomReading = "odom_reading"
           case odomUnit = "odom_unit"
           case trim = "trim"
           case trimTitle = "trim_title"
           case mfrModelCode = "mfr_model_code"
           case chromeStyleid = "chrome_style_id"
           case transmission = "transmission"
           case drivetrain = "drivetrain"
           case engineType = "engine_type"
           case fuelType = "fuel_type"
           case extColName = "ext_col_name"
           case intColName = "int_col_name"
           case aCode = "a_code"
           case doors = "doors"
           case hpValue = "hp_value"
           case hprpm = "hp_rpm"
           case torqueValue = "torque_value"
           case torquerpm = "torque_rpm"
           case cylinders = "cylinders"
           case displacement = "displacement"
           case wheelbase = "wheelbase"
           case fuelEcoCity = "fuel_eco_city"
           case fuelEcoHwy = "fuel_eco_hwy"
           case fuelEcoUnit = "fuel_eco_unit"
           case fuelCapHigh = "fuel_cap_high"
           case fuelCapLow = "fuel_cap_low"
           case fuelCapUnit = "fuel_cap_unit"
           case extColor = "ext_color"
           case intColor = "int_color"
//           case pavedTrim = "paved_trim"
           case pavedextColor = "paved_ext_color"
           case pavedIntColor = "paved_int_color"
//           case pavedPackage = "paved_package"
       }
}

struct _VehicleColor: Codable {
    let extColorid: Int?
    let colorCode: String?
    let colorName: String?
    let genericName: String?
    let hexValue: String?

    enum CodingKeys: String, CodingKey {
        case extColorid = "ext_color_id"
        case colorCode = "color_code"
        case colorName = "color_name"
        case genericName = "generic_name"
        case hexValue = "hex_value"
    }
}

// MARK: - PavedTrim
struct _PavedTrim: Codable {
    let trim: String?
    let mfrModelCode: String?
    let chromeStyleid: String?
    let transmission: String?
    let drivetrain: String?
    let engineType: String?
    let fuelType: String?
    let doors: String?
    let aCode: String?
    let hpValue: String?
    let hprpm: String?
    let torqueValue: String?
    let torquerpm: String?
    let cylinders: String?
    let displacement: String?
    let wheelbase: String?
    let fuelEcoCity: String?
    let fuelEcoHwy: String?
    let fuelEcoUnit: String?
    let fuelCapHigh: String?
    let fuelCapLow: String?
    let fuelCapUnit: String?

    enum CodingKeys: String, CodingKey {
        case trim = "trim"
        case mfrModelCode = "mfr_model_code"
        case chromeStyleid = "chrome_style_id"
        case transmission = "transmission"
        case drivetrain = "drivetrain"
        case engineType = "engine_type"
        case fuelType = "fuel_type"
        case doors = "doors"
        case aCode = "a_code"
        case hpValue = "hp_value"
        case hprpm = "hp_rpm"
        case torqueValue = "torque_value"
        case torquerpm = "torque_rpm"
        case cylinders = "cylinders"
        case displacement = "displacement"
        case wheelbase = "wheelbase"
        case fuelEcoCity = "fuel_eco_city"
        case fuelEcoHwy = "fuel_eco_hwy"
        case fuelEcoUnit = "fuel_eco_unit"
        case fuelCapHigh = "fuel_cap_high"
        case fuelCapLow = "fuel_cap_low"
        case fuelCapUnit = "fuel_cap_unit"
    }
}

// MARK: - Response
struct ResponseResult: Codable {
    let status: String?
//    let inspectionCreate: String?
//    let inspectionStart, inspectionEnd: Bool?
    let inspectionPartner: String?
    enum CodingKeys: String, CodingKey {
           case status
//           case inspectionCreate = "inspection_create"
//           case inspectionStart = "inspection_start"
//           case inspectionEnd = "inspection_end"
           case inspectionPartner = "inspection_partner"
       }
}


