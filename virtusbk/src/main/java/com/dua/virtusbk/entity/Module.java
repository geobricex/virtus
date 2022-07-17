package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Syllabus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.jpa.domain.AbstractPersistable;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Table(name = "modules")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Module {
    @Id
    @SequenceGenerator(name="modules_id_module_seq", sequenceName="modules_id_module_seq", allocationSize=1)
    @GeneratedValue(generator="modules_id_module_seq")
    @Column(name = "id_module", nullable = false)
    private Long id1;

    @Column(name = "name_module", nullable = false, length = 50)
    private String nameModule;

    @Column(name = "description_module", nullable = false, length = 100)
    private String descriptionModule;

    @Lob
    @Column(name = "keywords_module")
    private String keywordsModule;

    @Column(name = "pathimg_modules", length = 75)
    private String pathimgModules;

    @Column(name = "datereg_module", nullable = false)
    private Instant dateregModule;

    @Column(name = "dateupdate_module", nullable = false)
    private Instant dateupdateModule;

    @Column(name = "state_module", nullable = false, length = 1)
    private String stateModule;

    @ManyToOne(optional = false)
    @JoinColumn(name = "syllabus_id_syllabu", nullable = false)
    private Syllabus syllabusIdSyllabu;

}