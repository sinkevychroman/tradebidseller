//
//  Process.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public enum Process {
    case GENERATED_SESSION
    case STARTED_SESSION
    case STOP_SESSION
    case CONFIRM_SESSION
    case UPLOAD_SESSION_PHOTO
    case STOP_UPLOAD_SESSION_PHOTO
    case DISCLOSURES_SESSION
    case ANNOUNCEMENT_SESSION
    case UNKNOWN
    case INSPECTING

    func getState() -> Process {
        return self
    }

//    func nextState() -> Process {
//        switch self {
//        case .GENERATED_SESSION:
//            return .STARTED_SESSION
//
//        case .STARTED_SESSION:
//            return Process.START_UPLOAD_SESSION_PHOTO
//
//        case .STOP_SESSION: break
//
//        case .CONFIRM_SESSION:
//            return Process.STOP_SESSION
//
//        case .START_UPLOAD_SESSION_PHOTO:
//            return Process.STOP_UPLOAD_SESSION_PHOTO
//
//        case .DISCLOSURES_SESSION:
//            return Process.ANNOUNCEMENT_SESSION
//
//        case .ANNOUNCEMENT_SESSION: break
//
//        case .STOP_UPLOAD_SESSION_PHOTO:
//            return Process.DISCLOSURES_SESSION
//
//        case .UNKNOWN:
//            return .UNKNOWN
//        }
//        return .UNKNOWN
//    }
}
