package com.Ten.demo.Dto.Subregion;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubRegionItem {
    private String code;   // 읍면동 코드
    private String name;   // 이름 (예: 종로구, 중구)
    private int rnum;      // 정렬 번호 (optional)

    // Getter/Setter
}
