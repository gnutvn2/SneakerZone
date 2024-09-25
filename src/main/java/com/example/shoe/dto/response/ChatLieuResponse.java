package com.example.shoe.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatLieuResponse {
    Integer id;
    String maChatLieu;
    String tenChatLieu;
}
