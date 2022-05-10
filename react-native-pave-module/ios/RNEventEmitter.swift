//
//  RNEventEmitter.swift
//  PaveModule
//
//  Created by DiscoveryLoft on 22/07/2021.
//


//RNEventEmitter.swift
import Foundation
 
@objc(RNEventEmitter)
class RNEventEmitter: RCTEventEmitter {
    
    // Provide the EventName
    override func supportedEvents() -> [String]! {
        return ["UPLOAD_PROGRESS_EVENT"]
    }
 
    override func startObserving() {
        NotificationCenter.default.addObserver(self, selector: #selector(emitEventInternal(_:)), name: NSNotification.Name(rawValue: "event-emitted"), object: nil)
    }
    
    override func stopObserving() {
        NotificationCenter.default.removeObserver(self)
    }
    
    @objc func emitEventInternal(_ notification: NSNotification)  {
        let eventName: String = notification.userInfo?["eventName"] as! String
        
        print("send event to RN: \(String(describing: self.bridge)) \(eventName) \(String(describing: notification.userInfo))")
        self.sendEvent(withName: eventName, body: notification.userInfo)
    }
 
    @objc func notifiyRN(_ eventName: String, parameters: [String: Any] = [:] ) {
        
        print(eventName,parameters)
        var newParams: [String: Any] = parameters
        newParams["eventName"] = eventName
        NotificationCenter.default.post(name: NSNotification.Name(rawValue: "event-emitted"), object: self, userInfo: newParams)
    }
    
    @objc func sendEvent(_ eventName: String, parameters: [String: Any] = [:] ) {
        self.sendEvent(withName: eventName, body: parameters)

        
    }
    @objc override  static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
