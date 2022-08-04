package com.dua.virtusbk.controller;

import com.dua.virtusbk.entity.Course;
import com.dua.virtusbk.entity.Util;
import com.dua.virtusbk.repository.CourseRepository;
import com.dua.virtusbk.repository.UtilRepository;
import com.dua.virtusbk.util.DataStatic;
import com.dua.virtusbk.util.Email;
import com.dua.virtusbk.util.WeEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UtilController {
    @Autowired
    private UtilRepository utilDAO;

    public boolean eInsertUser(String email, String name, String lastname, String code) {
//         List<Util> utils = utilDAO.returnUtilsData();

        Optional<Util> findsplantilla = utilDAO.findById("splantilla");
        Optional<Util> findurlaplication = utilDAO.findById("urlaplication");
        Optional<Util> findemailpass = utilDAO.findById("emailpass");
        Optional<Util> findemail = utilDAO.findById("email");
        //Mejorar sin tanta consulta

        if (findsplantilla.isPresent() && findurlaplication.isPresent()
                && findemailpass.isPresent() && findemail.isPresent()) {

            String respon = findsplantilla.get().getValueUtil();
            String urlx = findurlaplication.get().getValueUtil();
            respon = respon.replace("${paramnames}", name + " " + lastname);
            respon = respon.replace("${paramintro}", "Esta cuenta ha sido activada");
            respon = respon.replace("${hosturl}", urlx);
            respon = respon.replace("${hostname}", DataStatic.nameApplication);
            respon = respon.replace("${paramdetail}", "confirmación de la cuenta");
            respon = respon.replace("${hosthackurl}", urlx + "verify.html?email=" + email + "&code=" + code);

            Email em = new Email();
            WeEncoder wEr = new WeEncoder();
            em.setmyEmailFrom(findemail.get().getValueUtil(), wEr.textDecryptor(findemailpass.get().getValueUtil()));
            em.setContentEmail(email, "Bienvenido a la Comunidad de " + DataStatic.nameApplication, respon);
            boolean status = em.sendmyEmail();
            System.out.println("Status send email: " + status);
            return status;
        } else {
            return false;
        }

    }
}
