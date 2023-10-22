package com.utfpr.TCC.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.utfpr.TCC.annotation.UniqueUserName;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuarios implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@UniqueUserName
	private String username;
	
	@NotNull
	@Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$")
	private String password;
	/*	(?=.*\d)              // deve conter ao menos um dígito
		(?=.*[a-z])           // deve conter ao menos uma letra minúscula
		(?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
		(?=.*[$*&@#])         // deve conter ao menos um caractere especial
		[0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
	*/
	
	@NotNull
	private String tipoUsuario;
	
	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "tb_user_authorities",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id") )
    private Set<Authority> userAuthorities;

	@Override
	@Transient
    @JsonIgnore
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>(userAuthorities);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
