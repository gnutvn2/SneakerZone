package com.example.shoe.service.impl;

import com.example.shoe.dto.request.ChiTietSanPhamRequest;
import com.example.shoe.dto.response.ChiTietSanPhamResponse;
import com.example.shoe.entity.*;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.*;
import com.example.shoe.service.ChiTietSanPhamService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ChiTietSanPhamImpl implements ChiTietSanPhamService {
    Logger logger = LoggerFactory.getLogger(ChiTietSanPhamImpl.class);
    ChiTietSanPhamRepository chiTietSanPhamRepository;
    ShoeMapper shoeMapper;
    SanPhamRepository sanPhamRepository;
    MauSacRepository mauSacRepository;
    SizeRepository sizeRepository;
    ChatLieuRepository chatLieuRepository;
    DeGiayRepository deGiayRepository;
//    DotGiamGiaRepository dotGiamGiaRepository;

    @Override
    public Page<ChiTietSanPhamResponse> getAllChiTietSanPham(Pageable pageable) {
        return chiTietSanPhamRepository.findAll(pageable)
                .map(shoeMapper::toChiTietSanPhamResponse);
    }

    @Override
    public ChiTietSanPhamResponse getChiTietSanPhamById(Integer id) {
        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(id + " chi tiết sản phẩm không tồn tại!"));
        return shoeMapper.toChiTietSanPhamResponse(chiTietSanPham);
    }

    @Override
    public ChiTietSanPhamResponse createChiTietSanPham(ChiTietSanPhamRequest request) {
        ChiTietSanPham chiTietSanPham = shoeMapper.toChiTietSanPham(request);
        return shoeMapper.toChiTietSanPhamResponse(chiTietSanPhamRepository.save(chiTietSanPham));
    }


    @Override
    public ChiTietSanPhamResponse updateChiTietSanPham(Integer id, ChiTietSanPhamRequest request) {
        logger.info("Cập nhật chi tiết sản phẩm với ID: " + id);

        ChiTietSanPham chiTietSanPham = chiTietSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chi tiết sản phẩm không tồn tại!"));

        if (request.getSanPhamId() != null) {
            SanPham sanPham = sanPhamRepository.findById(request.getSanPhamId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại!"));
            chiTietSanPham.setSanPham(sanPham);
        }

        if (request.getSizeId() != null) {
            Size size = sizeRepository.findById(request.getSizeId())
                    .orElseThrow(() -> new RuntimeException("Size không tồn tại!"));
            chiTietSanPham.setSize(size);
        }

        if (request.getMauSacId() != null) {
            MauSac mauSac = mauSacRepository.findById(request.getMauSacId())
                    .orElseThrow(() -> new RuntimeException("Màu sắc không tồn tại!"));
            chiTietSanPham.setMauSac(mauSac);
        }

        if (request.getChatLieuId() != null) {
            ChatLieu chatLieu = chatLieuRepository.findById(request.getChatLieuId())
                    .orElseThrow(() -> new RuntimeException("Chất liệu không tồn tại!"));
            chiTietSanPham.setChatLieu(chatLieu);
        }

        if (request.getDeGiayId() != null) {
            DeGiay deGiay = deGiayRepository.findById(request.getDeGiayId())
                    .orElseThrow(() -> new RuntimeException("Đế giày không tồn tại!"));
            chiTietSanPham.setDeGiay(deGiay);
        }


        shoeMapper.toUpdateChiTietSanPham(chiTietSanPham, request);

        ChiTietSanPham updateChiTietSanPham = chiTietSanPhamRepository.save(chiTietSanPham);

        return shoeMapper.toChiTietSanPhamResponse(updateChiTietSanPham);

    }

    @Override

    public void deleteChiTietSanPham(Integer id) {
        ChiTietSanPham existingChiTietSanPham = chiTietSanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chi tiết sản phẩm không tồn tại"));
        chiTietSanPhamRepository.delete(existingChiTietSanPham);
    }

    @Override
    public Page<ChiTietSanPhamResponse> searchChiTietSanPham(String keyword, Pageable pageable) {
        if (keyword == null || keyword.isEmpty()) {
            return chiTietSanPhamRepository.findAll(pageable)
                    .map(shoeMapper::toChiTietSanPhamResponse);
        }
        return chiTietSanPhamRepository.searchChiTietSanPham(keyword, pageable)
                .map(shoeMapper::toChiTietSanPhamResponse);
    }


    @Override
    public Page<ChiTietSanPhamResponse> filterChiTietSanPham(String maChiTietSanPham,
                                                             Optional<Integer> sanPhamId,
                                                             Optional<Integer> sizeId,
                                                             Optional<Integer> mauSacId,
                                                             Optional<Integer> chatLieuId,
                                                             Optional<Double> giaMin,
                                                             Optional<Double> giaMax,
                                                             Optional<Integer> deGiayId,
                                                             Pageable pageable) {
        Page<ChiTietSanPham> chiTietSanPhamPage = chiTietSanPhamRepository.locChiTietSanPham(
                sanPhamId.orElse(null),
                sizeId.orElse(null),
                mauSacId.orElse(null),
                chatLieuId.orElse(null),
                giaMin.orElse(null),
                giaMax.orElse(null),
                deGiayId.orElse(null),
                pageable
        );

        return chiTietSanPhamPage.map(shoeMapper::toChiTietSanPhamResponse);
    }


}
