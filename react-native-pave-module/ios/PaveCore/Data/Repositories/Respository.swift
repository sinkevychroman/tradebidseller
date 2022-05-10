//
//  Respository.swift
//  PaveModule
//
//  Created by KimDuong on 1/18/21.
//

import Foundation
protocol AbstractRepository {
    associatedtype T 
    func query() -> [T]
    func save(entity: T) -> Void
    func delete(entity: T) -> Void
    func update(entity: T) -> Void 
}

