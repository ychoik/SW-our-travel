package com.Ten.demo.Dto.Response;

import com.Ten.demo.Dto.Area.Region;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RegionList {
    @JsonProperty("item")
    private List<Region> region;

    public List<Region> getRegion() {
        return region;
    }

    public void setRegion(List<Region> region) {
        this.region = region;
    }
}

