//
//  StringExtension.swift
//  PaveModule
//
//  Created by KimDuong on 7/17/20.
//

import Foundation
extension String {
    func capitalizingFirstLetter() -> String {
        return prefix(1).lowercased() + dropFirst()
    }

    mutating func capitalizeFirstLetter() {
        self = self.capitalizingFirstLetter()
    }

    func removeUnderLine() -> String {
        return self.replacingOccurrences(of: "_", with: " ")
    }
    
    
}
