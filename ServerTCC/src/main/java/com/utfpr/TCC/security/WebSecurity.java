package com.utfpr.TCC.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

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

	public WebSecurity(AuthService authService,	
					   AuthenticationEntryPoint authenticationEntryPoint) {
		this.authService = authService;
		this.authenticationEntryPoint = authenticationEntryPoint;
	}
	
	@Bean
    @SneakyThrows
    public SecurityFilterChain filterChain(HttpSecurity http) {
		AuthenticationManagerBuilder authenticationManagerBuilder =
				http.getSharedObject(AuthenticationManagerBuilder.class);
		
		authenticationManagerBuilder
				.userDetailsService(authService)
				.passwordEncoder(passwordEncoder());
		
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
		
		http.csrf(AbstractHttpConfigurer::disable);

        http.cors(cors -> corsConfigurationSource());
        
        http.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint(authenticationEntryPoint));
        http.authorizeHttpRequests((authorize) -> authorize
				.requestMatchers(antMatcher(HttpMethod.POST, "/entidades/**")).permitAll()
				.requestMatchers(antMatcher(HttpMethod.POST, "/possiveisAdotantes/**")).permitAll()
				.requestMatchers(antMatcher(HttpMethod.POST, "/usuarios/**")).permitAll()
				.requestMatchers(antMatcher(HttpMethod.GET, "/animais/**")).permitAll()
				.requestMatchers(antMatcher(HttpMethod.GET, "/linksUteis/**")).permitAll()
		);
		
		http.authenticationManager(authenticationManager)
			.addFilter(new JWTAuthenticationFilter(authenticationManager, authService))
			.addFilter(new JWTAuthorizationFilter(authenticationManager, authService))
			.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		return http.build();
	}
	
	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*", "http://localhost:5173/","http://127.0.0.1:5173/"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","PATCH","OPTIONS","DELETE"));
        configuration.setAllowedHeaders(List.of("Authorization","x-xsrf-token",
                                                "Access-Control-Allow-Headers", "Origin",
                                                "Accept", "X-Requested-With", "Content-Type",
                                                "Access-Control-Request-Method",
                                                "Access-Control-Request-Headers", "Auth-Id-Token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
