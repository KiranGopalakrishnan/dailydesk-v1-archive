package com.dailydesk.common.mongo

import org.springframework.stereotype.Component

@Component
class CollectionFactory(
        private val mongoConfig: MongoConnectionConfig
) {
    public fun <T> create(collection:String, mapper: DocumentMapper<T>):EntityCollection<T>{
        val db = mongoConfig.getDatabase()
        //db.createCollection(collection)
        return EntityCollectionImpl<T>(collectionName = collection,db = db ,mapper = mapper);
    }

}