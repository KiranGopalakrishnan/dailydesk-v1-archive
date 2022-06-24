package com.dailydesk.projector.projects.bean

import com.dailydesk.projector.projects.modals.Project

data class ProjectPostBean(
        val name: String,
) {


    fun toDomain(): Project {
        return Project(
                name = name,
        )
    }
}