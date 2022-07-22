package com.dua.virtusbk.entity;

import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "syllabus")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Syllabu {
    @Id
    @SequenceGenerator(name="syllabus_id_syllabu_seq", sequenceName="syllabus_id_syllabu_seq", allocationSize=1)
    @GeneratedValue(generator="syllabus_id_syllabu_seq")
    @Column(name = "id_syllabu", nullable = false)
    private Long id;

    @Column(name = "name_syllabu", nullable = false, length = 50)
    private String nameSyllabu;

    @Column(name = "description_syllabu", nullable = false, length = 100)
    private String descriptionSyllabu;

    @Column(name = "keywords_syllabu")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
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
    private Course coursesIdCourse;

}
