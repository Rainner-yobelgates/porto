<script setup lang="ts">
const background = ref<HTMLElement | null>(null)
useCursorBackground(background)
</script>
<template>
  <div ref="background" class="ambient" aria-hidden="true">
    <div class="ambient-mesh" />
    <svg
      class="ambient-waves"
      viewBox="0 0 1680 1000"
      preserveAspectRatio="xMidYMin slice"
      fill="none"
    >
      <defs>
        <linearGradient
          id="wave-violet"
          x1="150"
          y1="140"
          x2="1200"
          y2="600"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6020ce" stop-opacity="0" />
          <stop offset=".4" stop-color="#7d25e9" stop-opacity=".23" />
          <stop offset="1" stop-color="#36135d" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="wave-edge"
          x1="170"
          y1="170"
          x2="1280"
          y2="370"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#b36aff" stop-opacity="0" />
          <stop offset=".38" stop-color="#9e48f6" stop-opacity=".25" />
          <stop offset=".76" stop-color="#793dcc" stop-opacity=".07" />
          <stop offset="1" stop-color="#793dcc" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M-200 140C180-110 390 140 570 225S1060 580 1850 70V420C1210 710 690 440 420 275S30 480-200 600Z"
        fill="url(#wave-violet)"
      />
      <path d="M-200 140C180-110 390 140 570 225S1060 580 1850 70" stroke="url(#wave-edge)" />
      <path
        d="M-180 890C240 300 370 775 760 665S1410 220 1870 590V980C1360 420 1030 1030 530 930S70 660-180 1080Z"
        fill="url(#wave-violet)"
        opacity=".5"
      />
    </svg>
    <div class="ambient-glow" />
  </div>
</template>
