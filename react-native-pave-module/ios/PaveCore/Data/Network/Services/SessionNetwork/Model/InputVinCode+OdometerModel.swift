//
//  File.swift
//  PAVE
//
//  Created by KimDuong on 6/6/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

struct InputVinCodeRequest {
    let sessionKey : String!
    let vinCode : String!
    
    
//    func getParameter() -> Parameters {
//        return ["session_key": sessionKey!,
//                "vin" : vinCode!
//        ]
//    }
}

struct InputVinCodeResponse : Codable {
    let status: String
    let message: String
    let vin: String

    enum CodingKeys: String, CodingKey {
        case status = "status"
        case message = "message"
        case vin = "vin"
    }
}


struct InputOdoMeterRequest {
    let odom_unit : DistanceUnit!
    let odom_reading : Int!
    let sessionKey : String!
    
    let authorization : String!
    
//    func getParameter() -> Parameters {
//        return ["odom_unit": odom_unit!.rawValue,
//                "odom_reading" : odom_reading!
//        ]
//    }
}

public enum DistanceUnit : String {
    case MILES = "MILES"
    case KILOMETERS = "KILOMETERS"
}
