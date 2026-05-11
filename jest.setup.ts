import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "node:util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.Request = global.Request ?? (class Request {} as never);
global.Response = global.Response ?? (class Response {} as never);
global.Headers = global.Headers ?? (class Headers {} as never);
