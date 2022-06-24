package com.dailydesk.projector.projects

import com.dailydesk.common.http.IterateOrThrow
import com.dailydesk.common.http.transformOrThrow
import com.dailydesk.projector.projects.bean.ProjectBean
import com.dailydesk.projector.projects.bean.ProjectPostBean
import com.dailydesk.projector.projects.services.ProjectService
import com.dailydesk.common.authentication.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.context.SecurityContextHolder
import javax.ws.rs.*
import javax.ws.rs.core.MediaType


@Path("/projects")
class ProjectsResource {
    @Autowired
    lateinit var projectService: ProjectService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun getProjects(): List<ProjectBean> {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        return projectService.getAllProjects(user).IterateOrThrow { ProjectBean.from(this) };
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    fun getProjectById(
        @PathParam("id") projectId:String,
    ): ProjectBean {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)

        return projectService.getProjectById(projectId).transformOrThrow { ProjectBean.from(this) };
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    fun createProject(projectPostBean: ProjectPostBean): ProjectBean {
        val auth = SecurityContextHolder.getContext().authentication
        val user = User.transform(auth.principal)
        return projectService.create(user,
                projectPostBean.toDomain()
        ).transformOrThrow { ProjectBean.from(this) }

    }

}