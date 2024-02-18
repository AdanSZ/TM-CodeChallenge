//
//  CustomModules.m
//  CodeChallenge
//
//  Created by Adan Sández zavala on 18/02/24.
//
#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CustomModules, NSObject)
  RCT_EXTERN_METHOD(customModuleParams:
    (NSString *) param
    callback: (RCTResponseSenderBlock)callback
  )
@end
