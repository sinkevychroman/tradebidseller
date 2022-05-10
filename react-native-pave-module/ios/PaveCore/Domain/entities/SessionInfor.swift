//
//  SessionInfor.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation
open  class SessionInfo {
    var active: Bool
    var redirectURL: String
    public  var sessionProcessing: SessionProcessing? = nil
    var sessionKey, startDate, status: String
    
    
    
    init(active: Bool, redirectURL: String, sessionProcessing: SessionProcessing? = nil, sessionKey: String, startDate: String, status: String) {
        self.active = active
        self.redirectURL = redirectURL
        self.sessionProcessing = sessionProcessing
        self.sessionKey = sessionKey
        self.startDate = startDate
        self.status = status
    }
    
}
