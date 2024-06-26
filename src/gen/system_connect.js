// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=js"
// @generated from file system.proto (package external.api.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { SystemStatusRequest, SystemStatusResponse } from "./system_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service external.api.v1.System
 */
export const System = {
  typeName: "external.api.v1.System",
  methods: {
    /**
     * @generated from rpc external.api.v1.System.Status
     */
    status: {
      name: "Status",
      I: SystemStatusRequest,
      O: SystemStatusResponse,
      kind: MethodKind.Unary,
    },
  }
};

