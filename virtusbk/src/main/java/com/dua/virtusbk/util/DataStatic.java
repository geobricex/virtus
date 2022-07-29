/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dua.virtusbk.util;

import javax.xml.crypto.Data;

/**
 *
 * @author CleanCode
 */
public class DataStatic {

    public static String nameApplication = "VIRTUS";

    /**
     * aplicaciones.uteq.edue.ec*
     */
//    public static String dbName = "cQf5KIlaaVd6IRjES95RoQ==";
//    public static String dbUser = "9qy+3vHmh8zClkk38dnm3g==";
//    public static String dbPassword = "Xg54kwNTey9YPcFBN6WNWWABv+Q+C4mg4xW9VO+zN7jClkk38dnm3g==";
//    public static String dbPort = "nYsIHU+jDcE=";
//    public static String dbHost = "EjCoYJyzeuQdRCjDM4JrjA==";//remoto
//    
    /**
     * bioforest.uteq.edue.ec*
     */
    public static String dbName = "KziH2Jb350TIQsgD8AMqBsKWSTfx2ebe";
    public static String dbUser = "9qy+3vHmh8zClkk38dnm3g==";
    public static String dbPassword = "Ok9kbRfRsOrgEkfJ8bouhge5dQQCpnO5ytBA+lbCxOEpTujTi/G1ORNoJ/GC0fI1nqj5cldF+8fwdA8vXBJpGZCZhyGfxpMWiunNJ5XG+y/h+wXA59Lpe+r2O2YPHAVBSy7gzFoLNMM=";
    public static String dbPort = "nYsIHU+jDcE=";
    public static String dbHost = "i+aTFOSJFYo6UcZQmtEsRg=="; //remoto

    public static String privateKey = "CleanCode&BRICEX";

    public static String protocol = "wss";
//    public static String uriWebSockeet = "://localhost:8080";
    public static String uriWebSockeet = "://localhost:443";

    private static String fileLocation = "";

    private static String StringTarget = "";//
    private static String StringReplacement = "";

    public static String proyectName = "/";

    public static String folderUser = "UserImage/";

    public static String folderProjects = "/";

    public static String getLocation(String context) {
        if (!fileLocation.equals("")) {
            context = fileLocation;
        }
        return context.replace(StringTarget, StringReplacement);
    }
}
