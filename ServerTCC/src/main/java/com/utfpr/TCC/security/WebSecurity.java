package com.utfpr.TCC.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import com.utfpr.TCC.service.AuthService;

import lombok.SneakyThrows;


//https://blog.algaworks.com/spring-security/
//CHAVE DE PESQUISA YT: how to configure spring security when you have two types of users in an application
//https://www.youtube.com/watch?v=PczgM2L3w60
//https://www.youtube.com/watch?v=-ArErL6KyFw
//https://www.youtube.com/watch?v=sYGTdvq-CP0
//https://www.youtube.com/watch?v=OP1l22rG0U8
//https://www.youtube.com/watch?v=S7t-Un4GR-g

@EnableWebSecurity
@Configuration
public class WebSecurity {
	private final AuthService authService;
	private final AuthenticationEntryPoint authenticationEntryPoint;

	public WebSecurity(AuthService authService,	AuthenticationEntryPoint authenticationEntryPoint) {
		this.authService = authService;
		this.authenticationEntryPoint = authenticationEntryPoint;
	}
	
	@Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(HttpSecurity http) {
		AuthenticationManagerBuilder authenticationManagerBuilderEnt =
				http.getSharedObject(AuthenticationManagerBuilder.class);
		
		authenticationManagerBuilderEnt
				.userDetailsService(authService)
				.passwordEncoder(passwordEncoder());
		
		AuthenticationManager authenticationManagerEnt = authenticationManagerBuilderEnt.build();
		
		http.csrf().disable()
			.exceptionHandling()
			.authenticationEntryPoint(authenticationEntryPoint).and()
			.cors().and().authorizeRequests()
			//rever o "/**"
			.requestMatchers(HttpMethod.POST, "/entidades/**").permitAll()
			.requestMatchers(HttpMethod.GET, "/animais/**").permitAll()
			
			.anyRequest().authenticated().and()
			
			.authenticationManager(authenticationManagerEnt)
			.addFilter(new JWTAuthenticationFilter(authenticationManagerEnt, authService))
			.addFilter(new JWTAuthorizationFilter(authenticationManagerEnt, authService));
		
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
