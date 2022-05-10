
//
//  File.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public enum Cage: Int {
    case VIN_CODE = 1
    case CAR_INTERIOR_LEFT_VIEW = 2
    case ODOMETER = 3
    case LEFT_VIEW = 4
    case FRONT_AND_SIDE_LEFT_VIEW = 10
    case FRONT_VIEW = 5
    case FRONT_AND_SIDE_RIGHT_VIEW = 11
    case RIGHT_VIEW = 7
    case BACK_AND_SIDE_RIGHT = 12
    case BACK_VIEW = 8
    case BACK_AND_SIDE_LEFT = 13
    case WIND_SHIELD = 9
    case TIRE = 6

    case ODOMETER_INPUT = 100
    case VIN_CODE_INPUT = 101
    case UNKNOWN = -1

//    01 - VIN
//    02 - INTERIOR
//    03 - ODOMETER
//    04 - LEFT VIEW
//    05 - FRONT LEFT
//    06 - FRONT VIEW
//    07 - FRONT RIGHT
//    08 - RIGHT VIEW
//    09 - REAR RIGHT
//    10 - REAR VIEW
//    11 - REAR LEFT
//    12 - WINDSHIELD
//    13 - TIRE

    static var allCases: [Cage] {
        // important : in the order of declaration

        return [VIN_CODE,
                CAR_INTERIOR_LEFT_VIEW,
                ODOMETER,
                LEFT_VIEW,
                FRONT_AND_SIDE_LEFT_VIEW,
                FRONT_VIEW, FRONT_AND_SIDE_RIGHT_VIEW,
                RIGHT_VIEW,
                BACK_AND_SIDE_RIGHT,
                BACK_VIEW,
                BACK_AND_SIDE_LEFT,
                WIND_SHIELD,
                TIRE]
    }

    static func getAllCages() -> [Cage] {
        return Cage.allCases
    }

    func getName() -> String {
        switch self {
        case .VIN_CODE:
            return "VIN"
        case .CAR_INTERIOR_LEFT_VIEW:
            return "INTERIOR"

        case .ODOMETER:
            return "ODOMETER"

        case .LEFT_VIEW:
            return "LEFT VIEW"

        case .FRONT_AND_SIDE_LEFT_VIEW:
            return "FRONT LEFT"

        case .FRONT_VIEW:
            return "FRONT VIEW"

        case .FRONT_AND_SIDE_RIGHT_VIEW:
            return "FRONT RIGHT"

        case .RIGHT_VIEW:
            return "RIGHT VIEW"

        case .BACK_AND_SIDE_RIGHT:
            return "REAR RIGHT"

        case .BACK_VIEW:
            return "REAR VIEW"

        case .BACK_AND_SIDE_LEFT:
            return "REAR LEFT"

        case .WIND_SHIELD:
            return "WINDSHIELD"

        case .TIRE:
            return "TIRE"

        case .ODOMETER_INPUT:
            return "ODOMETER_INPUT"

        case .VIN_CODE_INPUT:
            return "VIN_CODE_INPUT"

        case .UNKNOWN:
            return "UNKNOWN"
        }
    }

    static func getCagesWithTheme(theme: PaveTheme) -> [Cage] {
        switch theme {
        case .DEFAULT:
            return getAllCages()

        case .LITE:
            return [VIN_CODE, ODOMETER]
       
        case .RMS:
            return getAllCages()
        }
    }
}
