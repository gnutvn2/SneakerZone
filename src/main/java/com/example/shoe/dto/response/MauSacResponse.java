package com.example.shoe.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class MauSacResponse {
    Integer id;
    String maMauSac;
    String tenMauSac;
}
