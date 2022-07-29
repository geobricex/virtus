package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Answer;
import com.dua.virtusbk.entity.Person;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "persons_answers")
@Entity
@Data
@NoArgsConstructor
@ToString
public class PersonsAnswer {
    @Id
    @SequenceGenerator(name="persons_answer_id_persons_answer_seq", sequenceName="persons_answer_id_persons_answer_seq", allocationSize=1)
    @GeneratedValue(generator="persons_answer_id_persons_answer_seq")
    @Column(name = "id_person_answer", nullable = false)
    private Long id;

    @Column(name = "datereg_person_answer", nullable = false)
    private Instant dateregPersonAnswer;

    @Column(name = "results_person_answer", nullable = false, length = 8000)
    private String resultsPersonAnswer;

    @Column(name = "qualification_person_answer")
    private Integer qualificationPersonAnswer;

    @Column(name = "trynumber_person_answer", nullable = false)
    private Integer trynumberPersonAnswer;

    @Column(name = "timespent_person_answer", nullable = false)
    private Integer timespentPersonAnswer;

    @ManyToOne(optional = false)
    @JoinColumn(name = "persons_id_person", nullable = false)
    private Person personsIdPerson;

    @ManyToOne(optional = false)
    @Cascade(value={org.hibernate.annotations.CascadeType.ALL})
    @JoinColumn(name = "answers_id_answer", nullable = false)
    private Answer answersIdAnswer;

}
