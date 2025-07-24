package com.example.projectwork.service;

import com.example.projectwork.entity.Project;
import com.example.projectwork.entity.Submission;
import com.example.projectwork.repository.ProjectRepository;
import com.example.projectwork.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final SubmissionRepository submissionRepository;

    // Constructor Injection (Spring Boot will inject dependencies automatically)
    public ProjectService(ProjectRepository projectRepository, SubmissionRepository submissionRepository) {
        this.projectRepository = projectRepository;
        this.submissionRepository = submissionRepository;
    }

    // Fetch projects by domain
    public List<Project> getProjectsByDomain(Long domainId) {
        return projectRepository.findByDomainId(domainId);
    }

    // Fetch project details by ID
    public Project getProjectDetails(Long projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    // Handle project submission
    public String submitProject(Long projectId, Long userId, String submissionLink) {
        Submission submission = new Submission();
        submission.setProjectId(projectId);
        submission.setUserId(userId);
        submission.setSubmissionLink(submissionLink);
        submissionRepository.save(submission);

        return "Project submitted successfully!";
    }
}
