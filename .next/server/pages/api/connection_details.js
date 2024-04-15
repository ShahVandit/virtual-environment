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
exports.id = "pages/api/connection_details";
exports.ids = ["pages/api/connection_details"];
exports.modules = {

/***/ "livekit-server-sdk":
/*!*************************************!*\
  !*** external "livekit-server-sdk" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("livekit-server-sdk");

/***/ }),

/***/ "(api)/./src/pages/api/connection_details.ts":
/*!*********************************************!*\
  !*** ./src/pages/api/connection_details.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! livekit-server-sdk */ \"livekit-server-sdk\");\n/* harmony import */ var livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__);\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nasync function handler(req, res) {\n    if (req.method !== \"POST\") {\n        return res.status(400).json({\n            error: \"Invalid method\"\n        });\n    }\n    const { username , room_name: room , character  } = req.body;\n    const apiKey = process.env.LIVEKIT_API_KEY;\n    const apiSecret = process.env.LIVEKIT_API_SECRET;\n    const wsUrl = process.env.LIVEKIT_WS_URL;\n    if (!apiKey || !apiSecret || !wsUrl) {\n        return res.status(500).json({\n            error: \"Server misconfigured\"\n        });\n    }\n    if (!username) return res.status(400).json({\n        error: \"Missing username\"\n    });\n    if (!character) return res.status(400).json({\n        error: \"Missing character\"\n    });\n    if (!room) return res.status(400).json({\n        error: \"Missing room_name\"\n    });\n    const livekitHost = wsUrl?.replace(\"wss://\", \"https://\");\n    const at = new livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__.AccessToken(apiKey, apiSecret, {\n        identity: username\n    });\n    const roomService = new livekit_server_sdk__WEBPACK_IMPORTED_MODULE_0__.RoomServiceClient(livekitHost, apiKey, apiSecret);\n    try {\n        await roomService.getParticipant(room, username);\n        return res.status(401).json({\n            error: \"Username already exists in room\"\n        });\n    } catch  {\n    // If participant doesn't exist, we can continue\n    }\n    at.addGrant({\n        room,\n        roomJoin: true,\n        canPublish: true,\n        canSubscribe: true\n    });\n    at.metadata = JSON.stringify({\n        character\n    });\n    res.status(200).json({\n        token: at.toJwt(),\n        ws_url: wsUrl\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2Nvbm5lY3Rpb25fZGV0YWlscy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2RUFBNkU7QUFLakQ7QUFrQmIsZUFBZUUsUUFDNUJDLEdBQW1CLEVBQ25CQyxHQUF1RCxFQUN2RDtJQUNBLElBQUlELElBQUlFLE1BQU0sS0FBSyxRQUFRO1FBQ3pCLE9BQU9ELElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFpQjtJQUN4RCxDQUFDO0lBRUQsTUFBTSxFQUNKQyxTQUFRLEVBQ1JDLFdBQVdDLEtBQUksRUFDZkMsVUFBUyxFQUNWLEdBQUdULElBQUlVLElBQUk7SUFDWixNQUFNQyxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7SUFDMUMsTUFBTUMsWUFBWUgsUUFBUUMsR0FBRyxDQUFDRyxrQkFBa0I7SUFDaEQsTUFBTUMsUUFBUUwsUUFBUUMsR0FBRyxDQUFDSyxjQUFjO0lBRXhDLElBQUksQ0FBQ1AsVUFBVSxDQUFDSSxhQUFhLENBQUNFLE9BQU87UUFDbkMsT0FBT2hCLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF1QjtJQUM5RCxDQUFDO0lBRUQsSUFBSSxDQUFDQyxVQUFVLE9BQU9MLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUMsT0FBTztJQUFtQjtJQUN2RSxJQUFJLENBQUNJLFdBQVcsT0FBT1IsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztRQUFFQyxPQUFPO0lBQW9CO0lBQ3pFLElBQUksQ0FBQ0csTUFBTSxPQUFPUCxJQUFJRSxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO1FBQUVDLE9BQU87SUFBb0I7SUFFcEUsTUFBTWMsY0FBY0YsT0FBT0csUUFBUSxVQUFVO0lBRTdDLE1BQU1DLEtBQUssSUFBSXhCLDJEQUFXQSxDQUFDYyxRQUFRSSxXQUFXO1FBQUVPLFVBQVVoQjtJQUFTO0lBQ25FLE1BQU1pQixjQUFjLElBQUl6QixpRUFBaUJBLENBQUNxQixhQUFhUixRQUFRSTtJQUUvRCxJQUFJO1FBQ0YsTUFBTVEsWUFBWUMsY0FBYyxDQUFDaEIsTUFBTUY7UUFDdkMsT0FBT0wsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWtDO0lBQ3pFLEVBQUUsT0FBTTtJQUNOLGdEQUFnRDtJQUNsRDtJQUVBZ0IsR0FBR0ksUUFBUSxDQUFDO1FBQUVqQjtRQUFNa0IsVUFBVSxJQUFJO1FBQUVDLFlBQVksSUFBSTtRQUFFQyxjQUFjLElBQUk7SUFBQztJQUN6RVAsR0FBR1EsUUFBUSxHQUFHQyxLQUFLQyxTQUFTLENBQUM7UUFBRXRCO0lBQVU7SUFDekNSLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRTRCLE9BQU9YLEdBQUdZLEtBQUs7UUFBSUMsUUFBUWpCO0lBQU07QUFDMUQsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwYXRpYWwtYXVkaW8vLi9zcmMvcGFnZXMvYXBpL2Nvbm5lY3Rpb25fZGV0YWlscy50cz80YThkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE5leHQuanMgQVBJIHJvdXRlIHN1cHBvcnQ6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL2FwaS1yb3V0ZXMvaW50cm9kdWN0aW9uXG5pbXBvcnQgdHlwZSB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IGxpdmVraXRTZXJ2ZXIsIHtcbiAgQWNjZXNzVG9rZW4sXG4gIFJvb21TZXJ2aWNlQ2xpZW50LFxufSBmcm9tIFwibGl2ZWtpdC1zZXJ2ZXItc2RrXCI7XG5pbXBvcnQgeyBDaGFyYWN0ZXJOYW1lIH0gZnJvbSBcIkAvY29tcG9uZW50cy9DaGFyYWN0ZXJTZWxlY3RvclwiO1xuXG5leHBvcnQgdHlwZSBDb25uZWN0aW9uRGV0YWlsc0JvZHkgPSB7XG4gIHJvb21fbmFtZTogc3RyaW5nO1xuICB1c2VybmFtZTogc3RyaW5nO1xuICBjaGFyYWN0ZXI6IENoYXJhY3Rlck5hbWU7XG59O1xuXG5leHBvcnQgdHlwZSBDb25uZWN0aW9uRGV0YWlscyA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgd3NfdXJsOiBzdHJpbmc7XG59O1xuXG50eXBlIEVycm9yUmVzcG9uc2UgPSB7XG4gIGVycm9yOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxDb25uZWN0aW9uRGV0YWlscyB8IEVycm9yUmVzcG9uc2U+XG4pIHtcbiAgaWYgKHJlcS5tZXRob2QgIT09IFwiUE9TVFwiKSB7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCBtZXRob2RcIiB9KTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICB1c2VybmFtZSxcbiAgICByb29tX25hbWU6IHJvb20sXG4gICAgY2hhcmFjdGVyLFxuICB9ID0gcmVxLmJvZHkgYXMgQ29ubmVjdGlvbkRldGFpbHNCb2R5O1xuICBjb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5MSVZFS0lUX0FQSV9LRVk7XG4gIGNvbnN0IGFwaVNlY3JldCA9IHByb2Nlc3MuZW52LkxJVkVLSVRfQVBJX1NFQ1JFVDtcbiAgY29uc3Qgd3NVcmwgPSBwcm9jZXNzLmVudi5MSVZFS0lUX1dTX1VSTDtcblxuICBpZiAoIWFwaUtleSB8fCAhYXBpU2VjcmV0IHx8ICF3c1VybCkge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBcIlNlcnZlciBtaXNjb25maWd1cmVkXCIgfSk7XG4gIH1cblxuICBpZiAoIXVzZXJuYW1lKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJNaXNzaW5nIHVzZXJuYW1lXCIgfSk7XG4gIGlmICghY2hhcmFjdGVyKSByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJNaXNzaW5nIGNoYXJhY3RlclwiIH0pO1xuICBpZiAoIXJvb20pIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IGVycm9yOiBcIk1pc3Npbmcgcm9vbV9uYW1lXCIgfSk7XG5cbiAgY29uc3QgbGl2ZWtpdEhvc3QgPSB3c1VybD8ucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpO1xuXG4gIGNvbnN0IGF0ID0gbmV3IEFjY2Vzc1Rva2VuKGFwaUtleSwgYXBpU2VjcmV0LCB7IGlkZW50aXR5OiB1c2VybmFtZSB9KTtcbiAgY29uc3Qgcm9vbVNlcnZpY2UgPSBuZXcgUm9vbVNlcnZpY2VDbGllbnQobGl2ZWtpdEhvc3QsIGFwaUtleSwgYXBpU2VjcmV0KTtcblxuICB0cnkge1xuICAgIGF3YWl0IHJvb21TZXJ2aWNlLmdldFBhcnRpY2lwYW50KHJvb20sIHVzZXJuYW1lKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBlcnJvcjogXCJVc2VybmFtZSBhbHJlYWR5IGV4aXN0cyBpbiByb29tXCIgfSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIElmIHBhcnRpY2lwYW50IGRvZXNuJ3QgZXhpc3QsIHdlIGNhbiBjb250aW51ZVxuICB9XG5cbiAgYXQuYWRkR3JhbnQoeyByb29tLCByb29tSm9pbjogdHJ1ZSwgY2FuUHVibGlzaDogdHJ1ZSwgY2FuU3Vic2NyaWJlOiB0cnVlIH0pO1xuICBhdC5tZXRhZGF0YSA9IEpTT04uc3RyaW5naWZ5KHsgY2hhcmFjdGVyIH0pO1xuICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHRva2VuOiBhdC50b0p3dCgpLCB3c191cmw6IHdzVXJsIH0pO1xufVxuIl0sIm5hbWVzIjpbIkFjY2Vzc1Rva2VuIiwiUm9vbVNlcnZpY2VDbGllbnQiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwidXNlcm5hbWUiLCJyb29tX25hbWUiLCJyb29tIiwiY2hhcmFjdGVyIiwiYm9keSIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJMSVZFS0lUX0FQSV9LRVkiLCJhcGlTZWNyZXQiLCJMSVZFS0lUX0FQSV9TRUNSRVQiLCJ3c1VybCIsIkxJVkVLSVRfV1NfVVJMIiwibGl2ZWtpdEhvc3QiLCJyZXBsYWNlIiwiYXQiLCJpZGVudGl0eSIsInJvb21TZXJ2aWNlIiwiZ2V0UGFydGljaXBhbnQiLCJhZGRHcmFudCIsInJvb21Kb2luIiwiY2FuUHVibGlzaCIsImNhblN1YnNjcmliZSIsIm1ldGFkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInRva2VuIiwidG9Kd3QiLCJ3c191cmwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/connection_details.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/connection_details.ts"));
module.exports = __webpack_exports__;

})();