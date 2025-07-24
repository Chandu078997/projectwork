package com.example.projectwork.repository;

import com.example.projectwork.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByProjectId(Long projectId);
    int countByProjectId(Long projectId);  // For WhatsApp limit (5)
}
