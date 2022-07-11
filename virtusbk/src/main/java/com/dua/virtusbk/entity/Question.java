package com.dua.virtusbk.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Table(name = "questions")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Question {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_question", nullable = false)
    private Long id;

    @Column(name = "type_question", nullable = false, length = 10)
    private String typeQuestion;

    @Column(name = "title_question", nullable = false, length = 200)
    private String titleQuestion;

    @Column(name = "description_question", nullable = false, length = 500)
    private String descriptionQuestion;

    @Column(name = "pathurlsign_question", length = 100)
    private String pathurlsignQuestion;

    @Column(name = "points_question")
    private Boolean pointsQuestion;

    @Column(name = "maximumpoints_question")
    private Integer maximumpointsQuestion;

    @Column(name = "state_question", nullable = false, length = 1)
    private String stateQuestion;

    @ManyToOne(optional = false)
    @JoinColumn(name = "\"evaluations_id-evaluation\"", nullable = false)
    private Evaluation evaluationsIdEvaluation;

}