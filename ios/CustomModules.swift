//
//  CustomModules.swift
//  CodeChallenge
//
//  Created by Adan Sández zavala on 18/02/24.
//

import Foundation

@objc(CustomModules) class CustomModules: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { return true }
  @objc public func customModuleParams(
      _ param: String,
      callback: RCTResponseSenderBlock
    ) {
      callback(["Hi I'm from a native module, and this is your param:  '\(param)'"])
    }
}
