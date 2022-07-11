package com.dua.virtusbk.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Table(name = "syllabus")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Syllabus {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_syllabu", nullable = false)
    private Long id;

    @Column(name = "name_syllabu", nullable = false, length = 50)
    private String nameSyllabu;

    @Column(name = "description_syllabu", nullable = false, length = 100)
    private String descriptionSyllabu;

    @Lob
    @Column(name = "keywords_syllabu")
    private String keywordsSyllabu;

    @Column(name = "pathimg_syllabus", length = 75)
    private String pathimgSyllabus;

    @Column(name = "datereg_syllabu", nullable = false)
    private Instant dateregSyllabu;

    @Column(name = "dateupdate_syllabu", nullable = false)
    private Instant dateupdateSyllabu;

    @Column(name = "state_syllabu", nullable = false, length = 1)
    private String stateSyllabu;

    @ManyToOne(optional = false)
    @JoinColumn(name = "courses_id_course", nullable = false)
    private Cours coursesIdCourse;

}