package com.dua.virtusbk.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;

@Table(name = "persons")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Person {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE)
    //@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="webuser_idwebuser_seq")
    @SequenceGenerator(name = "persons_id_person_seq", sequenceName = "persons_id_person_seq", allocationSize = 1)
    @GeneratedValue(generator = "persons_id_person_seq")
    @Column(name = "id_person", nullable = false)
    private Long id;

    @Column(name = "name_person", nullable = false, length = 50)
    private String namePerson;

    @Column(name = "lastname_person", nullable = false, length = 50)
    private String lastnamePerson;

    @Column(name = "email_person", nullable = false, length = 75)
    private String emailPerson;

    @Column(name = "password_person", nullable = false, length = 64)
    private String passwordPerson;

    @Column(name = "type_person", nullable = false, length = 1)
    private String typePerson;

    @Column(name = "pathimg_person", length = 50)
    private String pathimgPerson;

    @Column(name = "codeverification_person", length = 15)
    private String codeverificationPerson;

    @Column(name = "datereg_person", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateregPerson;

    @Column(name = "dateupdate_person", nullable = false)
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm", iso = DateTimeFormat.ISO.DATE_TIME)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateupdatePerson;

    @Column(name = "provider_person", length = 20)
    private String providerPerson;

    @Column(name = "id_location", length = 20)
    private String idLocation;
}
