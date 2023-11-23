// ==UserScript==
// @name         Jut.su Extended
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Basically automatically skips opening/ending on website.
// @author       soiderino
// @match        https://jut.su/*
// @icon         https://jut.su/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

;(function () {
  'use strict'

  window.addEventListener('load', () => {
    const handleMutation = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const target = mutation.target
          if (!target.classList.contains('vjs-hidden')) {
            // only for debugging
            // console.log('vjs-hidden class disappeared from:', target)

            target.click() // force click if the button appears
          }
        }
      }
    }

    const skipOpening = document.querySelectorAll(
      '#my-player > div.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro.vjs-overlay-background'
    )[0]
    const skipEnding = document.querySelectorAll(
      '#my-player > div.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro.vjs-overlay-background'
    )[0]

    const observer = new MutationObserver(handleMutation)

    if (skipOpening) observer.observe(skipOpening, { attributes: true })
    if (skipEnding) observer.observe(skipEnding, { attributes: true })
  })
})()
