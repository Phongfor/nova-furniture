package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.ReviewRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateReviewRequest;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.ReviewResponse;

public interface ReviewService {
    ReviewResponse createReview(Long userId, ReviewRequest request);
    ReviewResponse updateReview(Long userId, Long reviewId, UpdateReviewRequest request);
    void deleteReview(Long userId, Long reviewId);
    PageResponse<ReviewResponse> getReviewsByProduct(Long productId, int page, int size);
    PageResponse<ReviewResponse> getMyReviews(Long userId, int page, int size);
    Double getAverageRating(Long productId);
}