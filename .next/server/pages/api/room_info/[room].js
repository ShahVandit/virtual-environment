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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! livekit-server-sdk */ \"livekit-server-sdk\");\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__);\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nasync function handler(req, res) {\n    if (req.method !== \"GET\") {\n        return res.status(400).json({\n            error: \"Invalid method\"\n        });\n    }\n    const apiKey = process.env.LIVEKIT_API_KEY;\n    const apiSecret = process.env.LIVEKIT_API_SECRET;\n    const wsUrl = process.env.LIVEKIT_WS_URL;\n    const { room  } = req.query;\n    if (!apiKey || !apiSecret || !wsUrl) {\n        return res.status(500).json({\n            error: \"Server misconfigured\"\n        });\n    }\n    const livekitHost = wsUrl?.replace(\"wss://\", \"https://\");\n    const roomService = new livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__.RoomServiceClient(livekitHost, apiKey, apiSecret);\n    try {\n        const participants = await roomService.listParticipants(room);\n        return res.status(200).json({\n            num_participants: participants.length\n        });\n    } catch  {\n        return res.status(200).json({\n            num_participants: 0\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3Jvb21faW5mby9bcm9vbV0udHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkVBQTZFO0FBRXRCO0FBY3hDLGVBQWVDLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBOEMsRUFDOUM7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssT0FBTztRQUN4QixPQUFPRCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBaUI7SUFDeEQsQ0FBQztJQUVELE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtJQUMxQyxNQUFNQyxZQUFZSCxRQUFRQyxHQUFHLENBQUNHLGtCQUFrQjtJQUNoRCxNQUFNQyxRQUFRTCxRQUFRQyxHQUFHLENBQUNLLGNBQWM7SUFDeEMsTUFBTSxFQUFFQyxLQUFJLEVBQUUsR0FBR2QsSUFBSWUsS0FBSztJQUUxQixJQUFJLENBQUNULFVBQVUsQ0FBQ0ksYUFBYSxDQUFDRSxPQUFPO1FBQ25DLE9BQU9YLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF1QjtJQUM5RCxDQUFDO0lBRUQsTUFBTVcsY0FBY0osT0FBT0ssUUFBUSxVQUFVO0lBQzdDLE1BQU1DLGNBQWMsSUFBSXBCLGlFQUFpQkEsQ0FBQ2tCLGFBQWFWLFFBQVFJO0lBRS9ELElBQUk7UUFDRixNQUFNUyxlQUFlLE1BQU1ELFlBQVlFLGdCQUFnQixDQUFDTjtRQUN4RCxPQUFPYixJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1lBQUVpQixrQkFBa0JGLGFBQWFHLE1BQU07UUFBQztJQUN0RSxFQUFFLE9BQU07UUFDTixPQUFPckIsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFaUIsa0JBQWtCO1FBQUU7SUFDcEQ7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3BhdGlhbC1hdWRpby8uL3NyYy9wYWdlcy9hcGkvcm9vbV9pbmZvL1tyb29tXS50cz85NWJjIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHsgUm9vbVNlcnZpY2VDbGllbnQgfSBmcm9tIFwibGl2ZWtpdC1zZXJ2ZXItc2RrXCI7XG5cbmV4cG9ydCB0eXBlIFJvb21JbmZvID0ge1xuICBudW1fcGFydGljaXBhbnRzOiBudW1iZXI7XG59O1xuXG50eXBlIEVycm9yUmVzcG9uc2UgPSB7XG4gIGVycm9yOiBzdHJpbmc7XG59O1xuXG50eXBlIFF1ZXJ5ID0ge1xuICByb29tOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxSb29tSW5mbyB8IEVycm9yUmVzcG9uc2U+XG4pIHtcbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiR0VUXCIpIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIG1ldGhvZFwiIH0pO1xuICB9XG5cbiAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuTElWRUtJVF9BUElfS0VZO1xuICBjb25zdCBhcGlTZWNyZXQgPSBwcm9jZXNzLmVudi5MSVZFS0lUX0FQSV9TRUNSRVQ7XG4gIGNvbnN0IHdzVXJsID0gcHJvY2Vzcy5lbnYuTElWRUtJVF9XU19VUkw7XG4gIGNvbnN0IHsgcm9vbSB9ID0gcmVxLnF1ZXJ5IGFzIFF1ZXJ5O1xuXG4gIGlmICghYXBpS2V5IHx8ICFhcGlTZWNyZXQgfHwgIXdzVXJsKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiU2VydmVyIG1pc2NvbmZpZ3VyZWRcIiB9KTtcbiAgfVxuXG4gIGNvbnN0IGxpdmVraXRIb3N0ID0gd3NVcmw/LnJlcGxhY2UoXCJ3c3M6Ly9cIiwgXCJodHRwczovL1wiKTtcbiAgY29uc3Qgcm9vbVNlcnZpY2UgPSBuZXcgUm9vbVNlcnZpY2VDbGllbnQobGl2ZWtpdEhvc3QsIGFwaUtleSwgYXBpU2VjcmV0KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhcnRpY2lwYW50cyA9IGF3YWl0IHJvb21TZXJ2aWNlLmxpc3RQYXJ0aWNpcGFudHMocm9vbSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbnVtX3BhcnRpY2lwYW50czogcGFydGljaXBhbnRzLmxlbmd0aCB9KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbnVtX3BhcnRpY2lwYW50czogMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIlJvb21TZXJ2aWNlQ2xpZW50IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImpzb24iLCJlcnJvciIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJMSVZFS0lUX0FQSV9LRVkiLCJhcGlTZWNyZXQiLCJMSVZFS0lUX0FQSV9TRUNSRVQiLCJ3c1VybCIsIkxJVkVLSVRfV1NfVVJMIiwicm9vbSIsInF1ZXJ5IiwibGl2ZWtpdEhvc3QiLCJyZXBsYWNlIiwicm9vbVNlcnZpY2UiLCJwYXJ0aWNpcGFudHMiLCJsaXN0UGFydGljaXBhbnRzIiwibnVtX3BhcnRpY2lwYW50cyIsImxlbmd0aCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/room_info/[room].ts\n");

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