package com.learning.library2.service;

import com.learning.library2.entity.Category;

import java.util.List;

public interface CategoryService {

    List<Category> findAllCategories();

    Category findCategoryById(Long id);

    boolean createCategory(Category category);

    boolean updateCategory(Category category);

    void deleteCategory(Long id);
}
