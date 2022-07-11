package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Person;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Table(name = "courses")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Cours {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_course", nullable = false)
    private Long id;

    @Column(name = "name_course", nullable = false, length = 50)
    private String nameCourse;

    @Column(name = "description_course", nullable = false, length = 100)
    private String descriptionCourse;

    @Lob
    @Column(name = "keywords_course")
    private String keywordsCourse;

    @Column(name = "pathimg_course", length = 75)
    private String pathimgCourse;

    @Column(name = "datereg_course", nullable = false)
    private Instant dateregCourse;

    @Column(name = "dateupdate_course", nullable = false)
    private Instant dateupdateCourse;

    @Column(name = "state_course", nullable = false, length = 1)
    private String stateCourse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "persons_id_person", nullable = false)
    private Person personsIdPerson;

}