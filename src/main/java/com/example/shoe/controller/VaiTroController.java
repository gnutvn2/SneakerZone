package com.example.shoe.controller;

import com.example.shoe.dto.request.VaiTroRequest;
import com.example.shoe.service.VaiTroService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/vai-tro")
public class VaiTroController {
    VaiTroService vaiTroService;

    @GetMapping
    public ResponseEntity<?> getAllVaiTro() {
        return ResponseEntity.ok(vaiTroService.getAllVaiTro());
    }

    @PostMapping
    public ResponseEntity<?> createVaiTro(@RequestBody @Valid VaiTroRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vaiTroService.createVaiTro(request));
    }

    @GetMapping("/{vaiTroId}")
    public ResponseEntity<?> getOneVaiTro(@PathVariable("vaiTroId") Integer vaiTroId) {
        return ResponseEntity.ok(vaiTroService.getOneVaiTro(vaiTroId));
    }

    @PutMapping("/{vaiTroId}")
    public ResponseEntity<?> updateVaiTro(@PathVariable("vaiTroId") Integer vaiTroId,
                                          @RequestBody @Valid VaiTroRequest request) {
        return ResponseEntity.ok(vaiTroService.updateVaiTro(vaiTroId, request));
    }

    @DeleteMapping("/{vaiTroId}")
    public ResponseEntity<?> deleteVaiTro(@PathVariable("vaiTroId") Integer vaiTroId) {
        vaiTroService.deleteVaiTro(vaiTroId);
        return ResponseEntity.ok().body("Xoa vai tro co id: " + vaiTroId + " thanh cong");
    }
}
