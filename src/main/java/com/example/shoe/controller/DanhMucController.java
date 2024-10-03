package com.example.shoe.controller;

import com.example.shoe.dto.request.DanhMucRequest;
import com.example.shoe.entity.DanhMuc;
import com.example.shoe.service.DanhMucService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/danh-muc")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DanhMucController {
    DanhMucService danhMucService;

    @GetMapping("")
    public ResponseEntity<?> getAllDanhMuc(Pageable pageable){
        Page<DanhMuc> danhMuc = danhMucService.getDanhMuc(pageable);
        return ResponseEntity.ok(danhMuc);
    }

    @PostMapping("")
    public ResponseEntity<?> createDanhMuc(@RequestBody @Valid DanhMucRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(danhMucService.createDanhMuc(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getDanhMucId(@PathVariable("id") Integer id){
        return ResponseEntity.ok(danhMucService.getDanhMucId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateDanhMuc(@PathVariable("id") Integer id, @RequestBody @Valid DanhMucRequest request){
        return ResponseEntity.ok(danhMucService.updateDanhMuc(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDanhMuc(@PathVariable("id") Integer id){
        danhMucService.deleteDanhMuc(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa danh mục thành công");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchDanhMuc(@RequestParam(required = false) String keyword, Pageable pageable){
        Page<DanhMuc> result = danhMucService.searchDanhMuc(keyword, pageable);
        return ResponseEntity.ok(result);
    }
}
