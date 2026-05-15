package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.request.ReviewRequest;
import com.novafurniture.NovaFurniture.dto.request.UpdateReviewRequest;
import com.novafurniture.NovaFurniture.dto.response.PageResponse;
import com.novafurniture.NovaFurniture.dto.response.ReviewResponse;
import com.novafurniture.NovaFurniture.entity.Review;
import com.novafurniture.NovaFurniture.entity.Product;
import com.novafurniture.NovaFurniture.entity.User;
import com.novafurniture.NovaFurniture.enums.OrderStatus;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.mapper.ReviewMapper;
import com.novafurniture.NovaFurniture.repository.*;
import com.novafurniture.NovaFurniture.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository  reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository    userRepository;
    private final OrderRepository   orderRepository;
    private final ReviewMapper      reviewMapper;

    @Override
    @Transactional
    public ReviewResponse createReview(Long userId, ReviewRequest request) {
        // Kiểm tra đã review chưa
        if (reviewRepository.existsByUserIdAndProductId(userId, request.getProductId())) {
            throw new AppException(ErrorCode.REVIEW_ALREADY_EXISTS);
        }

        // Kiểm tra đã mua và DELIVERED chưa
        boolean hasPurchased = orderRepository.findByUserId(userId, Pageable.unpaged())
                .getContent().stream()
                .anyMatch(order ->
                        order.getStatus() == OrderStatus.DELIVERED &&
                                order.getItems().stream()
                                        .anyMatch(item -> item.getProductId().equals(request.getProductId()))
                );

        if (!hasPurchased) {
            throw new AppException(ErrorCode.REVIEW_NOT_PURCHASED);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        Review review = Review.builder()
                .user(user)
                .product(product)
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return reviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional
    public ReviewResponse updateReview(Long userId, Long reviewId, UpdateReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));

        if (!review.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        return reviewMapper.toResponse(reviewRepository.save(review));
    }

    @Override
    @Transactional
    public void deleteReview(Long userId, Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new AppException(ErrorCode.REVIEW_NOT_FOUND));

        if (!review.getUser().getId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        reviewRepository.delete(review);
    }

    @Override
    public PageResponse<ReviewResponse> getReviewsByProduct(Long productId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Review> reviews = reviewRepository.findByProductId(productId, pageable);
        return buildPageResponse(reviews);
    }

    @Override
    public PageResponse<ReviewResponse> getMyReviews(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Review> reviews = reviewRepository.findByUserId(userId, pageable);
        return buildPageResponse(reviews);
    }

    @Override
    public Double getAverageRating(Long productId) {
        return reviewRepository.findAverageRatingByProductId(productId);
    }

    private PageResponse<ReviewResponse> buildPageResponse(Page<Review> page) {
        return PageResponse.<ReviewResponse>builder()
                .content(page.getContent().stream().map(reviewMapper::toResponse).toList())
                .pageNumber(page.getNumber())
                .pageSize(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }
}