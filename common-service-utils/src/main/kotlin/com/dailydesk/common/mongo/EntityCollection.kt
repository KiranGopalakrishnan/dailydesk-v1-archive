package com.dailydesk.common.mongo

import org.bson.conversions.Bson
import org.springframework.stereotype.Component

@Component
interface EntityCollection<T> {

    fun save(domain: T)

    fun findOne(filter: Bson):T?

    fun findAll(): List<T>?

    fun findAll(filter: Bson): List<T>?

}