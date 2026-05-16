package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.config.CustomUserDetails;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.WishlistItemResponse;
import com.novafurniture.NovaFurniture.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/wishlist")
@RequiredArgsConstructor
@Tag(name = "Wishlist", description = "Wishlist management")
@SecurityRequirement(name = "bearerAuth")
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    @Operation(summary = "Get my wishlist")
    public ResponseEntity<ApiResponse<PageResponse<WishlistItemResponse>>> getMyWishlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(wishlistService.getMyWishlist(
                        userDetails.getId(), page, size)));
    }

    @PostMapping("/{productId}/toggle")
    @Operation(summary = "Toggle wishlist (add if not exists, remove if exists)")
    public ResponseEntity<ApiResponse<Map<String, Object>>> toggleWishlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long productId) {

        WishlistItemResponse item = wishlistService.toggleWishlist(
                userDetails.getId(), productId);

        if (item == null) {
            return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                    .code(1000)
                    .message("Removed from wishlist")
                    .result(Map.of("wishlisted", false))
                    .build());
        } else {
            return ResponseEntity.ok(ApiResponse.<Map<String, Object>>builder()
                    .code(1000)
                    .message("Added to wishlist")
                    .result(Map.of("wishlisted", true, "item", item))
                    .build());
        }
    }

    @GetMapping("/{productId}/check")
    @Operation(summary = "Check if product is in wishlist")
    public ResponseEntity<ApiResponse<Boolean>> checkWishlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long productId) {
        return ResponseEntity.ok(
                ApiResponse.success(wishlistService.isWishlisted(
                        userDetails.getId(), productId)));
    }
}