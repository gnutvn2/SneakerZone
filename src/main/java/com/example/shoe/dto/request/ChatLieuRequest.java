package com.example.shoe.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ChatLieuRequest {
    @NotBlank(message = "Mã chất liệu không được để trống")
    String maChatLieu;

    @NotBlank(message = "Tên chất liệu không được để trống")
    String tenChatLieu;
}

