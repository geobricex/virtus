package com.dua.virtusbk.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Table(name = "servicios")
@Entity
@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class Servicio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio", nullable = false)
    private Long id;

    @Column(name = "nombre_servicio", nullable = false, length = 30)
    private String nombreServicio;

    @Column(name = "horario_servicio", length = 30)
    private String horarioServicio;

    @Column(name = "medico_servicio", length = 50)
    private String medicoServicio;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario idUsuario;

    @Column(name = "estado_servicio")
    private Boolean estadoServicio;

}