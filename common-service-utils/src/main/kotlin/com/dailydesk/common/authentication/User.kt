package com.dailydesk.common.authentication

import BifrostOuterClass

data class User(
    val id: String,
    val firstname: String,
    val lastname: String,
    val company: String,
    val email: String,
    val status: String,
){
    companion object {
        //Any since SecurityContext().principal is of type Any
        fun transform(user: Any):User {
            val userObj = user as BifrostOuterClass.User
            return User(
                id = userObj.id,
                firstname = userObj.firstname,
                lastname = userObj.lastname,
                company = userObj.company,
                email = userObj.email,
                status = userObj.status
            )
        }
    }
}
