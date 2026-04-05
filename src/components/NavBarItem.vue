<template>
  <div class="flex flex-row items-center gap-x-1.5">
    <span class="p-2 text-2xl">
      <slot name="navitem"></slot>
    </span>
    <div class="relative w-fit">
      <img
        src="../../public/navbaricons/orange_hexagon.png"
        class="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div class="relative z-10">
        <slot name="navicon"></slot>
      </div>
    </div>
  </div>
</template>
