// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             (unknown)
// source: multisig/v1/multisig.proto

package multisigpb

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// MultisigServiceClient is the client API for MultisigService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type MultisigServiceClient interface {
	// Read
	Multisigs(ctx context.Context, in *MultisigsRequest, opts ...grpc.CallOption) (*MultisigsResponse, error)
	MultisigInfo(ctx context.Context, in *MultisigInfoRequest, opts ...grpc.CallOption) (*MultisigInfoResponse, error)
	Transactions(ctx context.Context, in *TransactionsRequest, opts ...grpc.CallOption) (*TransactionsResponse, error)
	TransactionsCounts(ctx context.Context, in *TransactionsCountsRequest, opts ...grpc.CallOption) (*TransactionsCountsResponse, error)
	// Write
	CreateOrJoinMultisig(ctx context.Context, in *CreateOrJoinMultisigRequest, opts ...grpc.CallOption) (*CreateOrJoinMultisigResponse, error)
	LeaveMultisig(ctx context.Context, in *LeaveMultisigRequest, opts ...grpc.CallOption) (*LeaveMultisigResponse, error)
	CreateTransaction(ctx context.Context, in *CreateTransactionRequest, opts ...grpc.CallOption) (*CreateTransactionResponse, error)
	SignTransaction(ctx context.Context, in *SignTransactionRequest, opts ...grpc.CallOption) (*SignTransactionResponse, error)
	CompleteTransaction(ctx context.Context, in *CompleteTransactionRequest, opts ...grpc.CallOption) (*CompleteTransactionResponse, error)
	// Auth
	GetChallenge(ctx context.Context, in *GetChallengeRequest, opts ...grpc.CallOption) (*GetChallengeResponse, error)
	GetToken(ctx context.Context, in *GetTokenRequest, opts ...grpc.CallOption) (*GetTokenResponse, error)
}

type multisigServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewMultisigServiceClient(cc grpc.ClientConnInterface) MultisigServiceClient {
	return &multisigServiceClient{cc}
}

