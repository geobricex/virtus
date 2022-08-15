select * from persons order by id_person;

-- delete from courses where name_course = 'bronco';
-- delete from persons_courses

select * from topics;
select id_syllabu, name_syllabu, description_syllabu, keywords_syllabu, pathimg_syllabus, state_syllabu
, dateupdate_syllabu from syllabus
where state_syllabu = 'A' and courses_id_course =1;

select infor from home_select(1,1)


CREATE TABLE settings
    (
     id_setting BIGSERIAL NOT NULL ,
     datereg_setting TIMESTAMP(3) NOT NULL ,
     dateupdate_setting TIMESTAMP(3) NOT NULL ,
     setting_configuration TEXT NOT NULL ,
     persons_id_person BIGINT NOT NULL
    );

ALTER TABLE settings
    ADD CONSTRAINT settings_persons_FK FOREIGN KEY
    (
     persons_id_person
    )
    REFERENCES persons
    (
     id_person
    )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION;


ALTER TABLE settings ADD CONSTRAINT settings_PK PRIMARY KEY (id_setting)
     ;



