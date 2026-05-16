package com.novafurniture.NovaFurniture.controller;

import com.novafurniture.NovaFurniture.common.response.ApiResponse;
import com.novafurniture.NovaFurniture.config.CustomUserDetails;
import com.novafurniture.NovaFurniture.dto.request.ReviewRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateReviewRequest;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.ReviewResponse;
import com.novafurniture.NovaFurniture.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
@Tag(name = "Review", description = "Product review management")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/product/{productId}")
    @Operation(summary = "Get reviews by product")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> getByProduct(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(reviewService.getReviewsByProduct(productId, page, size)));
    }

    @GetMapping("/product/{productId}/rating")
    @Operation(summary = "Get average rating of product")
    public ResponseEntity<ApiResponse<Double>> getAverageRating(
            @PathVariable Long productId) {
        return ResponseEntity.ok(
                ApiResponse.success(reviewService.getAverageRating(productId)));
    }

    @GetMapping("/my")
    @Operation(summary = "Get my reviews")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PageResponse<ReviewResponse>>> getMyReviews(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(
                ApiResponse.success(reviewService.getMyReviews(userDetails.getId(), page, size)));
    }

    @PostMapping
    @Operation(summary = "Create a review (must have purchased product)")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<ReviewResponse>> createReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(reviewService.createReview(userDetails.getId(), request)));
    }

    @PutMapping("/{reviewId}")
    @Operation(summary = "Update my review")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<ReviewResponse>> updateReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long reviewId,
            @Valid @RequestBody UpdateReviewRequest request) {
        return ResponseEntity.ok(
                ApiResponse.success(reviewService.updateReview(
                        userDetails.getId(), reviewId, request)));
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Delete my review")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable Long reviewId) {
        reviewService.deleteReview(userDetails.getId(), reviewId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}