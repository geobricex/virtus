package com.dua.virtusbk.reports;


import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;


import com.dua.virtusbk.dto.reportCertDTO;
import net.sf.jasperreports.engine.JRException;

public interface ReportCertificateCours {

    reportCertDTO getReport(Map<String, Object> params) throws JRException, IOException, SQLException;

}
