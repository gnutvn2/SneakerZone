package com.example.shoe.controller;

import com.example.shoe.dto.request.MauSacRequest;
import com.example.shoe.service.MauSacService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/mau-sac")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MauSacController {
    MauSacService mauSacService;

    @GetMapping("")
    public ResponseEntity<?> getMauSac(Pageable pageable){
        return ResponseEntity.ok(mauSacService.getMauSac(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> createMauSac(@RequestBody @Valid MauSacRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(mauSacService.createMauSac(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getMauSacId(@PathVariable("id") Integer id){
        return ResponseEntity.ok(mauSacService.getMauSacId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateMauSac(@PathVariable("id") Integer id, @RequestBody @Valid MauSacRequest request){
        return ResponseEntity.ok(mauSacService.updateMauSac(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteMauSac(@PathVariable("id") Integer id){
        mauSacService.deleteMauSac(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa màu sắc có id " + id + "thành công!");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchMauSac(@RequestParam(required = false) String keyword, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(mauSacService.searchMauSac(keyword, pageable));
    }
}
