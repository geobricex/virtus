package com.dua.virtusbk.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.Type;
import org.springframework.context.annotation.Lazy;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;

@Table(name = "topics")
@Data
@NoArgsConstructor
@Entity
@ToString

public class Topic {
    @Id
    @SequenceGenerator(name="topics_id_topic_seq", sequenceName="topics_id_topic_seq", allocationSize=1)
    @GeneratedValue(generator="topics_id_topic_seq")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_topic", nullable = false)
    private Long id;

    @Column(name = "name_topic", nullable = false, length = 50)
    private String nameTopic;

    @Column(name = "description_topic", nullable = false, length = 100)
    private String descriptionTopic;

    @Column(name = "keywords_topic")
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    private String keywordsTopic;

    @Column(name = "pathimg_topic", length = 200)
    private String pathimgTopic;

    @Column(name = "datereg_topic", nullable = false)
    private LocalDateTime dateregTopic;

    @Column(name = "dateupdate_topic", nullable = false)
    private LocalDateTime dateupdateTopic;

    @Column(name = "state_topic", nullable = false, length = 1)
    private String stateTopic;

    @Column(name = "levels_topic")
    private Integer levelsTopic;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Cascade(value={org.hibernate.annotations.CascadeType.ALL})
    @JoinColumn(name = "syllabus_id_syllabu", nullable = false)
    @JsonIgnore// No traer toda la relación en una consulta
    private Syllabu syllabuIdSyllabu;

}
