package com.dua.virtusbk.entity;

import com.dua.virtusbk.entity.Question;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "answers")
@Entity
@Data
@NoArgsConstructor
@ToString
public class Answer{
    @Id
    @SequenceGenerator(name="answers_id_answer_seq", sequenceName="answers_id_answer_seq", allocationSize=1)
    @GeneratedValue(generator="answers_id_answer_seq")
    @Column(name = "id_answer", nullable = false)
    private Long id1;

    @Column(name = "options_answer", nullable = false, length = 8000)
    private String optionsAnswer;

    @Column(name = "datereg_answer", nullable = false)
    private Instant dateregAnswer;

    @Column(name = "dateupdate_answer", nullable = false)
    private Instant dateupdateAnswer;

    @ManyToOne(optional = false)
    @Cascade(value={org.hibernate.annotations.CascadeType.ALL})
    @JoinColumn(name = "questions_id_question", nullable = false)
    private Question questionsIdQuestion;

}
