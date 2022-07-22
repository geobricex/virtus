package com.dua.virtusbk.entity;

import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.time.Instant;

@Table(name = "persons_courses")
@Entity
@Data
@NoArgsConstructor
@ToString
public class PersonsCours {
    @Id
    @SequenceGenerator(name="persons_courses_id_person_course_seq", sequenceName="persons_courses_id_person_course_seq", allocationSize=1)
    @GeneratedValue(generator="persons_courses_id_person_course_seq")
    @Column(name = "id_person_course", nullable = false)
    private Long id;

    @Column(name = "datereg_person_course", nullable = false)
    private Instant dateregPersonCourse;

    @Column(name = "state_person_course", nullable = false, length = 1)
    private String statePersonCourse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "courses_id_course", nullable = false)
    private Course coursesIdCourse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "persons_id_person", nullable = false)
    private Person personsIdPerson;

}
