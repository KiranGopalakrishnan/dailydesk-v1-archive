import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.46.0)",
    comments = "Source: bifrost.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class BifrostGrpc {

  private BifrostGrpc() {}

  public static final String SERVICE_NAME = "Bifrost";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<BifrostOuterClass.Token,
      BifrostOuterClass.User> getVerifyMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Verify",
      requestType = BifrostOuterClass.Token.class,
      responseType = BifrostOuterClass.User.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<BifrostOuterClass.Token,
      BifrostOuterClass.User> getVerifyMethod() {
    io.grpc.MethodDescriptor<BifrostOuterClass.Token, BifrostOuterClass.User> getVerifyMethod;
    if ((getVerifyMethod = BifrostGrpc.getVerifyMethod) == null) {
      synchronized (BifrostGrpc.class) {
        if ((getVerifyMethod = BifrostGrpc.getVerifyMethod) == null) {
          BifrostGrpc.getVerifyMethod = getVerifyMethod =
              io.grpc.MethodDescriptor.<BifrostOuterClass.Token, BifrostOuterClass.User>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Verify"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  BifrostOuterClass.Token.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  BifrostOuterClass.User.getDefaultInstance()))
              .setSchemaDescriptor(new BifrostMethodDescriptorSupplier("Verify"))
              .build();
        }
      }
    }
    return getVerifyMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static BifrostStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<BifrostStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<BifrostStub>() {
        @java.lang.Override
        public BifrostStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new BifrostStub(channel, callOptions);
        }
      };
    return BifrostStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static BifrostBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<BifrostBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<BifrostBlockingStub>() {
        @java.lang.Override
        public BifrostBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new BifrostBlockingStub(channel, callOptions);
        }
      };
    return BifrostBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static BifrostFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<BifrostFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<BifrostFutureStub>() {
        @java.lang.Override
        public BifrostFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new BifrostFutureStub(channel, callOptions);
        }
      };
    return BifrostFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class BifrostImplBase implements io.grpc.BindableService {

    /**
     */
    public void verify(BifrostOuterClass.Token request,
        io.grpc.stub.StreamObserver<BifrostOuterClass.User> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getVerifyMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getVerifyMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                BifrostOuterClass.Token,
                BifrostOuterClass.User>(
                  this, METHODID_VERIFY)))
          .build();
    }
  }

  /**
   */
  public static final class BifrostStub extends io.grpc.stub.AbstractAsyncStub<BifrostStub> {
    private BifrostStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected BifrostStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new BifrostStub(channel, callOptions);
    }

    /**
     */
    public void verify(BifrostOuterClass.Token request,
        io.grpc.stub.StreamObserver<BifrostOuterClass.User> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getVerifyMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class BifrostBlockingStub extends io.grpc.stub.AbstractBlockingStub<BifrostBlockingStub> {
    private BifrostBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected BifrostBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new BifrostBlockingStub(channel, callOptions);
    }

    /**
     */
    public BifrostOuterClass.User verify(BifrostOuterClass.Token request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getVerifyMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class BifrostFutureStub extends io.grpc.stub.AbstractFutureStub<BifrostFutureStub> {
    private BifrostFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected BifrostFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new BifrostFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<BifrostOuterClass.User> verify(
        BifrostOuterClass.Token request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getVerifyMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_VERIFY = 0;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final BifrostImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(BifrostImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_VERIFY:
          serviceImpl.verify((BifrostOuterClass.Token) request,
              (io.grpc.stub.StreamObserver<BifrostOuterClass.User>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class BifrostBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    BifrostBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return BifrostOuterClass.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("Bifrost");
    }
  }

  private static final class BifrostFileDescriptorSupplier
      extends BifrostBaseDescriptorSupplier {
    BifrostFileDescriptorSupplier() {}
  }

  private static final class BifrostMethodDescriptorSupplier
      extends BifrostBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    BifrostMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (BifrostGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new BifrostFileDescriptorSupplier())
              .addMethod(getVerifyMethod())
              .build();
        }
      }
    }
    return result;
  }
}
