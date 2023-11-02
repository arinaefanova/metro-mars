"use strict";
exports.__esModule = true;
// Composables
var Home_vue_1 = require("vuetify-app/src/views/Home.vue");
var vue_router_1 = require("vue-router");
var routes = [
  {
    path: '/',
    component: Home_vue_1["default"],
    children: [
      {
        path: 'home',
        name: 'Home',
        component: function () { return Promise.resolve().then(function () { return require('../views/Home.vue'); }); }
      },
    ]
  },
];
var router = (0, vue_router_1.createRouter)({
  history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
  routes: routes
});
exports["default"] = router;
