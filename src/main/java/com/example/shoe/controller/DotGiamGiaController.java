package com.example.shoe.controller;

import com.example.shoe.dto.request.DotGiamGiaRequest;
import com.example.shoe.service.DotGiamGiaService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/dot-giam-gia")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class DotGiamGiaController {
    DotGiamGiaService dotGiamGiaService;

    @GetMapping("")
    public ResponseEntity<?> getDotGiamGia(){
        return ResponseEntity.ok(dotGiamGiaService.getDotGiamGia());
    }

    @PostMapping("")
    public ResponseEntity<?> createDotGiamGia(@RequestBody @Valid DotGiamGiaRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(dotGiamGiaService.createDotGiamGia(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getDotGiamGiaId(@PathVariable("id") Integer id){
        return ResponseEntity.ok(dotGiamGiaService.getDotGiamGiaId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateDotGiamGia(@PathVariable("id") Integer id, @RequestBody @Valid DotGiamGiaRequest request){
        return ResponseEntity.ok(dotGiamGiaService.updateDotGiamGia(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDotGiamGia(@PathVariable("id") Integer id){
        dotGiamGiaService.deleteDotGiamGiamGia(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa đợt giảm giá thành công!");
    }
}
