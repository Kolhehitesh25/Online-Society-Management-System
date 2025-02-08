package com.osms.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	private final CustomJWTAuthenticationFilter customJWTAuthenticationFilter;

	public SecurityConfiguration(CustomJWTAuthenticationFilter customJWTAuthenticationFilter) {
		this.customJWTAuthenticationFilter = customJWTAuthenticationFilter;
	}

	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())

				.authorizeHttpRequests(requests -> requests
						.requestMatchers("/auth/login", "/auth/forgot-password", "/auth/reset-password/{token}",
								"/resident/register", "/staff/register", "/v*/api-doc*/**", "/swagger-ui/**")
						.permitAll().requestMatchers(HttpMethod.OPTIONS).permitAll() // CORS support

						// Admin Endpoints (Accessible only to Admins)
						.requestMatchers("/admin/**", "/auth/get/{id}", "/auth/update").hasAuthority("ROLE_ADMIN")

						// Resident Endpoints (Accessible only to Residents)
						.requestMatchers("/resident/**").hasAuthority("ROLE_RESIDENT")

						// Staff Endpoints (Accessible only to Staff)
						.requestMatchers("/staff/**").hasAnyAuthority("ROLE_CLEANER", "ROLE_SECURITY")

						.requestMatchers("/auth/getall/{id}", "/auth/updateone/{id}").hasAnyAuthority("ROLE_RESIDENT","ROLE_ADMIN","ROLE_CLEANER", "ROLE_SECURITY")

						.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // securing the password
	}
}