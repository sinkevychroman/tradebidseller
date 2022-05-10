//
//  Convertion.swift
//  PaveModule
//
//  Created by KimDuong on 1/18/21.
//

import Foundation


protocol DomainConvertibleType {
    associatedtype DomainType

    func asDomain() -> DomainType
}
