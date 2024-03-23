"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/room_info/[room]";
exports.ids = ["pages/api/room_info/[room]"];
exports.modules = {

/***/ "livekit-server-sdk":
/*!*************************************!*\
  !*** external "livekit-server-sdk" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("livekit-server-sdk");

/***/ }),

/***/ "(api)/./src/pages/api/room_info/[room].ts":
/*!*******************************************!*\
  !*** ./src/pages/api/room_info/[room].ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! livekit-server-sdk */ \"livekit-server-sdk\");\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__);\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nasync function handler(req, res) {\n    if (req.method !== \"GET\") {\n        return res.status(400).json({\n            error: \"Invalid method\"\n        });\n    }\n    const apiKey = process.env.LIVEKIT_API_KEY;\n    const apiSecret = process.env.LIVEKIT_API_SECRET;\n    const wsUrl = process.env.LIVEKIT_WS_URL;\n    const { room  } = req.query;\n    if (!apiKey || !apiSecret || !wsUrl) {\n        return res.status(500).json({\n            error: \"Server misconfigured\"\n        });\n    }\n    const livekitHost = wsUrl?.replace(\"wss://\", \"https://\");\n    const roomService = new livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__.RoomServiceClient(livekitHost, apiKey, apiSecret);\n    try {\n        const participants = await roomService.listParticipants(room);\n        return res.status(200).json({\n            num_participants: participants.length\n        });\n    } catch  {\n        return res.status(200).json({\n            num_participants: 0\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3Jvb21faW5mby9bcm9vbV0udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkVBQTZFO0FBRXRCO0FBY3hDLGVBQWVDLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBOEMsRUFDOUM7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssT0FBTztRQUN4QixPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBaUI7SUFDeEQsQ0FBQztJQUVELE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUMxQyxNQUFNQyxZQUFZSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtJQUNoRCxNQUFNQyxRQUFRTCxRQUFRQyxHQUFHLENBQUNLLGNBQWM7SUFDeEMsTUFBTSxFQUFFQyxLQUFJLEVBQUUsR0FBR2QsSUFBSWUsS0FBSztJQUUxQixJQUFJLENBQUNULFVBQVUsQ0FBQ0ksYUFBYSxDQUFDRSxPQUFPO1FBQ25DLE9BQU9YLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF1QjtJQUM5RCxDQUFDO0lBRUQsTUFBTVcsY0FBY0osT0FBT0ssUUFBUSxVQUFVO0lBQzdDLE1BQU1DLGNBQWMsSUFBSXBCLGlFQUFpQkEsQ0FBQ2tCLGFBQWFWLFFBQVFJO0lBRS9ELElBQUk7UUFDRixNQUFNUyxlQUFlLE1BQU1ELFlBQVlFLGdCQUFnQixDQUFDTjtRQUN4RCxPQUFPYixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVpQixrQkFBa0JGLGFBQWFHLE1BQU07UUFBQztJQUN0RSxFQUFFLE9BQU07UUFDTixPQUFPckIsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFaUIsa0JBQWtCO1FBQUU7SUFDcEQ7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BhdGlhbC1hdWRpby8uL3NyYy9wYWdlcy9hcGkvcm9vbV9pbmZvL1tyb29tXS50cz85NWJjIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXHJcbmltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XHJcbmltcG9ydCB7IFJvb21TZXJ2aWNlQ2xpZW50IH0gZnJvbSBcImxpdmVraXQtc2VydmVyLXNka1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUm9vbUluZm8gPSB7XHJcbiAgbnVtX3BhcnRpY2lwYW50czogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBFcnJvclJlc3BvbnNlID0ge1xyXG4gIGVycm9yOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFF1ZXJ5ID0ge1xyXG4gIHJvb206IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoXHJcbiAgcmVxOiBOZXh0QXBpUmVxdWVzdCxcclxuICByZXM6IE5leHRBcGlSZXNwb25zZTxSb29tSW5mbyB8IEVycm9yUmVzcG9uc2U+XHJcbikge1xyXG4gIGlmIChyZXEubWV0aG9kICE9PSBcIkdFVFwiKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIG1ldGhvZFwiIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuTElWRUtJVF9BUElfS0VZO1xyXG4gIGNvbnN0IGFwaVNlY3JldCA9IHByb2Nlc3MuZW52LkxJVkVLSVRfQVBJX1NFQ1JFVDtcclxuICBjb25zdCB3c1VybCA9IHByb2Nlc3MuZW52LkxJVkVLSVRfV1NfVVJMO1xyXG4gIGNvbnN0IHsgcm9vbSB9ID0gcmVxLnF1ZXJ5IGFzIFF1ZXJ5O1xyXG5cclxuICBpZiAoIWFwaUtleSB8fCAhYXBpU2VjcmV0IHx8ICF3c1VybCkge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiU2VydmVyIG1pc2NvbmZpZ3VyZWRcIiB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxpdmVraXRIb3N0ID0gd3NVcmw/LnJlcGxhY2UoXCJ3c3M6Ly9cIiwgXCJodHRwczovL1wiKTtcclxuICBjb25zdCByb29tU2VydmljZSA9IG5ldyBSb29tU2VydmljZUNsaWVudChsaXZla2l0SG9zdCwgYXBpS2V5LCBhcGlTZWNyZXQpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcGFydGljaXBhbnRzID0gYXdhaXQgcm9vbVNlcnZpY2UubGlzdFBhcnRpY2lwYW50cyhyb29tKTtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG51bV9wYXJ0aWNpcGFudHM6IHBhcnRpY2lwYW50cy5sZW5ndGggfSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBudW1fcGFydGljaXBhbnRzOiAwIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUm9vbVNlcnZpY2VDbGllbnQiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiYXBpS2V5IiwicHJvY2VzcyIsImVudiIsIkxJVkVLSVRfQVBJX0tFWSIsImFwaVNlY3JldCIsIkxJVkVLSVRfQVBJX1NFQ1JFVCIsIndzVXJsIiwiTElWRUtJVF9XU19VUkwiLCJyb29tIiwicXVlcnkiLCJsaXZla2l0SG9zdCIsInJlcGxhY2UiLCJyb29tU2VydmljZSIsInBhcnRpY2lwYW50cyIsImxpc3RQYXJ0aWNpcGFudHMiLCJudW1fcGFydGljaXBhbnRzIiwibGVuZ3RoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/room_info/[room].ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/room_info/[room].ts"));
module.exports = __webpack_exports__;

})();