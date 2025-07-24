package com.example.projectwork.controller;

import com.example.projectwork.entity.Project;
import com.example.projectwork.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5174")
public class ProjectController {

    private final ProjectService projectService;

    // Constructor injection (no Lombok needed)
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/domain/{domainId}")
    public List<Project> getProjectsByDomain(@PathVariable Long domainId) {
        return projectService.getProjectsByDomain(domainId);
    }

    @GetMapping("/details/{projectId}")
    public Project getProjectDetails(@PathVariable Long projectId) {
        return projectService.getProjectDetails(projectId);
    }

    @PostMapping("/submit/{projectId}")
    public ResponseEntity<String> submitProject(
            @PathVariable Long projectId,
            @RequestParam Long userId,
            @RequestParam String submissionLink) {
        String result = projectService.submitProject(projectId, userId, submissionLink);
        return ResponseEntity.ok(result);
    }
}
