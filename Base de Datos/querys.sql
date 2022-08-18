select * from persons;

select * from persons_courses;

select * from courses;

select * from topics;

select * from resources;
https://aplicaciones.uteq.edu.ec:9549/api/files/R0BDS4ixyAqvSUv/Czc3IJbUgLhUIzx/vINIsvtK61HjbUWWoyR1GrSTZ6swnyLX.docx
    https://aplicaciones.uteq.edu.ec:9549/api/files/archivos/eJBzVX9CprMX9K6/hoQDoUpftwO8e5OOjHcACPtxrUid1ODr.pdf
select * from evaluations;

select * from questions--_category;
inner join question_category qc on questions.question_category_id_questioncategory = qc.id_questioncategory;

select * from answers;

select * from answers
inner join questions q on answers.questions_id_question = q.id_question;

select * from utils;

select * from settings;

select  * from evaluation_question_category;

