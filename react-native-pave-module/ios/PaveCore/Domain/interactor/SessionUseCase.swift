//
//  SessionUseCase.swift
//  PAVE
//
//  Created by KimDuong on 4/27/20.
//  Copyright © 2020 Discovery Loft. All rights reserved.
//

import Foundation

public protocol SessionUseCaseProtocol {
    func generateSession(generation: GenerationSession, completion: @escaping (_ sessionInfo: SessionInfo?) -> Void) -> Void
    
    func startSession(sessionInfo: SessionInfo, complete: @escaping (Bool) -> Void) -> Void
    
    func stopSession(sessionInfo: SessionInfo, complete: @escaping (Bool) -> Void) -> Void
    
//    func confirmSession(session: SessionProcessing) -> Void
    
    func getInspectionDetail(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void)
    
    func getInspectionProgress(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void)
    
    func setOdometer(sessionProcessing: SessionProcessing, odometer: Int, unit: DistanceUnit, complete: @escaping (Bool) -> Void)
    
    func setVinCode(sessionProcessing: SessionProcessing, vincode: String, complete: @escaping (Bool) -> Void)
    
    func getSessionProcess(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void)
}

class SessionInteractor {
    lazy var sessionManagement = SessionManagementWorker()
    lazy var cdSessionCreate = CDSessionCreate()
    lazy var cdSession = CDSession()
    
    init() {
        cdSessionCreate.createTable()
        cdSession.createTable()
    }
}

protocol SessionInteractorSupportSDK {
    func createSession(generation: GenerationSession, completion: @escaping (_ sessionInfo: SessionInfo?) -> Void) -> Void
    
    func getSessionProcess(sessionKey: String, complete: @escaping (Bool, GetSessionProgressResponse?) -> Void)
    
    func getInspectionDetail(sessionKey: String, apiKey: String, complete: @escaping (Bool, InspectionDetailsResponse?) -> Void)
    
    func getInspectionProgress(sessionKey: String, apiKey: String, complete: @escaping (Bool, InspectionProgressResponse?) -> Void)
    
    func completeSession(sesionKey: String, complete: @escaping (Bool) -> Void)
    
    func createNewSessionWithVehicle(apiKey: String, vehicle: VehicleCreate?, completion: @escaping (_ sessionInfo: SessionInfo?) -> Void)
    
    func startSession(sessionKey: String, complete: @escaping (Bool) -> Void)
    
    func getListSession(completion: @escaping (_ sessionDBEntitys: [SessionDBEntity]) -> Void)
}

extension SessionInteractor: SessionUseCaseProtocol {
    func completeSession(sesionKey: String, complete: @escaping (Bool) -> Void) {
        sessionManagement.stopSession(StopSessionRequest(sessionKey: sesionKey)) { result, error in
            guard let response = result else { return }
            switch response {
            case .Success(result: let result):
                complete(true)
            case .Failure(error: let error):
                complete(false)
            }
        }
    }
    
    func getSessionProcess(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void) {}
    
    public func setOdometer(sessionProcessing: SessionProcessing, odometer: Int, unit: DistanceUnit, complete: @escaping (Bool) -> Void) {
        sessionManagement.setOdometerForSession(InputOdoMeterRequest(odom_unit: unit, odom_reading: odometer, sessionKey: sessionProcessing.sesion?.sessionKey, authorization: ConfigNetworkDev.AUTHORIZATION_TOKEN)) { result, _ in
            guard let response = result else { return }
            switch response {
            case .Success(result: _):
                complete(true)
                
            case .Failure(error: _):
                complete(false)
            }
        }
    }
    
    public func setVinCode(sessionProcessing: SessionProcessing, vincode: String, complete: @escaping (Bool) -> Void) {
        sessionManagement.setVincodeForSession(InputVinCodeRequest(sessionKey: sessionProcessing.sesion?.sessionKey, vinCode: vincode)) { result, _ in
            guard let response = result else { return }
            switch response {
            case .Success(result: _):
                complete(true)
                
            case .Failure(error: _):
                complete(false)
            }
        }
    }
    
