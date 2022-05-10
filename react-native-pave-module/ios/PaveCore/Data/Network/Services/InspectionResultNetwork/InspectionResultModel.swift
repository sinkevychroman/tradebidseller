//
//  InspectionReusult.swift
//  PAVE
//
//  Created by KimDuong on 6/10/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

struct InspectionResultRequest {
    let sessionKey: String
    let apiKey: String
}

struct InspectionResultResponse: Codable {
    let sessionKey: String?
    let inspectionid: String?
    let license: String?
    let photoStatus: [PhotoStatus]?
    let vehicle: VehicleInspection?
    let inspection: Inspection?
    let images: Images?
    let conditionReport: String?
    let caseDetails: CaseDetails?
    let paveDisclosure: String?
    let sellerAnnouncements: JSONAny?
    let sellerDisclosures: JSONAny?
    let response: Response?


    enum CodingKeys: String, CodingKey {
        case sessionKey = "session_key"
        case inspectionid = "inspection_id"
        case license
        case photoStatus = "photo_status"
        case vehicle
        case inspection
        case images, response
        case conditionReport = "condition_report"
        case caseDetails = "case_details"
        case paveDisclosure = "pave_disclosure"
        case sellerAnnouncements = "seller_announcements"
        case sellerDisclosures = "seller_disclosures"
    }
}

// MARK: - PhotoStatus

struct PhotoStatus: Codable {
    let url: String?
    let photoType: String?
    let photoCode: Int?
    let approved: Bool?
    let reason: String?

    enum CodingKeys: String, CodingKey {
        case url
        case photoType
        case photoCode
        case approved
        case reason
    }
}

// MARK: - Inspection

struct Inspection: Codable {
    let detectedStatus: [DetectedStatus]?
    let detectedDamages: [DetectedDamage]?
    let grading: JSONAny?
    let totalEstimates: Int?

    enum CodingKeys: String, CodingKey {
        case detectedStatus = "detected_status"
        case detectedDamages = "detected_damages"
        case grading
        case totalEstimates = "total_estimates"
    }
}

// MARK: - DetectedStatus

struct DetectedStatus: Codable {
    let interiorStatus: String?
    let tireStatus: String?

    enum CodingKeys: String, CodingKey {
        case interiorStatus = "interior_status"
        case tireStatus = "tire_status"
    }
}

// MARK: - Grading

struct Grading: Codable {
    let standarda: Int?
    let standardb: String?
    let standardc: String?
    let autograde: Int?
    let autogradeb: String?
    let componentDamages: [String: ComponentDamage]?

    enum CodingKeys: String, CodingKey {
        case standarda = "standard_A"
        case standardb = "standard_B"
        case standardc = "standard_C"
        case autograde
        case autogradeb = "autograde_B"
        case componentDamages = "component_damages"
    }
}

// MARK: - ComponentDamage

struct ComponentDamage: Codable {
    let scoreByComponent: Bool?
    let itemScore: Int?

    let componentScore: Int?

    enum CodingKeys: String, CodingKey {
        case scoreByComponent = "score_by_component"
        case itemScore = "item_score"
        case componentScore = "component_score"
    }
}

// MARK: - CaseDetails

struct CaseDetails: Codable {
    let caseid: String?
    let caseStartTime: String?
    let caseEndTime: String?

    enum CodingKeys: String, CodingKey {
        case caseid = "case_id"
        case caseStartTime = "case_start_time"
        case caseEndTime = "case_end_time"
    }
}

// MARK: - Photo

struct Photo: Codable {
    let code: String?
    let url: String?

    enum CodingKeys: String, CodingKey {
        case code
        case url
    }
}

// MARK: - Images

struct Images: Codable {
    let photoCodes: PhotoCodes?
    let originalImages: AnnotatedImagesClass?
    let annotatedImages: AnnotatedImagesClass?
    let userImages: [JSONAny]?

    enum CodingKeys: String, CodingKey {
        case photoCodes = "photo_codes"
        case originalImages = "original_images"
        case annotatedImages = "annotated_images"
        case userImages = "user_images"
    }
}

struct AnnotatedImagesClass: Codable {
    let the10: [String]?
    let the11: [String]?
    let the12: [String]?
    let the13: [String]?
    let the01: [String]?
    let the02: [String]?
    let the03: [String]?
    let the04: [String]?
    let the05: [String]?
    let the06: [String]?
    let the07: [String]?
    let the08: [String]?
    let the09: [String]?

    enum CodingKeys: String, CodingKey {
        case the10 = "10"
        case the11 = "11"
        case the12 = "12"
        case the13 = "13"
        case the01 = "01"
        case the02 = "02"
        case the03 = "03"
        case the04 = "04"
        case the05 = "05"
        case the06 = "06"
        case the07 = "07"
        case the08 = "08"
        case the09 = "09"
    }
}

// PhotoCodes.swift

// This file was generated from JSON Schema using quicktype, do not modify it directly.
// To parse the JSON, add this file to your project and do:
//
//   let photoCodes = try? newJSONDecoder().decode(PhotoCodes.self, from: jsonData)

import Foundation

// MARK: - PhotoCodes

struct PhotoCodes: Codable {
    let the10: PhotoType?
    let the11: PhotoType?
    let the12: PhotoType?
    let the13: PhotoType?
    let the01: PhotoType?
    let the02: PhotoType?
    let the03: PhotoType?
    let the04: PhotoType?
    let the05: PhotoType?
    let the06: PhotoType?
    let the07: PhotoType?
    let the08: PhotoType?
    let the09: PhotoType?

