package com.learning.library2.controller;

import com.learning.library2.entity.Category;
import com.learning.library2.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public String findAllCategories(Model model) {
        model.addAttribute("categories", categoryService.findAllCategories());
        return "categories";
    }

    @GetMapping("/categories/new")
    public String createCategoryForm(Category category, Model model) {
        if (category.getName() == null) {
            category = new Category();
            model.addAttribute("category", category);
            model.addAttribute("success", true);
        } else {
            model.addAttribute("success", false);
        }
        return "create-category";
    }

    @PostMapping("/categories")
    public String saveCategory(@ModelAttribute("category") Category category, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "create-author";
        }
        boolean isSuccess = categoryService.createCategory(category);
        if (isSuccess) {
            return "redirect:/categories";
        } else {
            model.addAttribute("category", category);
            model.addAttribute("success", false);
            return createCategoryForm(category, model);
        }
    }

    @GetMapping("/categories/edit/{id}")
    public String updateCategoryForm(@PathVariable Long id, Model model) {
        if (!model.containsAttribute("category")) {
            model.addAttribute("category", categoryService.findCategoryById(id));
            model.addAttribute("success", true);
        }
        else model.addAttribute("success", false);
        return "update-category";
    }

    @PostMapping("/categories/{id}")
    public String updateCategory(@PathVariable Long id, @ModelAttribute("category") Category category, Model model) {
        Category category1 = categoryService.findCategoryById(id);
        category1.setName(category.getName());

        boolean isSuccess = categoryService.updateCategory(category1);
        if (isSuccess) {
            return "redirect:/categories";
        } else {
            return updateCategoryForm(id, model);
        }
    }

    @GetMapping("/categories/delete/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return "redirect:/categories";
    }
}
