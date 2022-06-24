package com.dailydesk.common.mongo

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoDatabase
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Component

@Configuration
public interface MongoConnectionConfig {

    public fun mongoClient(): MongoClient

    public fun getDatabase(): MongoDatabase

}