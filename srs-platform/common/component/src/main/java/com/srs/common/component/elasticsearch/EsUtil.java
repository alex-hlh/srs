package com.srs.common.component.elasticsearch;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.elasticsearch.client.Request;
import org.elasticsearch.client.Response;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * Elasticsearch utility
 */
@Slf4j
@Component
public class EsUtil {

    @Value("${elasticsearch.host:localhost}")
    private String host;

    @Value("${elasticsearch.port:9200}")
    private int port;

    @Value("${elasticsearch.scheme:http}")
    private String scheme;

    private RestClient restClient;

    @PostConstruct
    public void init() {
        restClient = RestClient.builder(new HttpHost(host, port, scheme)).build();
    }

    @PreDestroy
    public void destroy() {
        try {
            if (restClient != null) {
                restClient.close();
            }
        } catch (IOException e) {
            log.error("Failed to close Elasticsearch client", e);
        }
    }

    /**
     * Execute GET request
     */
    public Map<String, Object> get(String index, String id) throws IOException {
        Request request = new Request("GET", "/" + index + "/_doc/" + id);
        Response response = restClient.performRequest(request);
        return parseResponse(response);
    }

    /**
     * Execute search request
     */
    public Map<String, Object> search(String index, String query) throws IOException {
        Request request = new Request("POST", "/" + index + "/_search");
        request.setJsonEntity(query);
        Response response = restClient.performRequest(request);
        return parseResponse(response);
    }

    /**
     * Execute index request
     */
    public void index(String index, String id, String jsonBody) throws IOException {
        Request request = new Request("PUT", "/" + index + "/_doc/" + id);
        request.setJsonEntity(jsonBody);
        restClient.performRequest(request);
    }

    /**
     * Execute delete request
     */
    public void delete(String index, String id) throws IOException {
        Request request = new Request("DELETE", "/" + index + "/_doc/" + id);
        restClient.performRequest(request);
    }

    /**
     * Parse response to map
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> parseResponse(Response response) throws IOException {
        try (InputStream inputStream = response.getEntity().getContent()) {
            return new com.fasterxml.jackson.databind.ObjectMapper().readValue(inputStream, Map.class);
        }
    }

    /**
     * Get rest client
     */
    public RestClient getRestClient() {
        return restClient;
    }
}
