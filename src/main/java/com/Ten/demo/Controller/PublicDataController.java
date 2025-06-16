package com.Ten.demo.Controller;


import com.Ten.demo.Dto.Area.AreaBasedItem;
import com.Ten.demo.Dto.Area.AreaBasedListResponse;
import com.Ten.demo.Dto.Area.AreaCodeResponse;
import com.Ten.demo.Dto.Area.Region;
import com.Ten.demo.Dto.Category.CategoryCodeItem;
import com.Ten.demo.Dto.Category.CategoryCodeResponse;
import com.Ten.demo.Dto.Detail.*;
import com.Ten.demo.Dto.Festival.FestivalItem;
import com.Ten.demo.Dto.Festival.FestivalResponse;
import com.Ten.demo.Dto.Keyword.KeywordSearchItem;
import com.Ten.demo.Dto.Keyword.SearchKeywordResponse;
import com.Ten.demo.Dto.Location.LocationBasedResponse;
import com.Ten.demo.Dto.Location.LocationItem;
import com.Ten.demo.Dto.Stay.StayItem;
import com.Ten.demo.Dto.Stay.StayResponse;
import com.Ten.demo.Dto.Subregion.SubRegionItem;
import com.Ten.demo.Dto.Subregion.SubRegionResponse;
import com.Ten.demo.Dto.Sync.AreaBasedSyncResponse;
import com.Ten.demo.Dto.Sync.SyncContentItem;
import com.Ten.demo.Dto.SystemCode.SystemCodeItem;
import com.Ten.demo.Dto.SystemCode.SystemCodeResponse;
import com.Ten.demo.Service.PublicDataService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@RestController
@RequestMapping("/tour")
public class PublicDataController {

    private final PublicDataService publicDataService;
    private final ObjectMapper objectMapper;

    @Autowired
    public PublicDataController(PublicDataService publicDataService, ObjectMapper objectMapper) {
        this.publicDataService = publicDataService;
        this.objectMapper = objectMapper;
    }

    // ✅ 공통 JSON 파싱 메서드
    private <T, R> List<R> parseResponse(String json, Class<T> responseClass, Function<T, List<R>> extractor) {
        try {
            T response = objectMapper.readValue(json, responseClass);
            return Optional.ofNullable(response)
                    .map(extractor)
                    .orElse(Collections.emptyList());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @GetMapping("/area")
    public List<Region> areaCode() {
        return parseResponse(
                publicDataService.getAreaCode(),
                AreaCodeResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/area-based")
    public List<AreaBasedItem> areaBased(@RequestParam String areaCode) {
        return parseResponse(
                publicDataService.getAreaBasedList(areaCode),
                AreaBasedListResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/festival")
    public List<FestivalItem> festivals(@RequestParam String eventStartDate) {
        return parseResponse(
                publicDataService.getFestivalList(eventStartDate),
                FestivalResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/pet-tours")
    public String petTours() {
        return publicDataService.getPetTours(); // (DTO 구현 전이므로 생략)
    }

    @GetMapping("/detail-common")
    public List<DetailItem> detailCommon(@RequestParam String contentId) {
        return parseResponse(
                publicDataService.getDetailCommon(contentId),
                DetailCommonResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/category-codes")
    public List<CategoryCodeItem> categories() {
        return parseResponse(
                publicDataService.getCategoryCodes(),
                CategoryCodeResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/location")
    public List<LocationItem> location(@RequestParam String mapX, @RequestParam String mapY) {
        return parseResponse(
                publicDataService.getLocationBased(mapX, mapY),
                LocationBasedResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/search-keyword")
    public List<KeywordSearchItem> keyword(@RequestParam String keyword) {
        return parseResponse(
                publicDataService.getKeywordSearch(keyword),
                SearchKeywordResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/stay")
    public List<StayItem> stay() {
        String json = publicDataService.getStayList();

        // ✅ 여기에 JSON 응답 출력
        System.out.println(">>> 받은 JSON: " + json);
        return parseResponse(
                publicDataService.getStayList(),
                StayResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/detail-intro")
    public List<DetailIntroItem> detailIntro(@RequestParam String contentId) {
        return parseResponse(
                publicDataService.getDetailIntro(contentId),
                DetailIntroResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/detail-info")
    public List<DetailInfoItem> detailInfo(@RequestParam String contentId) {
        return parseResponse(
                publicDataService.getDetailInfo(contentId),
                DetailInfoResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/detail-image")
    public List<DetailImageItem> detailImage(@RequestParam String contentId) {
        return parseResponse(
                publicDataService.getDetailImage(contentId),
                DetailImageResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/cls-code")
    public List<SystemCodeItem> clsSystemCode() {
        return parseResponse(
                publicDataService.getClsSystemCode(),
                SystemCodeResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/area-sync")
    public List<SyncContentItem> areaSync() {
        return parseResponse(
                publicDataService.getAreaBasedSyncList(),
                AreaBasedSyncResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

    @GetMapping("/ldong-code")
    public List<SubRegionItem> idong(@RequestParam String areaCode) {
        return parseResponse(
                publicDataService.getIdongCode(areaCode),
                SubRegionResponse.class,
                res -> res.getResponse().getBody().getItems().getItem()
        );
    }

}


