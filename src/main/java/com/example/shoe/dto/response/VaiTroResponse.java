package com.example.shoe.dto.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VaiTroResponse {
    Integer id;
    String maVaiTro;
    String tenVaiTro;
}
