package com.learning.library2.controller.api;

import com.learning.library2.entity.Category;
import com.learning.library2.payload.MessageResponse;
import com.learning.library2.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryApi {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> findAllCategories() {
        return categoryService.findAllCategories();
    }

    @GetMapping("/{id}")
    public Category findCategory(@PathVariable Long id) {
        return categoryService.findCategoryById(id);
    }


}
