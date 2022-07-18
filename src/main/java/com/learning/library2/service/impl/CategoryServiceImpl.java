package com.learning.library2.service.impl;

import com.learning.library2.entity.Category;
import com.learning.library2.exception.ResourceNotFoundException;
import com.learning.library2.repository.CategoryRepository;
import com.learning.library2.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with Id = " + id));
    }

    @Override
    public boolean createCategory(Category category) {
        boolean existsByName = categoryRepository.existsByName(category.getName());
        if (existsByName) {
            return false;
        }
        categoryRepository.save(category);
        return true;
    }

    @Override
    public boolean updateCategory(Category category) {
        Category categoryByName = categoryRepository.findByName(category.getName());
        if (Objects.isNull(categoryByName) || categoryByName.getId() == category.getId()) {
            categoryRepository.save(category);
            return true;
        }
        return false;
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with Id = " + id));
        categoryRepository.deleteById(id);
    }
}
