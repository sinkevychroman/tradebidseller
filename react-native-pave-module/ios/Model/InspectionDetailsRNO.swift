//
//  InspectionDetailsRNO.swift
//  PaveModule
//
//  Created by KimDuong on 7/16/20.
//

import Foundation
struct InspectionDeitalsRNO: Codable {
    let inspectionID: String!
    let sessionID: String!
    let status: String!
    var cages: [CageRNO]! = [CageRNO]()
    
    var cageDetected : Bool = false
    
    init(response: InspectionDetailsResponse) {
        inspectionID = response.inspectionID ?? ""
        sessionID = response.sessionID ?? ""
        status = response.status ?? ""
        
        guard let vinDecode = response.vinDecode  else {
            return
        }
        
        if  vinDecode {
            self.cageDetected = true
        } else if  ( response.vehicle != nil || ((response.vehicle?.vin) != nil))  {
            self.cageDetected = true
            return
        }
       
        response.cages.flatMap { (cage) -> Void in
            
            if let cage = cage._01 {
                self.cages.append(CageRNO(name: Cage.LEFT_VIEW.getName(),
                                          photo: cage.photo.url,
                                          cage: cage.cage.url,
                                          label: cage.label.url,
                                          outline: cage.outline.url))
            }
            
            if let cage = cage._02 {
                self.cages.append(CageRNO(name: Cage.FRONT_VIEW.getName(),
                                          photo: cage.photo.url,
                                          cage: cage.cage.url,
                                          label: cage.label.url,
                                          outline: cage.outline.url))
            }
            
            if let cage = cage._03 {
                self.cages.append(CageRNO(name: Cage.RIGHT_VIEW.getName(),
                                          photo: cage.photo.url,
                                          cage: cage.cage.url,
                                          label: cage.label.url,
                                          outline: cage.outline.url))
            }
            
            if let cage = cage._04 {
                self.cages.append(CageRNO(name: Cage.BACK_VIEW.getName(),
                                          photo: cage.photo.url,
                                          cage: cage.cage.url,
                                          label: cage.label.url,
                                          outline: cage.outline.url))
            }
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case inspectionID
        case sessionID
        case status
        case cages
        case cageDetected
    }
}

struct CageRNO: Codable {
    let name: String!
    let photo: String!
    let cage: String!
    let label: String!
    let outline: String!
    
    enum CodingKeys: String, CodingKey {
        case name
        case photo
        case cage
        case label
        case outline
    }
}
