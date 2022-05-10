//
//  PaveManager.swift
//  PAVE
//
//  Created by kakashi on 3/17/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation
import UIKit

public typealias complete = (Bool) -> ()

open class PaveManager {
    public static let shared = PaveManager()
    
    fileprivate var apiKey: String!
    
    var sessionInteractor: SessionInteractor?
    
    var sessionInfoInstance: SessionInfo?
    
    private var photoInteractor: PhotoUseCaseProtocol?
    
    private var reportInteractor: InspectionReportInteractor?
    
    public func initialize(apiKey: String!) {
        PaveManager.shared.apiKey = apiKey
        PaveManager.shared.initialize(mode: .Production)
    }
    
    public func getSessionInstance() -> SessionInfo? {
        return PaveManager.shared.sessionInfoInstance
    }
    
    public func initialize(mode: PaveManagerMode = .Developement) {
        switch mode {
        case .Production:
            sessionInteractor = SessionInteractor()
            photoInteractor = PhotoInteractor()
            reportInteractor = InspectionReportInteractor()
            
        case .Developement:
            apiKey = ConfigNetworkDev.API_KEY_GENERATION_SESSION
            sessionInteractor = SessionInteractor()
            photoInteractor = PhotoInteractor()
            reportInteractor = InspectionReportInteractor()
        }
    }
    
    public func createNewSession(urlRedirect: String, completion: @escaping complete = doNothing) {
        sessionInteractor?.generateSession(generation: GenerationSession(apiKey: apiKey, urlDirect: urlRedirect)) {
            sessionInfo in
            if sessionInfo != nil {
                self.sessionInfoInstance = sessionInfo
                completion(true)
                
            } else {
                completion(false)
            }
        }
    }
    
    public func startSessionInstance(completion: @escaping (Bool) -> () = doNothing) {
        sessionInteractor?.startSession(sessionInfo: sessionInfoInstance!) { iscomplete in
            if iscomplete {
                completion(true)
            }
        }
    }
    
    public func getInspectionDetailInstanceSession(completion: @escaping (Bool) -> () = doNothing) {
        guard let _ = sessionInfoInstance?.sessionProcessing else {
            completion(false)
            
            return
        }
    }
    
    public func getInspectionProgressInstanceSession(completion: @escaping (Bool) -> () = doNothing) {
        guard let sessionProcessing = sessionInfoInstance?.sessionProcessing else { return
            completion(false)
        }
        
        sessionInteractor?.getInspectionProgress(sessionProcessing: sessionProcessing, complete: { isComplete in
            completion(isComplete)
        })
    }
    
    public func setVinCodeForInstanceSession(vincode: String!, completion: @escaping (Bool) -> () = doNothing) {
        guard let sessionProcessing = sessionInfoInstance?.sessionProcessing else { return
            completion(false)
        }
        sessionInteractor?.setVinCode(sessionProcessing: sessionProcessing, vincode: vincode, complete: { isComplete in
            completion(isComplete)
            
        })
    }
    
    public func setOdometerForInstanceSession(odmeter: Int!, unit: DistanceUnit!, completion: @escaping (Bool) -> () = doNothing) {
        guard let sessionProcessing = sessionInfoInstance?.sessionProcessing else { return
            completion(false)
        }
        sessionInteractor?.setOdometer(sessionProcessing: sessionProcessing, odometer: odmeter, unit: unit, complete: { isComplete in
            completion(isComplete)
        })
    }
    
    public func uploadPhoto(photo: String!, completion: @escaping complete = doNothing) {
        guard let photoCode = sessionInfoInstance?.sessionProcessing?.getCageInstace().rawValue,
            let sessionProcessing = sessionInfoInstance?.sessionProcessing,
            let sessionKey = sessionInfoInstance?.sessionKey
        else {
            completion(false)
            return
        }
        
        let photoUpload = PhotoUpload(sessionKey: sessionKey, image: photo, photoCode: photoCode)
        sessionProcessing.process = Process.UPLOAD_SESSION_PHOTO
        photoInteractor?.uploadPhoto(photoUpload: photoUpload, sessionProcessing: sessionProcessing, completion: { isComplete in
            completion(isComplete)
        })
    }
    
    public func stopSessionInstance(completion: @escaping (Bool) -> () = doNothing) {
        sessionInteractor?.stopSession(sessionInfo: sessionInfoInstance!) { iscomplete in
            if iscomplete {
                completion(true)
            } else {
                completion(false)
            }
        }
    }
    
    public func getInspectionResultSessionInstance(completion _: @escaping (Bool) -> () = doNothing) {}
    
    public func getInspectionResultSession(sessionKey: String, completion _: @escaping (Bool) -> () = doNothing) {
        reportInteractor?.getReportDamage(sessionKey: sessionKey, apiKey: apiKey) { _ in
        }
    }
}

public func doNothing(_: Bool) {}

