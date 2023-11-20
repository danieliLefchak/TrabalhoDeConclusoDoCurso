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
				.requestMatchers(antMatcher(HttpMethod.GET, "/entidades/findByNomeFant/**")).permitAll()
				.requestMatchers(antMatcher(HttpMethod.GET, "/usuarios/findByName/**")).permitAll()
				
				.requestMatchers(antMatcher("/entidades/findEntidadeByUser/**")).hasAnyRole("ADMIN")
				.requestMatchers(antMatcher(HttpMethod.PUT, "/entidades/**")).hasAnyRole("ADMIN")
				.requestMatchers(antMatcher(HttpMethod.DELETE, "/entidades/**")).hasAnyRole("ADMIN")
				.requestMatchers(antMatcher(HttpMethod.GET, "/entidades/findById/**")).hasAnyRole("ADMIN")
				
				.requestMatchers(antMatcher(HttpMethod.DELETE, "/possiveisAdotantes/**")).hasAnyRole("USER")
				.requestMatchers(antMatcher(HttpMethod.GET, "/possiveisAdotantes/findById/**")).hasAnyRole("USER")
				
				.requestMatchers(antMatcher(HttpMethod.PUT, "/animais/**")).hasAnyRole("ADMIN")
				.requestMatchers(antMatcher(HttpMethod.POST, "/animais/**")).hasAnyRole("ADMIN")
				
				.requestMatchers(antMatcher(HttpMethod.PUT, "/linksUteis/**")).hasAnyRole("ADMIN")
				.requestMatchers(antMatcher(HttpMethod.POST, "/linksUteis/**")).hasAnyRole("ADMIN")
				
				//.requestMatchers(antMatcher(HttpMethod.GET, "/usuarios/findByName/**")).hasAnyRole("ADMIN", "USER")
				
				.requestMatchers(antMatcher(HttpMethod.POST, "/interessados/**")).hasAnyRole("USER")
				.requestMatchers(antMatcher(HttpMethod.PUT, "/interessados/**")).hasAnyRole("ADMIN")
				
				.requestMatchers(antMatcher("/possiveisAdotantes/findAdotanteByUser/**")).hasAnyRole("USER")
				
				.anyRequest().authenticated()
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
