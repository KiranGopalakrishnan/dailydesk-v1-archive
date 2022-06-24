package common.bifrost.client

import BifrostGrpcKt
import io.grpc.ManagedChannel
import io.grpc.ManagedChannelBuilder
import java.io.Closeable
import java.util.concurrent.TimeUnit

class Bifrost : Closeable {
    private val port = 30043
    private val channel: ManagedChannel = ManagedChannelBuilder.forAddress("localhost", port).usePlaintext().build()
    private val stub:BifrostGrpcKt.BifrostCoroutineStub by lazy { BifrostGrpcKt.BifrostCoroutineStub(channel) }

    suspend fun verify(token: String): BifrostOuterClass.User {
        val request = BifrostOuterClass.Token.newBuilder().setToken(token).build()
        return stub.verify(request)
    }

    override fun close() {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS)
    }
}