    enum CodingKeys: String, CodingKey {
        case the10 = "10"
        case the11 = "11"
        case the12 = "12"
        case the13 = "13"
        case the01 = "01"
        case the02 = "02"
        case the03 = "03"
        case the04 = "04"
        case the05 = "05"
        case the06 = "06"
        case the07 = "07"
        case the08 = "08"
        case the09 = "09"
    }
}

struct PhotoType: Codable {
    let type: String?
    let label: String?
    let cageCode: String?

    enum CodingKeys: String, CodingKey {
        case type
        case label
        case cageCode
    }
}

import Foundation

// MARK: - DetectedDamage

struct DetectedDamage: Codable {
    let damageGroup: String?
    let component: String?
    let damageName: String?
    let userResponse: String?
    let source: String?
    let label: String?
    let detectedDamageDescription: String?
    let tolerance: String?
    let repairMethod: String?
    let repairType: String?
    let unitMeasure: String?
    let gradeScore: Int?
    let photo: Photo?
    let uuid: String?
    let croppedurl: String?
    let croppedCode: String?

    let componentLabel: String?
    let aascItem: String?
    let aascItemCode: Int?
    let aascDamageCode: Int?
    let aascSeverityCode: Int?
//    let Severity: String? // duplicate

    let condition: String?

    // For COX-BMW
    let seriesNme: String?
    let partCategoryTypeID: Int?
    let partCategoryTypeNme: String?
    let partLocationID, autoVINPartID: Int?
    let partLocationDesc, partDescFr, partName, partNameFR: String?
    let damageCategoryClassDesc, damageDescFr, severity: String?
    let damageCategoryClassID, autoVinDamageID: Int?
    let estimatedPartCostAmt, reserveAmt: String?
    let frame: String?

    enum CodingKeys: String, CodingKey {
        case damageGroup = "damage_group"
        case component
        case damageName = "damage_name"
       case userResponse = "user_response"
       case source
        case label
        case detectedDamageDescription = "description"
        case tolerance
        case repairMethod = "repair_method"
        case repairType = "repair_type"
        case unitMeasure = "unit_measure"
        case gradeScore = "grade_score"
        case photo
        case uuid
        case croppedurl = "cropped_url"
        case croppedCode = "cropped_code"

        case componentLabel = "component_label"
        case aascItem = "aasc_item"
        case aascItemCode = "aasc_item_code"
        case aascDamageCode = "aasc_damage_code"
        case aascSeverityCode = "aasc_severity_code"
        case condition

        case seriesNme = "series_nme"
        case partCategoryTypeID = "part_category_type_id"
        case partCategoryTypeNme = "part_category_type_nme"
        case partLocationID = "part_location_id"
        case autoVINPartID = "AutoVINPartID"
        case partLocationDesc = "part_location_desc"
        case partDescFr = "part_desc_fr"
        case partName = "PartName"
        case partNameFR = "PartName_FR"
        case damageCategoryClassDesc = "damage_category_class_desc"
        case damageDescFr = "damage_desc_fr"
        case severity = "Severity"
        case damageCategoryClassID = "damage_category_class_id"
        case autoVinDamageID = "AutoVinDamageID"
        case estimatedPartCostAmt = "estimated_part_cost_amt"
        case reserveAmt = "reserve_amt"
        case frame
    }
}

struct VehicleInspection: Codable {
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
    let pavedTrim: PavedTrim?
    let pavedextColor: VehicleColor?
    let pavedIntColor: VehicleColor?
    let pavedPackage: [JSONAny]?

    enum CodingKeys: String, CodingKey {
        case vehicleid = "vehicle_id"
        case vin
        case year
        case make
        case model
        case bodyType = "body_type"
        case odomReading = "odom_reading"
        case odomUnit = "odom_unit"
        case trim
        case trimTitle = "trim_title"
        case mfrModelCode = "mfr_model_code"
        case chromeStyleid = "chrome_style_id"
        case transmission
        case drivetrain
        case engineType = "engine_type"
        case fuelType = "fuel_type"
        case extColName = "ext_col_name"
        case intColName = "int_col_name"
        case aCode = "a_code"
        case doors
        case hpValue = "hp_value"
        case hprpm = "hp_rpm"
        case torqueValue = "torque_value"
        case torquerpm = "torque_rpm"
        case cylinders
        case displacement
        case wheelbase
        case fuelEcoCity = "fuel_eco_city"
        case fuelEcoHwy = "fuel_eco_hwy"
        case fuelEcoUnit = "fuel_eco_unit"
        case fuelCapHigh = "fuel_cap_high"
        case fuelCapLow = "fuel_cap_low"
        case fuelCapUnit = "fuel_cap_unit"
        case extColor = "ext_color"
        case intColor = "int_color"
        case pavedTrim = "paved_trim"
        case pavedextColor = "paved_ext_color"
        case pavedIntColor = "paved_int_color"
        case pavedPackage = "paved_package"
    }
}

struct VehicleColor: Codable {
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

struct PavedTrim: Codable {
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
        case trim
        case mfrModelCode = "mfr_model_code"
        case chromeStyleid = "chrome_style_id"
        case transmission
        case drivetrain
        case engineType = "engine_type"
        case fuelType = "fuel_type"
        case doors
        case aCode = "a_code"
        case hpValue = "hp_value"
        case hprpm = "hp_rpm"
        case torqueValue = "torque_value"
        case torquerpm = "torque_rpm"
        case cylinders
        case displacement
        case wheelbase
        case fuelEcoCity = "fuel_eco_city"
        case fuelEcoHwy = "fuel_eco_hwy"
        case fuelEcoUnit = "fuel_eco_unit"
        case fuelCapHigh = "fuel_cap_high"
        case fuelCapLow = "fuel_cap_low"
        case fuelCapUnit = "fuel_cap_unit"
    }
}

// MARK: - Response
struct Response: Codable {
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
