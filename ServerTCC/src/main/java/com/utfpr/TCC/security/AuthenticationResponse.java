package com.utfpr.TCC.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;

import com.utfpr.TCC.model.Authority;
import com.utfpr.TCC.model.Usuarios;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {
	private String token;
	private String user;
	private Set<Authority> authorities;
}
