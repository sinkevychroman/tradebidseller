//
//  SessionProcessing.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

open class SessionProcessing {
    var sesion: Session?
    
    var process: Process?
    
    var cage: [Cage]!
    
    var indexOfCage: Int!
    
    var uploadPhotoDone: UploadPhotoDoneModel!
    
    var inspecting : SessionInspection!
    
    var dynamicCage : [Cage:String] = [Cage:String]()
    
    init(sesion: Session) {
        self.sesion = sesion
        self.process = .STARTED_SESSION
        self.cage = Cage.getCagesWithTheme(theme: PaveTheme(rawValue: sesion.theme ?? PaveTheme.DEFAULT.rawValue)!)
        self.indexOfCage = 0
        self.uploadPhotoDone = UploadPhotoDoneModel()
        self.inspecting = SessionInspection()
    }
    
    func getCageInstace() -> Cage {
        return cage[indexOfCage]
    }
    
    func getNextCage() -> Cage? {
        if indexOfCage == cage.count - 1 {
            indexOfCage = 0
            return nil
        }
        
        indexOfCage += 1
        return getCageInstace()
    }
}
