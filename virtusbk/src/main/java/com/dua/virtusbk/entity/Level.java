package com.dua.virtusbk.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Table(name = "levels")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Level {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_levels", nullable = false)
    private Long id;

    @Column(name = "name_level", nullable = false, length = 10)
    private String nameLevel;

    @Column(name = "description_level", length = 100)
    private String descriptionLevel;

    @Column(name = "state_level", nullable = false, length = 1)
    private String stateLevel;

    @ManyToOne(optional = false)
    @JoinColumn(name = "modules_id_module", nullable = false)
    private Module modulesIdModule;

}