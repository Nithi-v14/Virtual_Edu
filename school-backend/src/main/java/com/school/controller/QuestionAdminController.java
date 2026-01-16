package com.school.controller;

import com.school.service.QuestionImportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/questions")
@RequiredArgsConstructor
public class QuestionAdminController {

    private final QuestionImportService questionImportService;

    @PostMapping("/import")
    public String importQuestions() throws Exception {
        questionImportService.importQuestions();
        return "Questions imported successfully";
    }
}
