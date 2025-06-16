package com.Ten.demo.Service;

import com.Ten.demo.Config.OpenApiConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class PublicDataService {

    private final OpenApiConfig openApiConfig;

    @Autowired
    public PublicDataService(OpenApiConfig openApiConfig) {
        this.openApiConfig = openApiConfig;
    }

    // ✅ 공통 호출 메서드
    public String callTourApi(String path, Map<String, String> params) {
        String baseUrl = "https://apis.data.go.kr/B551011/KorService2/" + path;

        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(baseUrl)
                .queryParam("MobileOS", "ETC")
                .queryParam("MobileApp", "AppTest")
                .queryParam("_type", "json")
                .queryParam("numOfRows", "40")
                .queryParam("pageNo", "1");

        if (params != null) {
            params.forEach(builder::queryParam);
        }

        // serviceKey는 따로 URI에 붙여서 인코딩되지 않도록 처리
        String finalUrl = builder.build(false).toUriString() + "&serviceKey=" + openApiConfig.getServiceKey();

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(finalUrl, String.class);
    }

    // ✅ 각 API 기능들 메서드

    public String getAreaCode() {
        return callTourApi("areaCode2", null);
    }

    public String getAreaBasedList(String areaCode) {
        return callTourApi("areaBasedList2", Map.of("areaCode", areaCode));
    }

    public String getFestivalList(String eventStartDate) {
        return callTourApi("searchFestival2", Map.of("eventStartDate", eventStartDate));
    }

    public String getPetTours() {
        return callTourApi("detailPetTour2", null);
    }

    public String getDetailCommon(String contentId) {
        return callTourApi("detailCommon2", Map.of("contentId", contentId));
    }

    public String getCategoryCodes() {
        return callTourApi("categoryCode2", null);
    }

    public String getLocationBased(String mapX, String mapY) {
        return callTourApi("locationBasedList2", Map.of("mapX", mapX, "mapY", mapY));
    }

    public String getKeywordSearch(String keyword) {
        return callTourApi("searchKeyword2", Map.of("keyword", keyword));
    }

    public String getStayList() {
        return callTourApi("searchStay2", null);
    }

    public String getDetailIntro(String contentId) {
        return callTourApi("detailIntro2", Map.of("contentId", contentId));
    }

    public String getDetailInfo(String contentId) {
        return callTourApi("detailInfo2", Map.of("contentId", contentId));
    }

    public String getDetailImage(String contentId) {
        return callTourApi("detailImage2", Map.of("contentId", contentId));
    }

    public String getClsSystemCode() {
        return callTourApi("clclSystmCode2", null);
    }

    public String getAreaBasedSyncList() {
        return callTourApi("areaBasedSyncList2", null);
    }

    public String getIdongCode(String areaCode) {
        return callTourApi("ldongCode2", Map.of("areaCode", areaCode));
    }

}
