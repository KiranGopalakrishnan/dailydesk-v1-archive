package com.dailydesk.projector.security

import com.dailydesk.common.authentication.JWTAuthorizationFilter
import com.dailydesk.common.http.AccessDeniedEntryPoint
import com.dailydesk.common.http.AccessDeniedExceptionHandler
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy

@EnableWebSecurity
class WebSecurity() : WebSecurityConfigurerAdapter() {


    override fun configure(http: HttpSecurity) {
        http.csrf().disable().authorizeRequests()
                .anyRequest().authenticated()
                .and()

                .addFilter(JWTAuthorizationFilter(authenticationManager()))

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .exceptionHandling()
                .accessDeniedHandler(AccessDeniedExceptionHandler())
                .authenticationEntryPoint(AccessDeniedEntryPoint())

    }
}