    public func getInspectionProgress(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void) {}
    
    public func getInspectionDetail(sessionProcessing: SessionProcessing, complete: @escaping (Bool) -> Void) {
        sessionManagement.getInspectionDetails(InspectionDetailsRequest(sessionKey: sessionProcessing.sesion?.sessionKey, authorization: ConfigNetworkDev.AUTHORIZATION_TOKEN)) {
            result, _ in
            guard let response = result else { return }
            
            switch response {
            case .Success(result: let result):
                
                guard let inspectionID = result.inspectionID,
                    let status = result.status,
                    sessionProcessing.sesion?.sessionKey == result.sessionID
                
                else { return
                    complete(false)
                }
                let inspecting = sessionProcessing.inspecting!
                sessionProcessing.process = Process.INSPECTING
                inspecting.status = InspectionStatus(rawValue: status)
                inspecting.inspectionID = inspectionID
                
                if let vihicleDecode = result.vinDecode {
                    inspecting.vinDecode = vihicleDecode
                } else {
                    // case nill
                    inspecting.vinDecode = false
                }
                
                if let rejectOdom = result.rejectOdom {
                    inspecting.rejectOdom = rejectOdom
                }
                
                complete(true)
                
            case .Failure(error: _):
                complete(false)
            }
        }
    }
    
    public func generateSession(generation: GenerationSession, completion: @escaping (_ sessionInfo: SessionInfo?) -> Void) {
        sessionManagement.generateSession(GenerateSessionRequest(redirect_url: generation.urlDirect, apiKey: generation.apiKey)) { result, _ in
            
            if let response = result {
                switch response {
                case .Success(result: let result):
                    let sessionInfo = SessionInfo(active: result.active!, redirectURL: result.redirectURL!, sessionKey: result.sessionKey!, startDate: result.startDate!, status: result.status!)
                    completion(sessionInfo)
                case .Failure(error: _):
                    completion(nil)
                }
            }
        }
    }
    
    public func startSession(sessionInfo: SessionInfo, complete: @escaping (Bool) -> Void) {
        if sessionInfo.sessionProcessing != nil {
            complete(true)
            
            return
        }
        
        sessionManagement.startSession(StartSessionRequest(sessionKey: sessionInfo.sessionKey)) { result, _ in
            if let response = result {
                switch response {
                case .Success(result: let result):
                    complete(true)
                case .Failure(error: _):
                    complete(false)
                }
            }
        }
    }
    
    public func stopSession(sessionInfo: SessionInfo, complete: @escaping (Bool) -> Void) {
        sessionManagement.stopSession(StopSessionRequest(sessionKey: sessionInfo.sessionKey)) { result, _ in
            if let response = result {
                switch response {
                case .Success(result: _):
                    complete(true)
                case .Failure(error: _):
                    complete(false)
                }
            }
        }
    }
}

extension SessionInteractor: SessionInteractorSupportSDK {
    
    
    func getListSession(completion: @escaping ([SessionDBEntity]) -> Void) {
       let list =  cdSession.query()
        completion(list)
    }
    
    func startSession(sessionKey: String, complete: @escaping (Bool) -> Void) {
        sessionManagement.startSession(StartSessionRequest(sessionKey: sessionKey)) { result, error in
            guard let response = result else { return }
            
            switch response {
            case .Success(result: let result):
                self.cdSession.save(entity: SessionDBEntity(id: String(describing: result.id.valueOrEmpty),
                                                            session_key: result.sessionKey.valueOrEmpty,
                                                            inspection_id: result.inspectionid.valueOrEmpty,
                                                            active: result.active.valueOrEmpty,
                                                            theme: result.theme.valueOrEmpty,
                                                            created_at: result.createdAt.valueOrEmpty,
                                                            inspect_started_at: result.inspectStartedAt.valueOrEmpty,
                                                            inspection_result: "\(String(describing: result.inspectionResult))",
                                                            status: result.status.valueOrEmpty))
                complete(true)
            case .Failure(error: let error):
                complete(false)
            }
        }
    }
    
