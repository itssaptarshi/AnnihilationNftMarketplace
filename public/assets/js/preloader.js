/*!-----------------------------------------------------------------
    Name: AnnihilationMobile - Annihilation Mobile game
    Version: 1.0.0
    Author: undefined
    Website: https://annihilationmobile.com/
    Purchase: undefined
    Support: undefined
    License: undefined
    Copyright 2021.
-------------------------------------------------------------------*/
    /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
var $ = window.jQuery;
var $doc = $(document);
var perfData = window.performance.timing; // The PerformanceTiming interface represents timing-related performance information for the given page.

var EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
var time = Math.max(500, Math.min(1000, parseInt(EstimatedTime / 1000 % 60, 10) * 100)); // Preloader Animation

$doc.on('DOMContentLoaded', function () {
  var $preloader = $('.mpl-preloader');
  var $preloaderProgress = $preloader.find('.mpl-preloader-progress'); // No preloader available.

  if (!$preloader.length || !$preloaderProgress.length) {
    $doc.trigger('mpl.preloader.hide');
    return;
  }

  $preloaderProgress.children('div').css({
    'transition-duration': "".concat(time, "ms"),
    width: '100%'
  });
  var preloaderTimer;

  function closePreloader() {
    clearTimeout(preloaderTimer);
    $preloader.addClass('mpl-preloader-hide');
    $doc.trigger('mpl.preloader.hide');
  }

  if ($preloader.length) {
    preloaderTimer = setTimeout(closePreloader, time);
  }
});
/******/ })()
;