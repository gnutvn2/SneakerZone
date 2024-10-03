package com.example.shoe.controller;

import com.example.shoe.dto.request.SizeRequest;
import com.example.shoe.service.SizeService;
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
@RequestMapping("/size")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SizeController {
    SizeService sizeService;

    @GetMapping("")
    public ResponseEntity<?> getSize(Pageable pageable){
        return ResponseEntity.ok(sizeService.getSize(pageable));
    }

    @PostMapping("")
    public ResponseEntity<?> createSize(@RequestBody @Valid SizeRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(sizeService.createSize(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getSizeId(@PathVariable("id") Integer id){
        return ResponseEntity.ok(sizeService.getSizeId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateSize(@PathVariable("id") Integer id, @RequestBody @Valid SizeRequest request){
        return ResponseEntity.ok(sizeService.updateSize(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteSize(@PathVariable("id") Integer id){
        sizeService.deleteSize(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa size có id: " + id + " thành công!");
    }

    @GetMapping("/seacrh")
    public ResponseEntity<?> searchSize(@RequestParam(required = false) String keyword, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(sizeService.searchSize(keyword, pageable));
    }
}
