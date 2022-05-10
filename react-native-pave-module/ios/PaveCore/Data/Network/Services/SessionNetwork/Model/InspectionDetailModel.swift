//
//  File.swift
//  PAVE
//
//  Created by KimDuong on 5/29/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

struct InspectionDetailsRequest {
    let sessionKey: String!
    let authorization: String!
}

public struct InspectionDetailsResponse: Codable {
    let inspectionID: String?
    let sessionID: String?
    let status: String?
    let vinDecode: Bool?
    let cages: Cages?
    let vehicle: Vehicle?
    let rejectOdom: Bool?
//    let options: JSONAny?

    enum CodingKeys: String, CodingKey {
        case inspectionID
        case sessionID
        case status
        case vinDecode = "vin_decode"
        case cages
        case vehicle
        case rejectOdom
//        case options
    }
}

extension InspectionDetailsResponse {
    public init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
       
        inspectionID = try! container.decodeIfPresent(String.self, forKey: .inspectionID) ?? ""
      
        sessionID = try! container.decodeIfPresent(String.self, forKey: .sessionID) ?? ""

        status = try! container.decodeIfPresent(String.self, forKey: .status) ?? ""

        vinDecode = try? container.decodeIfPresent(Bool.self, forKey: .vinDecode) ?? false

        cages = try? container.decodeIfPresent(Cages.self, forKey: .cages) ?? nil

        vehicle = try? container.decodeIfPresent(Vehicle.self, forKey: .vehicle) ?? nil
        
        rejectOdom = try? container.decodeIfPresent(Bool.self, forKey: .rejectOdom) ?? nil
//        options = nil
    }
}

struct VehicleOptionOption: Codable {
    let id: Int
    let type: String
    let optionDescription: String
    let description2: String
    let msrpMin: String
    let msrpMax: String
    let chromeCode: String
    let oemCode: String?
    let standard: Bool
    let fleetOnly: Bool

    enum CodingKeys: String, CodingKey {
        case id
        case type
        case optionDescription = "description"
        case description2 = "description_2"
        case msrpMin = "msrp_min"
        case msrpMax = "msrp_max"
        case chromeCode = "chrome_code"
        case oemCode = "oem_code"
        case standard
        case fleetOnly = "fleet_only"
    }
}

struct Vehicle: Codable {
    let id: Int?
    let vin: String?
    let year: Int?
    let make: String?
    let model: String?
    let bodyType: String?
    let chromeStyleid: String?
    let mfrModelCode: String?
    let odomReading: String?
    let odomUnit: String?
    let trim: String?
    let drivetrain: String?
    let transmission: String?
    let engineType: String?
    let fuelType: String?
    let extCol: JSONNull?
    let intCol: JSONNull?
    let trimDiff: Bool?
    let drivetrainDiff: Bool?
    let transmissionDiff: Bool?
    let engineTypeDiff: Bool?
    let fuelTypeDiff: Bool?
    let extColDiff: Bool?
    let intColDiff: Bool?
    let aCode: String?
    let doors: String?
    let doorsDiff: Bool?
    let hpValue: String?
    let hpValueDiff: Bool?
    let hprpm: String?
    let hprpmDiff: Bool?
    let torqueValue: String?
    let torqueValueDiff: Bool?
    let torquerpm: String?
    let torquerpmDiff: Bool?
    let cylinders: String?
    let cylindersDiff: Bool?
    let displacement: String?
    let displacementDiff: Bool?
    let wheelbase: String?
    let wheelbaseDiff: Bool?
    let fuelEcoCity: String?
    let fuelEcoCityDiff: Bool?
    let fuelEcoHwy: String?
    let fuelEcoHwyDiff: Bool?
    let fuelEcoUnit: String?
    let fuelEcoUnitDiff: Bool?
    let fuelCapHigh: String?
    let fuelCapHighDiff: Bool?
    let fuelCapLow: String?
    let fuelCapLowDiff: Bool?
    let fuelCapUnit: String?
    let fuelCapUnitDiff: Bool?
//    let vehicleTrims: JSONAny?
//    let vehicleextColors: [VehicleextColor]?
//    let vehicleIntColors: JSONAny?
//    let vehicleOptions: [VehicleOption]?
//    let vehicleTrimsPack: [VehicleTrimsPack]?
//    let extColor: String?
//    let extid: String?
//    let intColor: String?
//    let intid: String?
//    let optionid: JSONNull?
//    let transAgent: String?
//    let trimFullname: String?
//    let trimid: Int?
//    let trimOption: String?
    enum CodingKeys: String, CodingKey {
        case id
        case vin
        case year
        case make
        case model
        case bodyType = "body_type"
        case chromeStyleid = "chrome_style_id"
        case mfrModelCode = "mfr_model_code"
        case odomReading = "odom_reading"
        case odomUnit = "odom_unit"
        case trim
        case drivetrain
        case transmission
        case engineType = "engine_type"
        case fuelType = "fuel_type"
        case extCol = "ext_col"
        case intCol = "int_col"
        case trimDiff = "trim_diff"
        case drivetrainDiff = "drivetrain_diff"
        case transmissionDiff = "transmission_diff"
        case engineTypeDiff = "engine_type_diff"
        case fuelTypeDiff = "fuel_type_diff"
        case extColDiff = "ext_col_diff"
        case intColDiff = "int_col_diff"
        case aCode = "a_code"
        case doors
        case doorsDiff = "doors_diff"
        case hpValue = "hp_value"
        case hpValueDiff = "hp_value_diff"
        case hprpm = "hp_rpm"
        case hprpmDiff = "hp_rpm_diff"
        case torqueValue = "torque_value"
        case torqueValueDiff = "torque_value_diff"
        case torquerpm = "torque_rpm"
        case torquerpmDiff = "torque_rpm_diff"
        case cylinders
        case cylindersDiff = "cylinders_diff"
        case displacement
        case displacementDiff = "displacement_diff"
        case wheelbase
        case wheelbaseDiff = "wheelbase_diff"
        case fuelEcoCity = "fuel_eco_city"
        case fuelEcoCityDiff = "fuel_eco_city_diff"
        case fuelEcoHwy = "fuel_eco_hwy"
        case fuelEcoHwyDiff = "fuel_eco_hwy_diff"
        case fuelEcoUnit = "fuel_eco_unit"
        case fuelEcoUnitDiff = "fuel_eco_unit_diff"
        case fuelCapHigh = "fuel_cap_high"
        case fuelCapHighDiff = "fuel_cap_high_diff"
        case fuelCapLow = "fuel_cap_low"
        case fuelCapLowDiff = "fuel_cap_low_diff"
        case fuelCapUnit = "fuel_cap_unit"
        case fuelCapUnitDiff = "fuel_cap_unit_diff"
//        case vehicleTrims = "vehicle_trims"
//        case vehicleextColors = "vehicle_ext_colors"
//        case vehicleIntColors = "vehicle_int_colors"
//        case vehicleOptions = "vehicle_options"
//        case vehicleTrimsPack = "vehicle_trims_pack"
//        case extColor = "ext_color"
//        case extid = "ext_id"
//        case intColor = "int_color"
//        case intid = "int_id"
//        case optionid = "option_id"
//        case transAgent = "trans_agent"
//        case trimFullname = "trim_fullname"
//        case trimid = "trim_id"
//        case trimOption = "trim_option"
    }

