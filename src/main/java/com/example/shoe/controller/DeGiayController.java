package com.example.shoe.controller;

import com.example.shoe.dto.request.DeGiayRequest;
import com.example.shoe.service.DeGiayService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/de-giay")
public class DeGiayController {
    DeGiayService deGiayService;

    @GetMapping("")
    public ResponseEntity<?> getDeGiay() {
        return ResponseEntity.ok(deGiayService.getDeGiay());
    }

    @PostMapping("")
    public ResponseEntity<?> createDeGiay(@RequestBody @Valid DeGiayRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deGiayService.createDeGiay(request));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getDeGiayId(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(deGiayService.getDeGiayId(id));
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateDeGiay(@PathVariable("id") Integer id, @RequestBody @Valid DeGiayRequest request) {
        return ResponseEntity.ok(deGiayService.updateDeGiay(id, request));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteDeGiay(@PathVariable("id") Integer id) {
        deGiayService.deleteDeGiay(id);
        return ResponseEntity.status(HttpStatus.OK).body("Xóa đế giày id: " + id + " thành công!");
    }
}

