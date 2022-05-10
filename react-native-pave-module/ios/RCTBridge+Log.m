//
//  RCTBridge+log.m
//  PaveModule
//
//  Created by KimDuong on 8/24/20.
//

#import <Foundation/Foundation.h>
#import "RCTBridge+Log.h"
#import "RCTLog.h"
@implementation RCTBridge (Macros)
+ (void) rctLogInfo: (NSString *)string {
    RCTLogInfo(@"%@", string);
//    _RCTLogJavaScriptInternal(RCTLogLevelInfo, string);
    
}
@end
