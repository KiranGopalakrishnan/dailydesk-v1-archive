package com.dailydesk.projector.projects.services

import com.dailydesk.common.authentication.User
import com.dailydesk.common.http.NotFound
import com.dailydesk.common.http.Response
import com.dailydesk.common.http.Success
import com.dailydesk.common.id.ShortId
import com.dailydesk.projector.projects.modals.Project
import com.dailydesk.projector.projects.repository.ProjectRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ProjectService {
    @Autowired
    lateinit var projectRepository: ProjectRepository
    fun getAllProjects(user:User): Response<List<Project>>{
        val projects = projectRepository.getAllProjectsForUser(user.id)
        return if(projects != null){
            Success(projects)
        }else{
            NotFound{ "No projects found" }
        }
    }

    fun getProjectById(projectId:String): Response<Project>{
        val project = projectRepository.getProject(ShortId(projectId))
        return if(project != null){
            Success(project)
        }else{
            NotFound{ "No projects found" }
        }
    }

    fun create(user:User,project: Project):Response<Project>{
        val projectToBeCreated = project.copy(
            companyId = user.company,
            createdBy = user.id
        )
        projectRepository.save(
            projectToBeCreated
        )
        return Success(projectToBeCreated)
    }

}