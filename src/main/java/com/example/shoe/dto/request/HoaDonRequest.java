package com.example.shoe.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HoaDonRequest {
    String maHoaDon;
    LocalDateTime ngayTao;
    Double tongTien;
    String trangThai;
    Integer nhanVienId;
    Integer khachHangId;
}
