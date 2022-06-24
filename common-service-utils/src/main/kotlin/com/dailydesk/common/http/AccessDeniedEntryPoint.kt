package com.dailydesk.common.http

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import java.io.IOException
import java.util.*
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.ws.rs.ext.Provider
import kotlin.collections.HashMap


@Provider
class AccessDeniedEntryPoint : AuthenticationEntryPoint {

    @Throws(IOException::class, ServletException::class)
    override fun commence(request: HttpServletRequest?, response: HttpServletResponse,
                          authException: AuthenticationException?) {

        val mapBodyException: MutableMap<String, Any> = HashMap()

        mapBodyException["error"] = "${HttpStatus.UNAUTHORIZED}"
        mapBodyException["timestamp"] = Date().getTime()

        response.contentType = "application/json"
        response.status = HttpServletResponse.SC_UNAUTHORIZED

        val mapper = ObjectMapper()
        mapper.writeValue(response.outputStream, mapBodyException)

    }
}