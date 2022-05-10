//
//  InspectingSession.swift
//  PAVE
//
//  Created by KimDuong on 6/4/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

open class SessionInspection {
    var inspectionID: String?
    
    var vehicleName : String?

    var status: InspectionStatus?

    var ttw: Int = 108

    var vinDecode: Bool? {
        willSet {
            if !newValue! {
                needRecapturePhotos.append(CageRecapture(cage: Cage.VIN_CODE_INPUT, message: "".uppercased()))
            } else {
            }
        }
    }

    var rejectOdom: Bool? {
        willSet {
            if newValue! {
                needRecapturePhotos.append(CageRecapture(cage: Cage.ODOMETER_INPUT, message: ""))
            }
        }
    }

    var vehicleNotNil: Bool? = false {
        willSet {
            if !newValue! {
                needRecapturePhotos.append(CageRecapture(cage: Cage.VIN_CODE_INPUT, message: "".uppercased()))

            }
        }
    }

    var needRecapturePhotos: [CageRecapture] = [CageRecapture]()
}

struct CageRecapture {
    let cage: Cage
    let message: String
}

enum InspectionStatus : String {
    case INQUEUE = "IN-QUEUE"
    case PROCESSING = "PROCESSING"
    case FINISHED = "FINISHED"
    case CANCELLED = "CANCELLED"
}