    func getVehicleName() -> String {
        guard let year = year, let make = make, let model = model else { return "VEHICLE" }

        return "\(year) " + "\(make) " + "\(model)"
    }
}

// MARK: - Cages

struct Cages: Codable {
    let _01: CageModel?
    let _02: CageModel?
    let _03: CageModel?
    let _04: CageModel?

    enum CodingKeys: String, CodingKey {
        case _01 = "01"
        case _02 = "02"
        case _03 = "03"
        case _04 = "04"
    }
}

// MARK: - VehicleOption

struct VehicleOption: Codable {
    let confirmedMatch: Bool?
    let option: VehicleOptionOption?

    enum CodingKeys: String, CodingKey {
        case confirmedMatch = "confirmed_match"
        case option
    }
}

// MARK: - VehicleTrimsPack

struct VehicleTrimsPack: Codable {
    let trim: VehicleTrimsPackTrim?
    let option: VehicleTrimsPackOption?
    let fullName: String?

    enum CodingKeys: String, CodingKey {
        case trim
        case option
        case fullName = "full_name"
    }
}

// MARK: - VehicleTrimsPackOption

struct VehicleTrimsPackOption: Codable {
    let optionid: Int?
    let name: String?

    enum CodingKeys: String, CodingKey {
        case optionid = "option_id"
        case name
    }
}

// MARK: - VehicleTrimsPackTrim

struct VehicleTrimsPackTrim: Codable {
    let trimid: Int?
    let name: String?

    enum CodingKeys: String, CodingKey {
        case trimid = "trim_id"
        case name
    }
}

// MARK: - VehicleextColor

struct VehicleextColor: Codable {
    let confirmedMatch: Bool?
    let extColor: JSONAny?

    enum CodingKeys: String, CodingKey {
        case confirmedMatch = "confirmed_match"
        case extColor = "ext_color"
    }
}

// MARK: - The01

struct CageModel: Codable {
    let photo: DynamicCage
    let cage: DynamicCage
    let label: DynamicCage
    let outline: DynamicCage

    enum CodingKeys: String, CodingKey {
        case photo
        case cage
        case label
        case outline
    }
}

// MARK: - Cage

struct DynamicCage: Codable {
    let isExist: Bool?
    let fallback: Bool?
    let folder: String?
    let url: String?

    enum CodingKeys: String, CodingKey {
        case isExist
        case fallback
        case folder
        case url
    }
}
