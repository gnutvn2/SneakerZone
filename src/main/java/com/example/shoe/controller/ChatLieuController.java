package com.example.shoe.controller;

import com.example.shoe.dto.request.ChatLieuRequest;
import com.example.shoe.service.ChatLieuService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/chat-lieu")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatLieuController {
    ChatLieuService chatLieuService;

    @GetMapping("")
    public ResponseEntity<?> getChatLieu() {
        return ResponseEntity.ok(chatLieuService.getChatLieu());
    }

   @PostMapping("")
   public ResponseEntity<?> createChatLieu(@RequestBody @Valid ChatLieuRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(chatLieuService.createChatLieu(request));
   }

   @GetMapping("/{id}")
    public ResponseEntity<?> getChatLieuId(@PathVariable("id") Integer id){
       return ResponseEntity.ok(chatLieuService.getChatLieuId(id));
   }

   @PutMapping("{id}")
    public ResponseEntity<?> updateChatLieu(@PathVariable("id") Integer id, @RequestBody @Valid ChatLieuRequest request){
        return ResponseEntity.ok(chatLieuService.updateChatLieu(id, request));
   }

   @DeleteMapping("{id}")
    public ResponseEntity<?> deleteChatLieu(@PathVariable("id") Integer id){
        chatLieuService.deleteChatLieu(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa chất liệu thành công");
   }
}
