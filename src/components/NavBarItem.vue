<template>
  <div class="flex flex-row items-center gap-x-1.5">
    <span class="p-2 text-2xl">
      <slot name="navitem"></slot>
    </span>
    <div class="w-18">
      <slot name="navicon"></slot>
    </div>
  </div>
</template>