    func getSessionProcess(sessionKey: String, complete: @escaping (Bool, GetSessionProgressResponse?) -> Void) {
        sessionManagement.getSessionProgress(GetSessionProgressRequest(sessionKey: sessionKey)) { result, _ in
            guard let response = result else { return }
            switch response {
            case .Success(result: let result):
                complete(true, result)
            case .Failure(error: let error):
                complete(false, nil)
            }
        }
    }
    
    func getInspectionProgress(sessionKey: String, apiKey: String, complete: @escaping (Bool, InspectionProgressResponse?) -> Void) {
        sessionManagement.getInspectionProgress(InspectionProgressRequest(sessionKey: sessionKey, authorization: apiKey)) { result, error in
            guard let response = result else { return }
            switch response {
            case .Success(result: let result):
                complete(true, result)
            case .Failure(error: let error):
                complete(false, nil)
            }
        }
    }
    
    func getInspectionDetail(sessionKey: String, apiKey: String, complete: @escaping (Bool, InspectionDetailsResponse?) -> Void) {
        sessionManagement.getInspectionDetails(InspectionDetailsRequest(sessionKey: sessionKey, authorization: apiKey)) { result, _ in
            guard let response = result else { return }
            switch response {
            case .Success(result: let result):
                complete(true, result)
            case .Failure(error: let error):
                complete(false, nil)
            }
        }
    }
    
    func createSession(generation: GenerationSession, completion: @escaping (SessionInfo?) -> Void) {
        sessionManagement.generateSession(GenerateSessionRequest(redirect_url: generation.urlDirect, apiKey: generation.apiKey)) { result, error in
            guard let response = result else { return }
            switch response {
            case .Success(result: let result):
                
                let sessionInfo = SessionInfo(active: result.active ?? false, redirectURL: result.redirectURL ?? "", sessionKey: result.sessionKey!, startDate: "", status: result.status!)
                
                self.cdSessionCreate.save(entity: SessionCreateDBEnity(session_key: result.sessionKey!, status: result.status.valueOrEmpty, active: result.active ?? false, redirect_url: result.redirectURL.valueOrEmpty, start_date: result.startDate.valueOrEmpty))
                completion(sessionInfo)
            case .Failure(error: let error):
                completion(nil)
            }
        }
    }
    
    public func createNewSessionWithVehicle(apiKey: String, vehicle: VehicleCreate?, completion: @escaping (_ sessionInfo: SessionInfo?) -> Void) {
        let request = CreateSessionVehicleRequest(vehicle: vehicle)
        
        sessionManagement.createNewSessionWithVehicle(apiKey: apiKey, request) { result, error in
            
            guard let response = result else { return }
            
            switch response {
            case .Success(result: let result):
                guard let _ = result.sessionKey else {
                    return
                }
                
                let sessionInfo = SessionInfo(active: result.active == "1" ? true : false, redirectURL: result.redirecturl!, sessionKey: result.sessionKey!, startDate: "", status: result.status!)
                
                let session = Session(active: 1,
                                      additionalProperties: nil,
                                      createdAt: result.createdAt!,
                                      id: result.id!,
                                      inspectStartedAt: result.inspectStartedAt!,
                                      inspectionID: result.inspectionid!,
                                      redirectURL: result.redirecturl!,
                                      sessionKey: result.sessionKey!,
                                      stage: result.stage!,
                                      status: result.status!,
                                      theme: result.theme!,
                                      updatedAt: result.updatedAt!)
                
                let sessionProcess = SessionProcessing(sesion: session)
                
                sessionInfo.sessionProcessing = sessionProcess
                
                completion(sessionInfo)
                
            case .Failure(error: let error):
                
                break
            }
        }
    }
}

public struct GenerationSession {
    let apiKey: String
    let urlDirect: String
}
