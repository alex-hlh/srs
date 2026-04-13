package com.srs.common.component.rocketMQ;

import lombok.extern.slf4j.Slf4j;
import org.apache.rocketmq.client.producer.SendResult;
import org.apache.rocketmq.client.producer.SendStatus;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

/**
 * RocketMQ producer
 */
@Slf4j
@Component
public class MQProducer {

    @Autowired
    private RocketMQTemplate rocketMQTemplate;

    /**
     * Send message
     */
    public boolean send(String topic, String body) {
        try {
            Message message = MessageBuilder.withBody(body.getBytes(StandardCharsets.UTF_8)).build();
            SendResult sendResult = rocketMQTemplate.syncSend(topic, message);
            return sendResult.getSendStatus() == SendStatus.SEND_OK;
        } catch (Exception e) {
            log.error("Failed to send message to topic: {}", topic, e);
            return false;
        }
    }

    /**
     * Send message with key
     */
    public boolean send(String topic, String key, String body) {
        try {
            Message message = MessageBuilder.withBody(body.getBytes(StandardCharsets.UTF_8))
                    .setHeader("KEYS", key)
                    .build();
            SendResult sendResult = rocketMQTemplate.syncSend(topic, message);
            return sendResult.getSendStatus() == SendStatus.SEND_OK;
        } catch (Exception e) {
            log.error("Failed to send message to topic: {}, key: {}", topic, key, e);
            return false;
        }
    }

    /**
     * Send message in JSON format
     */
    public boolean sendJson(String topic, Object obj) {
        try {
            SendResult sendResult = rocketMQTemplate.syncSend(topic, obj);
            return sendResult.getSendStatus() == SendStatus.SEND_OK;
        } catch (Exception e) {
            log.error("Failed to send JSON message to topic: {}", topic, e);
            return false;
        }
    }

    /**
     * Send message with delay level (RocketMQ supports delay levels 1-18)
     */
    public boolean sendDelay(String topic, String body, int delayLevel) {
        try {
            Message message = MessageBuilder.withBody(body.getBytes(StandardCharsets.UTF_8)).build();
            SendResult sendResult = rocketMQTemplate.syncSend(topic, message, 3000, delayLevel);
            return sendResult.getSendStatus() == SendStatus.SEND_OK;
        } catch (Exception e) {
            log.error("Failed to send delay message to topic: {}", topic, e);
            return false;
        }
    }
}
