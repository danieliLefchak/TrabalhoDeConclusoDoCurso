package com.utfpr.TCC.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.utfpr.TCC.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    Authority findByAuthority(String authority);
}