extension PaveManager: SupportReactNative {
    func getLocalSessionList(_ completion: @escaping completeGetSessions) {
        sessionInteractorSDK.getListSession { (sessionDBEntitys) in
            completion(sessionDBEntitys)
        }
    }
    
    func startSession(sessionKey: String, _ completion: @escaping completeSessionHandler) {
        sessionInteractorSDK.startSession(sessionKey: sessionKey) { (isSuccess) in
            completion(isSuccess)
        }
    }
    
    
    
    var sessionInteractorSDK: SessionInteractorSupportSDK {
        return getSessionInteractorSupportSDK(sessionInteractor!)
    }
    
    func getSessionInteractorSupportSDK(_: SessionInteractor) -> SessionInteractorSupportSDK {
        return sessionInteractor!
    }
    
    func completeSession(sessionKey: String, _ completion: @escaping completeSessionHandler) {
        sessionInteractorSDK.completeSession(sesionKey: sessionKey, complete: { isSuccess in
            completion(isSuccess)
        })
    }
    
    func createSession(redirectUrl: String, _ completion: @escaping completeCreateSession) {
        sessionInteractorSDK.createSession(generation: GenerationSession(apiKey: apiKey, urlDirect: redirectUrl), completion: { SessionInfo in
            guard let sessionInfo = SessionInfo else { return }
            completion(sessionInfo)
        })
    }
    
    func createSessionWithVehicle(vehicle: VehicleCreate, _ completion: @escaping completeUploadPhoto) {
        sessionInteractorSDK.createNewSessionWithVehicle(apiKey: apiKey, vehicle: vehicle, completion: { sessionInfo in
            if sessionInfo != nil {
                self.sessionInfoInstance = sessionInfo
                completion(true)
                
            } else {
                completion(false)
            }
             })
    }
    
    func getInspectionProgress(sessionKey: String, _ completion: @escaping completeInspectionProgress) {
        let authentication = ConfigNetworkDev.AUTHORIZATION_TOKEN
        sessionInteractorSDK.getInspectionProgress(sessionKey: sessionKey, apiKey: authentication, complete: { bool, response in
            if bool {
                completion(response!)
            }
        })
    }
    
    func getInspectionDetails(sessionKey: String, _ completion: @escaping completeInspectionDetails) {
        let authentication = ConfigNetworkDev.AUTHORIZATION_TOKEN
        sessionInteractorSDK.getInspectionDetail(sessionKey: sessionKey, apiKey: authentication, complete: { isComplete, inspectionDetailsResponse in
            if isComplete {
                completion(inspectionDetailsResponse!)
            }
        })
    }
    
    func getSessionResults(sessionKey: String, _ completion: @escaping completeSesionResults) {
        reportInteractor?.getReportDamage(sessionKey: sessionKey, apiKey: apiKey) { inspectionResult in
            
            completion(inspectionResult)
        }
    }
    
    public func uploadPhoto(photo: String!, sessionKey: String, photoCode: String, _ completion: @escaping complete = doNothing) {
        if let photoCode = Int(photoCode) {
            photoInteractor?.uploadPhoto(photoUpload: PhotoUpload(sessionKey: sessionKey, image: photo, photoCode: photoCode), completion: { isSuccess in
                completion(isSuccess)
            })
        }
    }
}

protocol SupportReactNative {
    var sessionInteractorSDK: SessionInteractorSupportSDK { get }
    
    func createSessionWithVehicle(vehicle: VehicleCreate, _ completion: @escaping completeUploadPhoto)
    
    func createSession(redirectUrl: String, _ completion: @escaping completeCreateSession)
    
    func uploadPhoto(photo: String!, sessionKey: String, photoCode: String, _ completion: @escaping complete)
    
    func getInspectionProgress(sessionKey: String, _ completion: @escaping completeInspectionProgress)
    
    func getInspectionDetails(sessionKey: String, _ completion: @escaping completeInspectionDetails)
    
    func getSessionResults(sessionKey: String, _ completion: @escaping completeSesionResults)
    
    func completeSession(sessionKey: String, _ completion: @escaping completeSessionHandler)
    
    func getSessionInteractorSupportSDK(_ interactor: SessionInteractor) -> SessionInteractorSupportSDK
    
    func startSession(sessionKey : String, _ completion: @escaping completeSessionHandler)
    
    func getLocalSessionList(_ completion: @escaping completeGetSessions)
}

public typealias completeUploadPhoto = (Bool) -> ()

public typealias completeInspectionProgress = (InspectionProgressResponse) -> ()

public typealias completeInspectionDetails = (InspectionDetailsResponse) -> ()

public typealias completeSesionResults = (InspectionResult) -> ()

public typealias completeSessionHandler = (Bool) -> ()

public typealias completeCreateSession = (SessionInfo) -> ()

public typealias completeStartSession = (Bool) -> ()

public typealias completeGetSessions = ([SessionDBEntity]) -> Void



public enum PaveManagerMode {
    case Production, Developement
}
