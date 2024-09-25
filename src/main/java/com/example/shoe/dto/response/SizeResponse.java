package com.example.shoe.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class SizeResponse {
    Integer id;
    String maSize;
    String tenSize;
}
