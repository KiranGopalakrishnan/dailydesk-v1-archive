package com.dailydesk.common.http

import org.springframework.http.HttpStatus
import org.springframework.security.access.AccessDeniedException

import javax.servlet.http.HttpServletResponse

import javax.servlet.http.HttpServletRequest

import org.springframework.security.web.access.AccessDeniedHandler
import java.io.IOException
import javax.servlet.ServletException
import javax.ws.rs.ext.Provider

@Provider
class AccessDeniedExceptionHandler : AccessDeniedHandler {

    @Throws(IOException::class, ServletException::class)
    override fun handle(request: HttpServletRequest?, response: HttpServletResponse?, exception: AccessDeniedException?)  {
        response?.status = HttpStatus.FORBIDDEN.value()
    }
}