//
//  TestSwift.swift
//  PaveModule
//
//  Created by KimDuong on 7/6/20.
//

import Foundation

typealias CallBackReactNative = RCTResponseSenderBlock
protocol ReactNativeExport {
    func createSessionWithVehicle(_ vin: String,
                                  modelYear: String,
                                  vehicleMake: String,
                                  vehicleModel: String,
                                  vehicleBodystyle: String,
                                  vehicleTrim: String,
                                  vehicleTransmission: String,
                                  vehicleExteriorColor: String,
                                  vehicleInteriorColor: String,
                                  odomReading: String,
                                  odomUnit: String,
                                  callback: @escaping CallBackReactNative) -> Void
    
    func createSession(_ redirectUrl: String, callback: @escaping CallBackReactNative) -> Void
    
    func uploadPhoto(_ sessionKey: String, photoCode: String, photoURL: String, callback: @escaping CallBackReactNative) -> Void
    
    func getInspectionDetails(sessionKey: String, callback: @escaping CallBackReactNative) -> Void
    
    func getInspectionProgress(sessionKey: String, callback: @escaping CallBackReactNative) -> Void
    
    func getReportDamage(sessionKey: String, callback: @escaping CallBackReactNative) -> Void
    
    func completeSession(sessionKey: String, callback: @escaping CallBackReactNative) -> Void
    
    func startSession(sessionKey: String, callback: @escaping CallBackReactNative) -> Void
    
    func getSessionListFromLocal(callback: @escaping CallBackReactNative) -> Void
}

@objc(PaveModule)
class PaveModule: NSObject {
    private var paveManager: PaveManager?
    
    @objc
    func initialize() {
        PaveManager.shared.initialize(mode: PaveManagerMode.Developement)
        self.paveManager = PaveManager.shared

    }
    
    @objc(initializeWithKey:)
    func initializeWithKey(apiKey: String) {
        print("initializeWithKey : \(apiKey)")
        self.paveManager = PaveManager.shared
        self.paveManager?.initialize(apiKey: apiKey)

    }
    
    func checkImageFileExist(fileName: String, fileURL: String) -> (Bool, String?) {

        var path = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true)[0] as String
        let urlNew = fileURL.replacingOccurrences(of: "file://", with: "")
        path.append("/Camera")
        let url = NSURL(fileURLWithPath: path)
        if let pathComponent = url.appendingPathComponent(fileName) {
            let filePath = pathComponent.path
            let fileManager = FileManager.default
            if fileManager.fileExists(atPath: filePath) {
                return (true, filePath)
            } else {
                if fileManager.fileExists(atPath: urlNew) {
                    return (true, urlNew)
                }
                return (false, nil)
            }
        } else {
            return (false, nil)
        }
    }
}

extension PaveModule: ReactNativeExport {
    @objc(getSessionListFromLocal:)
    func getSessionListFromLocal(callback: @escaping CallBackReactNative) {
        self.paveManager?.getLocalSessionList { sessionDBEntitys in
            let list = sessionDBEntitys.map { (sessionDBEntity) -> SessionRNO in
                SessionRNO(id: sessionDBEntity.id, session_key: sessionDBEntity.session_key, inspection_id: sessionDBEntity.inspection_id, status: sessionDBEntity.status)
            }
            
            let object = SessionListRNO.init(value: list)
            
            if let dictionary = try? DictionaryEncoder().encode(object) {
                callback([dictionary, false])
            } else {
                callback([NSNull(), true])
            }
            
        }
    }
    
    @objc(startSession:callback:)
    func startSession(sessionKey: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.startSession(sessionKey: sessionKey) { isComplete in
            if isComplete {
                callback([true, false]) // (res, err)
            } else {
                callback([false, true])
            }
        }
    }
    
    @objc(createSession:callback:)
    func createSession(_ redirectUrl: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.createSession(redirectUrl: redirectUrl) { value in
            let createSessionRNO = SessionCreateRNO(sessionKey: value.sessionKey, status: value.status, active: value.active, redirect_url: value.redirectURL, start_date: value.startDate)
            
            if let dictionary = try? DictionaryEncoder().encode(createSessionRNO) {
                print(dictionary)
                callback([dictionary, false])
            } else {
                callback([NSNull(), true])
            }
        }
    }
    
