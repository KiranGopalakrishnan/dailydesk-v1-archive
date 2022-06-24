package com.dailydesk.common.http

sealed class Response<out T: Any>;

data class Success<out T : Any>(val value: T) : Response<T>()

sealed class Errors(val getMessage: () -> String) : Response<Nothing>()
data class NotFound(val e: () -> String = { "Entity not found" }) : Errors(e)
data class UnprocessableEntity(val e: () -> String = { "Entity not found" }) : Errors(e)
data class InvalidRequest(val e: () -> String = { "Invalid request" }) : Errors(e)
data class NoPermission(val e: () -> String) : Errors(e)

fun Response<Any>.transformOrThrow(successResponse: javax.ws.rs.core.Response.ResponseBuilder): javax.ws.rs.core.Response {
    return when (this) {
        is Success -> successResponse.build()
        is Errors -> throwException(this)
    }
}


fun <D : Any, B : Any> Response<D>.transformOrThrow(apply: D.() -> B): B {
    return when (this) {
        is Success -> this.value.apply()
        else -> throwException(this as Errors)
    }
}

fun <D : Any, B : Any> Response<List<D>>.IterateOrThrow(apply: D.() -> B): List<B> {
    return when (this) {
        is Success -> this.value.map { it.apply() }
        is Errors -> throwException(this as Errors)
    }
}


private fun throwException(outcome: Errors): Nothing {
    when (outcome) {
        is NoPermission -> throw ResourceException(outcome.getMessage(), javax.ws.rs.core.Response.Status.FORBIDDEN.statusCode)
        is NotFound -> throw ResourceException(outcome.getMessage(), javax.ws.rs.core.Response.Status.NOT_FOUND.statusCode)
        is UnprocessableEntity -> throw ResourceException(outcome.getMessage(), 422)
        is InvalidRequest -> throw ResourceException(
                outcome.getMessage(),
                javax.ws.rs.core.Response.Status.BAD_REQUEST.statusCode
        )
    }
}