package com.utfpr.TCC.security;

import java.io.IOException;
import java.util.Date;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.utfpr.TCC.model.Usuarios;
import com.utfpr.TCC.service.AuthService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
	private AuthenticationManager authenticationManager;
	private AuthService authService;
	private String nome;
	
	public JWTAuthenticationFilter(AuthenticationManager authenticationManager, 
									  AuthService authService) {
		
		this.authenticationManager = authenticationManager;
		this.authService = authService;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, 
												HttpServletResponse response) 
												throws AuthenticationException{
		try {
			Usuarios credentials = new ObjectMapper()
					.readValue(request.getInputStream(), Usuarios.class);
			
			Usuarios usuario = (Usuarios)authService.loadUserByUsername(credentials.getUsername());
			nome = usuario.getUsername();
			
			return authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							credentials.getUsername(), 
							credentials.getPassword(),
							usuario.getAuthorities()
						)
					);
			
		} catch(StreamReadException e) {
			throw new RuntimeException(e);
		} catch(DatabindException e) {
			throw new RuntimeException(e);
		} catch(IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, 
											HttpServletResponse response, 
											FilterChain chain,
											Authentication authResult) 
													throws IOException, ServletException {
		String token = JWT.create()
				.withSubject(authResult.getName())
				.withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
				.sign(Algorithm.HMAC512(SecurityConstants.SECRET));
		
		response.setContentType("application/json");
		response.getWriter().write(new ObjectMapper().writeValueAsString(new AuthenticationResponse(token, nome)));
	}
}