func (c *multisigServiceClient) Multisigs(ctx context.Context, in *MultisigsRequest, opts ...grpc.CallOption) (*MultisigsResponse, error) {
	out := new(MultisigsResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/Multisigs", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) MultisigInfo(ctx context.Context, in *MultisigInfoRequest, opts ...grpc.CallOption) (*MultisigInfoResponse, error) {
	out := new(MultisigInfoResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/MultisigInfo", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) Transactions(ctx context.Context, in *TransactionsRequest, opts ...grpc.CallOption) (*TransactionsResponse, error) {
	out := new(TransactionsResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/Transactions", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) TransactionsCounts(ctx context.Context, in *TransactionsCountsRequest, opts ...grpc.CallOption) (*TransactionsCountsResponse, error) {
	out := new(TransactionsCountsResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/TransactionsCounts", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) CreateOrJoinMultisig(ctx context.Context, in *CreateOrJoinMultisigRequest, opts ...grpc.CallOption) (*CreateOrJoinMultisigResponse, error) {
	out := new(CreateOrJoinMultisigResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/CreateOrJoinMultisig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) LeaveMultisig(ctx context.Context, in *LeaveMultisigRequest, opts ...grpc.CallOption) (*LeaveMultisigResponse, error) {
	out := new(LeaveMultisigResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/LeaveMultisig", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) CreateTransaction(ctx context.Context, in *CreateTransactionRequest, opts ...grpc.CallOption) (*CreateTransactionResponse, error) {
	out := new(CreateTransactionResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/CreateTransaction", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) SignTransaction(ctx context.Context, in *SignTransactionRequest, opts ...grpc.CallOption) (*SignTransactionResponse, error) {
	out := new(SignTransactionResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/SignTransaction", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) CompleteTransaction(ctx context.Context, in *CompleteTransactionRequest, opts ...grpc.CallOption) (*CompleteTransactionResponse, error) {
	out := new(CompleteTransactionResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/CompleteTransaction", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) GetChallenge(ctx context.Context, in *GetChallengeRequest, opts ...grpc.CallOption) (*GetChallengeResponse, error) {
	out := new(GetChallengeResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/GetChallenge", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *multisigServiceClient) GetToken(ctx context.Context, in *GetTokenRequest, opts ...grpc.CallOption) (*GetTokenResponse, error) {
	out := new(GetTokenResponse)
	err := c.cc.Invoke(ctx, "/multisig.v1.MultisigService/GetToken", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MultisigServiceServer is the server API for MultisigService service.
// All implementations must embed UnimplementedMultisigServiceServer
// for forward compatibility
type MultisigServiceServer interface {
	// Read
	Multisigs(context.Context, *MultisigsRequest) (*MultisigsResponse, error)
	MultisigInfo(context.Context, *MultisigInfoRequest) (*MultisigInfoResponse, error)
	Transactions(context.Context, *TransactionsRequest) (*TransactionsResponse, error)
	TransactionsCounts(context.Context, *TransactionsCountsRequest) (*TransactionsCountsResponse, error)
	// Write
	CreateOrJoinMultisig(context.Context, *CreateOrJoinMultisigRequest) (*CreateOrJoinMultisigResponse, error)
	LeaveMultisig(context.Context, *LeaveMultisigRequest) (*LeaveMultisigResponse, error)
	CreateTransaction(context.Context, *CreateTransactionRequest) (*CreateTransactionResponse, error)
	SignTransaction(context.Context, *SignTransactionRequest) (*SignTransactionResponse, error)
	CompleteTransaction(context.Context, *CompleteTransactionRequest) (*CompleteTransactionResponse, error)
	// Auth
	GetChallenge(context.Context, *GetChallengeRequest) (*GetChallengeResponse, error)
	GetToken(context.Context, *GetTokenRequest) (*GetTokenResponse, error)
	mustEmbedUnimplementedMultisigServiceServer()
}

// UnimplementedMultisigServiceServer must be embedded to have forward compatible implementations.
type UnimplementedMultisigServiceServer struct {
}

func (UnimplementedMultisigServiceServer) Multisigs(context.Context, *MultisigsRequest) (*MultisigsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Multisigs not implemented")
}
func (UnimplementedMultisigServiceServer) MultisigInfo(context.Context, *MultisigInfoRequest) (*MultisigInfoResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method MultisigInfo not implemented")
}
func (UnimplementedMultisigServiceServer) Transactions(context.Context, *TransactionsRequest) (*TransactionsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Transactions not implemented")
}
func (UnimplementedMultisigServiceServer) TransactionsCounts(context.Context, *TransactionsCountsRequest) (*TransactionsCountsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method TransactionsCounts not implemented")
}
func (UnimplementedMultisigServiceServer) CreateOrJoinMultisig(context.Context, *CreateOrJoinMultisigRequest) (*CreateOrJoinMultisigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateOrJoinMultisig not implemented")
}
func (UnimplementedMultisigServiceServer) LeaveMultisig(context.Context, *LeaveMultisigRequest) (*LeaveMultisigResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LeaveMultisig not implemented")
}
func (UnimplementedMultisigServiceServer) CreateTransaction(context.Context, *CreateTransactionRequest) (*CreateTransactionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateTransaction not implemented")
}
func (UnimplementedMultisigServiceServer) SignTransaction(context.Context, *SignTransactionRequest) (*SignTransactionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SignTransaction not implemented")
}
func (UnimplementedMultisigServiceServer) CompleteTransaction(context.Context, *CompleteTransactionRequest) (*CompleteTransactionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CompleteTransaction not implemented")
}
func (UnimplementedMultisigServiceServer) GetChallenge(context.Context, *GetChallengeRequest) (*GetChallengeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetChallenge not implemented")
}
func (UnimplementedMultisigServiceServer) GetToken(context.Context, *GetTokenRequest) (*GetTokenResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetToken not implemented")
}
func (UnimplementedMultisigServiceServer) mustEmbedUnimplementedMultisigServiceServer() {}

// UnsafeMultisigServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to MultisigServiceServer will
// result in compilation errors.
type UnsafeMultisigServiceServer interface {
	mustEmbedUnimplementedMultisigServiceServer()
}

func RegisterMultisigServiceServer(s grpc.ServiceRegistrar, srv MultisigServiceServer) {
	s.RegisterService(&MultisigService_ServiceDesc, srv)
}

func _MultisigService_Multisigs_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MultisigsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).Multisigs(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/Multisigs",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).Multisigs(ctx, req.(*MultisigsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_MultisigInfo_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MultisigInfoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).MultisigInfo(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/MultisigInfo",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).MultisigInfo(ctx, req.(*MultisigInfoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_Transactions_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TransactionsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).Transactions(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/Transactions",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).Transactions(ctx, req.(*TransactionsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_TransactionsCounts_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TransactionsCountsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).TransactionsCounts(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/TransactionsCounts",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).TransactionsCounts(ctx, req.(*TransactionsCountsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_CreateOrJoinMultisig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateOrJoinMultisigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).CreateOrJoinMultisig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/CreateOrJoinMultisig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).CreateOrJoinMultisig(ctx, req.(*CreateOrJoinMultisigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_LeaveMultisig_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LeaveMultisigRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).LeaveMultisig(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/LeaveMultisig",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).LeaveMultisig(ctx, req.(*LeaveMultisigRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_CreateTransaction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateTransactionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).CreateTransaction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/CreateTransaction",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).CreateTransaction(ctx, req.(*CreateTransactionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_SignTransaction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SignTransactionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).SignTransaction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/SignTransaction",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).SignTransaction(ctx, req.(*SignTransactionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_CompleteTransaction_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CompleteTransactionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).CompleteTransaction(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/CompleteTransaction",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).CompleteTransaction(ctx, req.(*CompleteTransactionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_GetChallenge_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetChallengeRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).GetChallenge(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/GetChallenge",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).GetChallenge(ctx, req.(*GetChallengeRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MultisigService_GetToken_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetTokenRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MultisigServiceServer).GetToken(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/multisig.v1.MultisigService/GetToken",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MultisigServiceServer).GetToken(ctx, req.(*GetTokenRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// MultisigService_ServiceDesc is the grpc.ServiceDesc for MultisigService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var MultisigService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "multisig.v1.MultisigService",
	HandlerType: (*MultisigServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Multisigs",
			Handler:    _MultisigService_Multisigs_Handler,
		},
		{
			MethodName: "MultisigInfo",
			Handler:    _MultisigService_MultisigInfo_Handler,
		},
		{
			MethodName: "Transactions",
			Handler:    _MultisigService_Transactions_Handler,
		},
		{
			MethodName: "TransactionsCounts",
			Handler:    _MultisigService_TransactionsCounts_Handler,
		},
		{
			MethodName: "CreateOrJoinMultisig",
			Handler:    _MultisigService_CreateOrJoinMultisig_Handler,
		},
		{
			MethodName: "LeaveMultisig",
			Handler:    _MultisigService_LeaveMultisig_Handler,
		},
		{
			MethodName: "CreateTransaction",
			Handler:    _MultisigService_CreateTransaction_Handler,
		},
		{
			MethodName: "SignTransaction",
			Handler:    _MultisigService_SignTransaction_Handler,
		},
		{
			MethodName: "CompleteTransaction",
			Handler:    _MultisigService_CompleteTransaction_Handler,
		},
		{
			MethodName: "GetChallenge",
			Handler:    _MultisigService_GetChallenge_Handler,
		},
		{
			MethodName: "GetToken",
			Handler:    _MultisigService_GetToken_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "multisig/v1/multisig.proto",
}
