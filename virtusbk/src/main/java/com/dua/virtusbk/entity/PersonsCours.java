package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Cours;
import com.dua.virtusbk.entity.Person;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
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
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_person_course", nullable = false)
    private Long id;

    @Column(name = "datereg_person_course", nullable = false)
    private Instant dateregPersonCourse;

    @Column(name = "state_person_course", nullable = false, length = 1)
    private String statePersonCourse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "courses_id_course", nullable = false)
    private Cours coursesIdCourse;

    @ManyToOne(optional = false)
    @JoinColumn(name = "persons_id_person", nullable = false)
    private Person personsIdPerson;

}