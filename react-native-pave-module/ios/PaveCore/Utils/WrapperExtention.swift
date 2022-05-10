//
//  WrapperExtention.swift
//  PaveModule
//
//  Created by KimDuong on 7/17/20.
//

import Foundation
extension Optional where Wrapped == String {
    var valueOrEmpty: String {
        guard let unwrapped = self else {
            return ""
        }
        return unwrapped
    }
}

extension Optional where Wrapped == Bool {
    var valueOrEmpty: Bool {
        guard let unwrapped = self else {
            return false
        }
        return unwrapped
    }
}

extension Optional where Wrapped == Int {
    var valueOrEmpty: Int {
        guard let unwrapped = self else {
            return -1
        }
        return unwrapped
    }
}

extension Optional where Wrapped == [AnyClass] {
    var valueOrEmpty : [AnyClass] {
        guard let unwrapped = self else {
            return [AnyClass]()
        }
        return unwrapped

    }
}
