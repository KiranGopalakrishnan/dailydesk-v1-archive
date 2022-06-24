package com.dailydesk.common.http

import com.google.gson.Gson
import com.dailydesk.common.http.beans.RestError
import javax.ws.rs.core.Response
import javax.ws.rs.ext.ExceptionMapper
import javax.ws.rs.ext.Provider

@Provider
class AppExceptionHandler : Exception, ExceptionMapper<ResourceException> {
    constructor() : super("An error occurred") {}
    constructor(string: String?) : super(string) {}

    override fun toResponse(exception: ResourceException): Response {
        val jsonResponse = Gson().toJson(
                RestError(
                        status = exception.getStatusCode(),
                        message = exception.getExceptionMessage()
                )
        );
        return Response.status(exception.getStatusCode()).entity(
                jsonResponse
        ).type("text/json").build();
    }

    companion object {
        private const val serialVersionUID = 1L
    }
}
