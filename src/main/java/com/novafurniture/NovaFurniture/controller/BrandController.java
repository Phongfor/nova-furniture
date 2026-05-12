package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.dto.request.BrandRequest;
import com.novafurniture.NovaFurniture.dto.response.BrandResponse;
import com.novafurniture.NovaFurniture.service.BrandService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/brands")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BrandController {

    BrandService brandService;

    @GetMapping
    public ApiResponse<List<BrandResponse>> getAllBrands() {
        return ApiResponse.<List<BrandResponse>>builder()
                .result(brandService.getAllBrands())
                .message("Success")
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<BrandResponse> getBrandById(@PathVariable Long id) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.getBrandById(id))
                .message("Success")
                .build();
    }

    @PostMapping
    public ApiResponse<BrandResponse> createBrand(
            @RequestBody @Valid BrandRequest request) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.createBrand(request))
                .message("Brand created successfully")
                .build();
    }

    @PutMapping("/{id}")
    public ApiResponse<BrandResponse> updateBrand(
            @PathVariable Long id,
            @RequestBody @Valid BrandRequest request) {
        return ApiResponse.<BrandResponse>builder()
                .result(brandService.updateBrand(id, request))
                .message("Brand updated successfully")
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ApiResponse.<Void>builder()
                .message("Brand deleted successfully")
                .build();
    }
}