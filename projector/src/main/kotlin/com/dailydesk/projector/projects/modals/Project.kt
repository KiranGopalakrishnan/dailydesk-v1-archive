package com.dailydesk.projector.projects.modals

import com.dailydesk.common.id.ShortId



data class Project(
    val id:ShortId = ShortId(),
    val name: String,
    val createdBy:String? = null,
    val companyId: String? = null
)