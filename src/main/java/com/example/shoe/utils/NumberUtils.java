package com.example.shoe.utils;

import java.text.DecimalFormat;

public class NumberUtils {
    public static String formatDoanhThu(Double doanhThu) {
        DecimalFormat df = new DecimalFormat("#,###,###");
        return df.format(doanhThu);
    }
}
