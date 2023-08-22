package com.utfpr.TCC.security;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.AuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter{
	private final AuthService authService;
	
	public JWTAuthorizationFilter(AuthenticationManager authenticationManager, AuthService authService) {
		super(authenticationManager);
		this.authService = authService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
									FilterChain chain) throws IOException, ServletException{
		
		String header = request.getHeader(SecurityConstants.HEADER_STRING);
		
		if(header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)){
			chain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
		
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		chain.doFilter(request, response);
	}
	
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(SecurityConstants.HEADER_STRING);
		
		String username = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))
				.build().verify(token.replace(SecurityConstants.TOKEN_PREFIX, ""))
				.getSubject();
		
		if(username != null) {
			Usuarios usuarios = (Usuarios)authService.loadUserByUsername(username);
			return new UsernamePasswordAuthenticationToken(usuarios.getUsername(), null, usuarios.getAuthorities());
		}
		
		return null;
	}
}
