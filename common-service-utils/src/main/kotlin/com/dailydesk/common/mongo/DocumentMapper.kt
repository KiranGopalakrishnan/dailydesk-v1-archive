package com.dailydesk.common.mongo

import org.bson.Document
import org.springframework.stereotype.Component

@Component
interface DocumentMapper<T> {

    fun toDocument(domainObject: T): Document

    fun fromDocument(document:Document): T

}