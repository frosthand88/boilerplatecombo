package com.boilerplatecombo.service;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.QueryApi;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class InfluxResearcherService {

    private InfluxDBClient client;

    public InfluxResearcherService(InfluxDBClient client) {
        this.client = client;
    }

    public void queryResearchers() {
        String fluxQuery = "from(bucket: \"mybucket\") |> range(start: -1w)";
        QueryApi queryApi = client.getQueryApi();
        queryApi.query(fluxQuery).forEach(fluxTable ->
                fluxTable.getRecords().forEach(record ->
                        System.out.printf("%s: %s%n", record.getTime(), record.getValue())
                )
        );
    }

    public void writeResearcher() {
        Point point = Point.measurement("sensor_data")
                .addTag("sensor", "s1")
                .addField("temperature", 23.5)
                .time(Instant.now(), WritePrecision.NS);
        client.getWriteApiBlocking().writePoint(point);
    }
}
