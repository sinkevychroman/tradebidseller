//#import "PaveModule.h"
//#import "PaveModule-Swift.h"


//@implementation PaveModule
//
//+ (BOOL)requiresMainQueueSetup
//{
//    return YES;
//}
//
//- (dispatch_queue_t)methodQueue
//{
//
//    NSLog(@"HELLO ReactNATIVE-IOS ");
//
//
//
//    return dispatch_get_main_queue();
//}
//
//RCT_EXPORT_MODULE()
//
//RCT_EXPORT_METHOD(sampleMethod:(NSString *)stringArgument numberParameter:(nonnull NSNumber *)numberArgument callback:(RCTResponseSenderBlock)callback)
//{
//    // TODO: Implement some actually useful functionality
//    callback(@[[NSString stringWithFormat: @"numberArgument: %@ stringArgument: %@", numberArgument, stringArgument]]);
//
//}
//
//@end


#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface RCT_EXTERN_MODULE(PaveModule, NSObject)

RCT_EXTERN_METHOD(initialize)

RCT_EXTERN_METHOD(initializeWithKey: (NSString *)apiKey)

//RCT_EXTERN_METHOD(createNewSession:(RCTResponseSenderBlock)callback)

//RCT_EXTERN_METHOD(startSessionInstance:(RCTResponseSenderBlock)callback)

//RCT_EXTERN_METHOD(getInspectionProgressInstance:(RCTResponseSenderBlock)callback)

//RCT_EXTERN_METHOD(getInspectionDetailsInstnace:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(createSessionWithVehicle:
                  (NSString *)vin
                  modelYear: (NSString *)modelYear
                  vehicleMake: (NSString *)vehicleMake
                  vehicleModel: (NSString *)vehicleModel
                  vehicleBodystyle: (NSString *)vehicleBodystyle
                  vehicleTrim: (NSString *)vehicleTrim
                  vehicleTransmission: (NSString *)vehicleTransmission
                  vehicleExteriorColor: (NSString *)vehicleExteriorColor
                  vehicleInteriorColor: (NSString *)vehicleInteriorColor
                  odomReading: (NSString *)odomReading
                  odomUnit: (NSString *)odomUnit
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(uploadPhoto:
                  (NSString *)sessionKey
                  photoCode: (NSString *)photoCode
                  photoURL:  (NSString *)photoURL
                  callback: (RCTResponseSenderBlock)callback)
//@objc(getReportDamage:callback:)
RCT_EXTERN_METHOD(getReportDamage:(NSString *)sessionKey
                 callback:  (RCTResponseSenderBlock)callback)

//@objc(getInspectionDetails:callback:)
RCT_EXTERN_METHOD(getInspectionDetails:(NSString *)sessionKey
callback:  (RCTResponseSenderBlock)callback)

//@objc(getInspectionProgress:callback:)
RCT_EXTERN_METHOD(getInspectionProgress:(NSString *)sessionKey
callback:  (RCTResponseSenderBlock)callback)

//@objc(completeSession:callback:)
RCT_EXTERN_METHOD(completeSession:(NSString *)sessionKey
callback:  (RCTResponseSenderBlock)callback)

//@objc(createSession:redirectUrl:callback:)
RCT_EXTERN_METHOD(createSession:(NSString *)redirectUrl
callback:  (RCTResponseSenderBlock)callback)

//@objc(startSession:callback:)
RCT_EXTERN_METHOD(startSession: (NSString *)sessionKey
                  callback: (RCTResponseSenderBlock)callback)

//@objc(getSessionListFromLocal:)
RCT_EXTERN_METHOD(getSessionListFromLocal:(RCTResponseSenderBlock)callback)

@end

