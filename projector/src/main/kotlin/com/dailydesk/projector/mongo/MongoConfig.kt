package com.dailydesk.projector.mongo

import com.dailydesk.common.mongo.MongoConnectionConfig
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoDatabase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
public class MongoConfig: MongoConnectionConfig {

    @Bean
    override fun mongoClient(): MongoClient {
        return MongoClients.create("mongodb://localhost:28017")
    }

    override fun getDatabase(): MongoDatabase {
        return this.mongoClient().getDatabase("projector-main")
    }

}