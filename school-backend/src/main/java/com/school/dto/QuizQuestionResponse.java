package  com.school.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class QuizQuestionResponse {

    private Long id;
    private String question;
    private List<String> options;
}
