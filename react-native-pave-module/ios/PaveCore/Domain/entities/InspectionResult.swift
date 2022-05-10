//
//  InspectionResult.swift
//  PAVE
//
//  Created by KimDuong on 6/10/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public struct InspectionResult {
   
    var vehicle: VehicleInspection

    var vehicleThumnailUrl: String = ""

    var sessionKey: String = ""

    var inspectionId: String = ""

    var license: String = ""
        
    var photoStatus: [PhotoStatus]
        
    var damageAreas: [Cage: DamageArea] = [Cage: DamageArea]()
    
    var sellerDisclosures : JSONAny?
    
    var sellerAnnouncements : JSONAny?
    
    var grading : JSONAny?
    
    var response : Response?
}

public struct DamageArea {
    var cage: Cage!
    var detectedDamages: [DetectedDamage]! = [DetectedDamage]()
    var photoUrl: String?
}
