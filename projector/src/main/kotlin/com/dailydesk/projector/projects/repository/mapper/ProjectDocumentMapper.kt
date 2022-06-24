package com.dailydesk.projector.projects.repository.mapper

import com.dailydesk.common.id.ShortId
import com.dailydesk.common.mongo.DocumentMapper
import com.dailydesk.projector.projects.modals.Project
import com.dailydesk.projector.projects.repository.ProjectDocument
import org.bson.Document

object ProjectDocumentMapper: DocumentMapper<Project> {
    override fun toDocument(domainObject: Project): Document {
        val document = Document()
        document.append(ProjectDocument.ID.toKey(), domainObject.id?.value)
        document.append(ProjectDocument.NAME.toKey(),domainObject.name)
        document.append(ProjectDocument.COMPANY_ID.toKey(),domainObject.companyId)
        document.append(ProjectDocument.CREATED_BY.toKey(),domainObject.createdBy)
        return document
    }

    override fun fromDocument(document: Document): Project {
        val id = document.getString(ProjectDocument.ID.toKey())
        val name = document.getString(ProjectDocument.NAME.toKey())
        val createdBy = document.getString(ProjectDocument.CREATED_BY.toKey())
        val companyId = document.getString(ProjectDocument.COMPANY_ID.toKey())
        return Project(
            id = ShortId(id),
            name = name,
            createdBy = createdBy,
            companyId = companyId
        )
    }
}