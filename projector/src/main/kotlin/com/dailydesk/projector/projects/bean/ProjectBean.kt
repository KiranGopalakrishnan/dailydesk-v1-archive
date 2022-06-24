package com.dailydesk.projector.projects.bean

import com.dailydesk.projector.projects.modals.Project


data class ProjectBean(
        val id: String?,
        val name: String,
        val createdBy: String?,
        val companyId: String?
) {
    companion object{
        fun from(project: Project): ProjectBean {
            return ProjectBean(
                id = project.id?.value,
                name = project.name,
                createdBy = project?.createdBy,
                companyId = project?.companyId
            )
        }
    }
}