    @objc(completeSession:callback:)
    func completeSession(sessionKey: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.completeSession(sessionKey: sessionKey) { isSuccess in
            callback([isSuccess])
        }
    }
    
    @objc(getReportDamage:callback:)
    func getReportDamage(sessionKey: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.getSessionResults(sessionKey: sessionKey) { inspectionResult in
            
            let object = InspectionResultRNO(result: inspectionResult)
            
            if let dictionary = try? DictionaryEncoder().encode(object) {
                print(dictionary)
                callback([dictionary, false])
            } else {
                callback([NSNull(), true])
                print("(getReportDamage:callback: false)")
            }
        }
    }
    
    @objc(uploadPhoto:photoCode:photoURL:callback:)
    func uploadPhoto(_ sessionKey: String, photoCode: String, photoURL: String, callback: @escaping CallBackReactNative) {
        let fileName = photoURL.split { (char) -> Bool in
            char == "/"
        }.last
        
        let (isExist, imageURL) = self.checkImageFileExist(fileName: String(fileName!), fileURL: photoURL)
        
        if isExist {
            PaveManager.shared.uploadPhoto(photo: imageURL, sessionKey: sessionKey, photoCode: photoCode) { isComplete in
                if isComplete {
                    callback([true, false]) // (res, err)
                } else {
                    callback([false, true])
                }
            }
        }
    }
    
    @objc(createSessionWithVehicle:modelYear:vehicleMake:vehicleModel:vehicleBodystyle:vehicleTrim:vehicleTransmission:vehicleExteriorColor:vehicleInteriorColor:odomReading:odomUnit:callback:)
    func createSessionWithVehicle(_ vin: String,
                                  modelYear: String,
                                  vehicleMake: String,
                                  vehicleModel: String,
                                  vehicleBodystyle: String,
                                  vehicleTrim: String,
                                  vehicleTransmission: String,
                                  vehicleExteriorColor: String,
                                  vehicleInteriorColor: String,
                                  odomReading: String,
                                  odomUnit: String,
                                  callback: @escaping CallBackReactNative) {
        let vehicle = VehicleCreate(vin: vin, modelYear: modelYear, vehicleMake: vehicleMake, vehicleModel: vehicleModel, vehicleBodystyle: vehicleBodystyle, vehicleTrim: vehicleTrim, vehicleTransmission: vehicleTransmission, vehicleExteriorColor: vehicleExteriorColor, vehicleInteriorColor: vehicleInteriorColor, odomReading: Int(odomReading), odomUnit: odomUnit)
        
        self.paveManager?.createSessionWithVehicle(vehicle: vehicle) { isComplete in
            if isComplete {
                let session = PaveManager.shared.sessionInfoInstance?.sessionProcessing?.sesion
                var object: [String: Any] = [:]
                object["active"] = session?.active
                object["redirectURL"] = session?.redirectURL
                object["sessionKey"] = session?.sessionKey
                object["status"] = session?.status
                object["theme"] = session?.theme
                object["inspectionID"] = session?.inspectionID
                object["id"] = session?.id
                callback([object, NSNull()])
            }
        }
    }
    
    @objc(getInspectionProgress:callback:)
    func getInspectionProgress(sessionKey: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.getInspectionProgress(sessionKey: sessionKey) { getSessionProgressResponse in
            
            let object = InspectionProgressRNO(response: getSessionProgressResponse)
            
            if let dictionary = try? DictionaryEncoder().encode(object) {
                print(dictionary)
                callback([dictionary, false])
            } else {
                callback([NSNull(), false])
            }
        }
    }
    
    @objc(getInspectionDetails:callback:)
    func getInspectionDetails(sessionKey: String, callback: @escaping CallBackReactNative) {
        self.paveManager?.getInspectionDetails(sessionKey: sessionKey) { inspectionDetailsResponse in
            
            let object = InspectionDeitalsRNO(response: inspectionDetailsResponse)
            
            if let dictionary = try? DictionaryEncoder().encode(object) {
                print(dictionary)
                callback([dictionary, false])
            } else {
                callback([NSNull(), false])
            }
        }
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
