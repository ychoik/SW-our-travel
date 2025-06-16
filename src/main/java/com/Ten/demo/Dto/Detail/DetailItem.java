package com.Ten.demo.Dto.Detail;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // ✅ 추가
@JsonIgnoreProperties(ignoreUnknown = true)
public class DetailItem {
    private String contentid;
    private String title;
    private String overview;
    private String addr1;
    private String tel;
    private String firstimage;
    private String homepage;

    // Getter/Setter
}
