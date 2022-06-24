package com.dailydesk.projector.projects.repository

import com.dailydesk.common.mongo.DocumentKeys

enum class ProjectDocument:DocumentKeys {
 ID {
     override fun toKey(): String  =  this.toString().lowercase()
 },
    NAME {
        override fun toKey(): String  =  this.toString().lowercase()
    },
    CREATED_BY {
        override fun toKey(): String  =  this.toString().lowercase()
    },
    COMPANY_ID {
        override fun toKey(): String  =  this.toString().lowercase()
    }
}