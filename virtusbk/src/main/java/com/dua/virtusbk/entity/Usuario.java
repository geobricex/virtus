package com.dua.virtusbk.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "usuarios")
@Entity
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario", nullable = false)
    private Long id;

    @Column(name = "usuario", nullable = false, length = 50)
    private String usuario;

    @Lob
    @Column(name = "clave", nullable = false)
    private String clave;

    @Column(name = "correo", length = 40)
    private String correo;

    @Column(name = "rol_usuario", length = 15)
    private String rolUsuario;

    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "fecha_bloqueo")
    private LocalDate fechaBloqueo;

    @Column(name = "estado_usuario")
    private Boolean estadoUsuario;

}