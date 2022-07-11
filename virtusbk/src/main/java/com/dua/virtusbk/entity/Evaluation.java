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

@Table(name = "evaluations")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Evaluation {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_evaluation", nullable = false)
    private Long id;

    @Column(name = "name_evaluation", nullable = false, length = 500)
    private String nameEvaluation;

    @Column(name = "description_evaluation", nullable = false, length = 100)
    private String descriptionEvaluation;

    @Column(name = "datereg_evaluation", nullable = false)
    private Instant dateregEvaluation;

    @Column(name = "dateupdate_evaluation", nullable = false)
    private Instant dateupdateEvaluation;

    @Column(name = "time_evaluation", nullable = false)
    private Boolean timeEvaluation = false;

    @Column(name = "timeminutes_evaluation")
    private Long timeminutesEvaluation;

    @Column(name = "numberquestion_evaluation")
    private Integer numberquestionEvaluation;

    @ManyToOne(optional = false)
    @JoinColumn(name = "levels_id_levels", nullable = false)
    private Level levelsIdLevels;

}