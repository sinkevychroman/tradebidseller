//
//  CreateSessionWithVehicle.swift
//  PaveModule
//
//  Created by KimDuong on 7/10/20.
//

import Foundation

struct CreateSessionVehicleResponse: Codable {
    let sessionKey: String?
    let inspectionid: String?
    let active: String?
    let stage: Int?
    let status: String?
    let redirecturl: String?
    let responseCode: JSONNull?
    let inspectionResult: JSONNull?
    let theme: String?
    let updatedAt: String?
    let createdAt: String?
    let id: Int?
    let inspectStartedAt: String?
    let dashResultsUrl: String?
    let totalPhotos: Int?
    let createdAtTime: String?

    enum CodingKeys: String, CodingKey {
        case sessionKey = "session_key"
        case inspectionid = "inspection_id"
        case active
        case stage
        case status
        case redirecturl = "redirect_url"
        case responseCode = "response_code"
        case inspectionResult = "inspection_result"
        case theme
        case updatedAt = "updated_at"
        case createdAt = "created_at"
        case id
        case inspectStartedAt = "inspect_started_at"
        case dashResultsUrl
        case totalPhotos
        case createdAtTime
    }
}

struct CreateSessionVehicleRequest: Codable {
    let vehicle: VehicleCreate?

    enum CodingKeys: String, CodingKey {
        case vehicle
    }

//    func getParameter() -> Parameters {
//        return ["vehicle": vehicle?.getParameter()]
//    }
}

public struct VehicleCreate: Codable {
    let vin: String!
    let modelYear: String!
    let vehicleMake: String!
    let vehicleModel: String!
    let vehicleBodystyle: String!
    let vehicleTrim: String!
    let vehicleTransmission: String!
    let vehicleExteriorColor: String!
    let vehicleInteriorColor: String!
    let odomReading: Int!
    let odomUnit: String!

    enum CodingKeys: String, CodingKey {
        case vin
        case modelYear = "model_year"
        case vehicleMake = "vehicle_make"
        case vehicleModel = "vehicle_model"
        case vehicleBodystyle = "vehicle_bodystyle"
        case vehicleTrim = "vehicle_trim"
        case vehicleTransmission = "vehicle_transmission"
        case vehicleExteriorColor = "vehicle_exterior_color"
        case vehicleInteriorColor = "vehicle_interior_color"
        case odomReading = "odom_reading"
        case odomUnit = "odom_unit"
    }

//    func getParameter() -> Parameters {
//        return [CodingKeys.vin.rawValue: vin!,
//                CodingKeys.modelYear.rawValue: modelYear!,
//                CodingKeys.vehicleMake.rawValue: vehicleMake!,
//                CodingKeys.vehicleModel.rawValue: vehicleModel!,
//                CodingKeys.vehicleBodystyle.rawValue: vehicleBodystyle!,
//                CodingKeys.vehicleTrim.rawValue: vehicleTrim!,
//                CodingKeys.vehicleTransmission.rawValue: vehicleTransmission!,
//                CodingKeys.vehicleExteriorColor.rawValue: vehicleExteriorColor!,
//                CodingKeys.vehicleInteriorColor.rawValue: vehicleInteriorColor!,
//                CodingKeys.odomReading.rawValue: odomReading!,
//                CodingKeys.odomUnit.rawValue: odomUnit!]
//    }
}
