<script setup lang="ts">
import NavBarItem from './NavBarItem.vue'
</script>

<template>
  <div class="flex h-dvh w-1/6 flex-col items-end gap-y-4 bg-orange-300 px-3 py-6">
    <img src="/public/logo_with_title.png" alt="Ludario logo" class="w-56" />

    <NavBarItem>
      <template #navitem>Catalogue</template>
      <template #navicon>
        <img src="/public/navbaricons/book_logo_black.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Charts</template>
      <template #navicon>
        <img src="/public/navbaricons/pie_chart_logo_black.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Discover</template>
      <template #navicon>
        <img src="/public/navbaricons/explore_logo_black.png" />
      </template>
    </NavBarItem>
  </div>
</template>
