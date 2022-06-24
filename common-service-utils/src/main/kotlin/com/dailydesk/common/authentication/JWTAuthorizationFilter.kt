package com.dailydesk.common.authentication

import BifrostOuterClass
import com.dailydesk.common.authentication.SecurityConstants.HEADER_STRING
import com.dailydesk.common.authentication.SecurityConstants.TOKEN_PREFIX
import common.bifrost.client.Bifrost
import kotlinx.coroutines.*
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import org.springframework.web.util.WebUtils
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthorizationFilter(private var authManager: AuthenticationManager): BasicAuthenticationFilter(authManager) {
    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(request: HttpServletRequest,
                                  response: HttpServletResponse,
                                  chain: FilterChain
    ) {
        val cookie = WebUtils.getCookie(request, SecurityConstants.JWT_TOKEN_COOKIE)?.value
        val header = request.getHeader(HEADER_STRING)
        if (cookie == null && header == null ) {
            chain.doFilter(request, response)
            return
        }
        val usr = getAuthentication(request)
        val authentication = UsernamePasswordAuthenticationToken(
            usr, null, null
        )
        authentication.details = WebAuthenticationDetailsSource().buildDetails(request)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

    fun getAuthentication(request: HttpServletRequest):  BifrostOuterClass.User? {
        val headerToken = request.getHeader(HEADER_STRING)?.replace("Bearer ","")
        val tokenFromCookie = WebUtils.getCookie(request, SecurityConstants.JWT_TOKEN_COOKIE)?.value
        val token = tokenFromCookie ?: headerToken
        if (token != null) {
            val verify = GlobalScope.async {
                Bifrost().verify(token)
            }
            val user = runBlocking {
                verify.await()
            }

            if (user != null)
                return user
            else
                null
        }
        return null
    }
}