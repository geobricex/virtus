package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Level;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Table(name = "resources")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Resource {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_resource", nullable = false)
    private Long id;

    @Column(name = "name_resource", nullable = false, length = 50)
    private String nameResource;

    @Column(name = "pathfile_resource", length = 100)
    private String pathfileResource;

    @Column(name = "pathvideo_resource", length = 200)
    private String pathvideoResource;

    @Column(name = "pathurlsign_resource", length = 200)
    private String pathurlsignResource;

    @Column(name = "datereg_resource")
    private Instant dateregResource;

    @Column(name = "dateupdate_resource")
    private Instant dateupdateResource;

    @Column(name = "state_resource", nullable = false, length = 1)
    private String stateResource;

    @ManyToOne(optional = false)
    @JoinColumn(name = "levels_id_levels", nullable = false)
    private Level levelsIdLevels;

}