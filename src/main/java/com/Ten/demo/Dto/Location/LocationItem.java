package com.Ten.demo.Dto.Location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationItem {
    private String contentid;
    private String title;
    private String addr1;
    private double mapx;
    private double mapy;
    private String firstimage;
    private String tel;
    private double dist; // 현재 위치에서의 거리 (단위: m)

    // Getter/Setter
}
