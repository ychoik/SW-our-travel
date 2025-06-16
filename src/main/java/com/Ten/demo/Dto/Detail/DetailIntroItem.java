package com.Ten.demo.Dto.Detail;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailIntroItem {
    private String contentid;
    private String accomcount;
    private String chkbabycarriage;
    private String chkpet;
    private String infocenter;

    // 관광지, 숙박 등에 따라 다양한 필드가 존재 가능
    // Getter/Setter
}
